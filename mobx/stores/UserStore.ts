import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import {User, UserFavoritesResponse} from "@/types/user";
import {storage} from "@/utils";
import { fetchFavorites, fetchSelfUser, fetchUsersNearMe, updateSelf, updateSelfLastCoords } from '@/api';
import { City, Path, RootStoreType } from '@/types';
import {withLoading} from "@/mobx/store.utils";
import { AppStateStore } from '@/mobx/stores/AppStateStore';
import * as FileSystem from 'expo-file-system';
import { getIsNetConnected } from '@/utils/etc';

export class UserStore {
	@observable user: User | null = null;
	@observable token: string
	@observable isLoading: boolean;
	@observable lastCoords: Path | null = null;
	@observable lastCity: City | null = null;
	@observable favorites: UserFavoritesResponse = {} as UserFavoritesResponse
	@observable usersNearMe: User[] = []
	
	// Store default user data to restore
	private _user: User | null = null;
	
	constructor(public rootStore: RootStoreType) {
		makeObservable(this);
	}
	
	onInitiate() {
		this.getSelf();
		
		reaction(() => (
			this.isUserExists
			&& this.user.isVisible
			&& this.rootStore.locationStore.liveCoords
		), liveCoords => {
			if (!liveCoords) return;
			
			this.updateLastCoords(liveCoords);
		})
	}
	
	@action async updateLastCoords(coords: Path) {
		if (!getIsNetConnected()) return;
		
		try {
		  const data = await updateSelfLastCoords(coords);
			
			runInAction(() => {
				this.lastCoords = coords;
				this.lastCity = this.rootStore.citiesListStore.getCityByCoords(coords);
			});
			
			return data;
		} catch (e) {
		}
	}
	
	@action async getSelf() {
		try {
			this.rootStore.authStore.isInitialLoading = true;

			if (!AppStateStore.isNetConnected) {
				const user = await this.rootStore.offlineStore.getOfflineUser();
				
				this.setUser(user);
				
				return;
			}
			
			const token = await storage.get('token');
			if (!token) {
				return;
			}
			
			const user = await fetchSelfUser();
			
			this.setUser(user);
		} catch (e) {
		
		} finally {
			runInAction(() => {
				this.rootStore.authStore.isInitialLoading = false
			})
		}
	}
	
	@withLoading async getFavorites() {
		try {
			if (!this.rootStore.appStateStore.isNetConnected) {
				this.favorites = {
					guides: this.rootStore.offlineStore.guides,
					places: []
				}
				
				return;
			}
		  const data = await fetchFavorites();

			runInAction(() => {
				this.favorites = data
			})
		} catch (e) {
		
		}
	}
	
	@withLoading async fetchUpdateUser() {
		try {
			let avatar = this.user.avatar;
			if (avatar.includes('file://')) {
				avatar = await FileSystem.readAsStringAsync(avatar, {encoding: 'base64'});
			}

			const user = await updateSelf({...this.user, avatar});

			this.setUser(user);
		} catch (e) {
		
		}
	}
	
	@withLoading async fetchUpdateUserImmidiately(data: Partial<User>) {
		try {
			const user = await updateSelf(data);

			this.setUser(user);
		} catch (e) {
		
		}
	}
	
	@action async getUsersNearMe() {
		try {
			if (!getIsNetConnected() || !this.user.isVisible) return;
			
			const { users } = await fetchUsersNearMe();

			runInAction(() => {
				this.usersNearMe = users;
			});
			
			return users;
		} catch (e) {
			console.log({e});
		}
	}
	
	@action setUser(user: User | null) {
		let clearedUser = null;
		
		if (user) {
			// Fallback for broken base64 image
			clearedUser = {...user, avatar: user.avatar?.length > 3000 ? '' : user.avatar}
		}
		
		this.user = clearedUser;
		this._user = clearedUser;
		this.token = user?.token;
		
		if (user?.token) {
			storage.set('token', this.token);
		}
		
		if (AppStateStore.isNetConnected) {
			this.rootStore.offlineStore.saveUser(clearedUser);
		}
	}
	
	@action updateUser(userData: Partial<User>) {
		this.user = {
			...this.user,
			...userData
		}
	}
	
	@action dropStore() {
		this.user = null;
		this._user = null;
		this.token = undefined;
		this.lastCoords = null;
		this.lastCity = null;
		this.usersNearMe = [];
	}
	
	@action resetUpdatedUser() {
		this.user = {...this._user}
	}
	
	@computed get hasUserChanged() {
		return JSON.stringify(this.user) !== JSON.stringify(this._user);
	}
	
	@computed get isUserExists() {
		return !!this.user?._id;
	}
	
	 getMyCity() {
		const {liveCoords} = this.rootStore.locationStore;
		if (!liveCoords) return null;
		
		return this.rootStore.citiesListStore.getCityByCoords(liveCoords);
	}
}
