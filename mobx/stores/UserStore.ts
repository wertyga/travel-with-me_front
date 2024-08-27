import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import {User, UserFavoritesResponse} from "@/types/user";
import {storage} from "@/utils";
import { fetchFavorites, fetchSelfUser, updateSelf } from '@/api';
import {RootStoreType} from "@/types";
import {withLoading} from "@/mobx/store.utils";
import { AppStateStore } from '@/mobx/stores/AppStateStore';
import * as FileSystem from 'expo-file-system';

export class UserStore {
	@observable user: User | null = null;
	@observable token: string
	@observable isLoading: boolean;
	@observable favorites: UserFavoritesResponse = {} as UserFavoritesResponse
	
	// Store default user data to restore
	private _user: User | null = null;
	
	constructor(public rootStore: RootStoreType) {
		makeObservable(this);
	}
	
	onInitiate() {
		this.getSelf();
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
	
	@action setUser(user: User | null) {
		// Fallback for broken base64 image
		const clearedUser = {...user, avatar: user.avatar.length > 3000 ? '' : user.avatar}
		this.user = clearedUser;
		this._user = clearedUser;
		this.token = user?.token;
		
		if (user?.token) {
			storage.set('token', this.token);
		}
		
		if (this.rootStore.appStateStore.isNetConnected) {
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
	}
	
	@action resetUpdatedUser() {
		this.user = {...this._user}
	}
	
	@computed get hasUserChanged() {
		return JSON.stringify(this.user) !== JSON.stringify(this._user);
	}
}
