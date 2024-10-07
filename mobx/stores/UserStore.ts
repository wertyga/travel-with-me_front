import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Language, User, UserFavoritesResponse } from '@/types/user';
import {storage} from "@/utils";
import {
	fetchFavorites,
	fetchLanguages,
	fetchSelfUser,
	fetchUsersNearMe,
	updateSelf,
	updateSelfLastCoords,
} from '@/api';
import { City, Path, RootStoreType } from '@/types';
import {withLoading} from "@/mobx/store.utils";
import { AppStateStore } from '@/mobx/stores/AppStateStore';
import * as FileSystem from 'expo-file-system';
import { getIsNetConnected } from '@/utils/etc';
import { cacheWrap } from '@/utils/cache_request';

export class UserStore {
	@observable user: User | null = null;
	@observable token: string
	@observable isLoading: boolean;
	@observable lastCity: City | null = null;
	@observable favorites: UserFavoritesResponse = {} as UserFavoritesResponse
	@observable usersNearMe: User[] = []
	@observable languages: Language[] = []

	lastCoords: Path | null = null;

	constructor(public rootStore: RootStoreType) {
		makeObservable(this);
	}

	onInitiate() {
		this.getSelf();
		this.getLanguages();

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

			if (!getIsNetConnected()) {
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
			if (!getIsNetConnected()) {
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

	@withLoading async fetchUpdateUser(userData: Partial<User>) {
		try {
			let avatar = userData.avatar;
			if (avatar?.includes('file://')) {
				avatar = await FileSystem.readAsStringAsync(avatar, {encoding: 'base64'});
			}

			const user = await updateSelf({...userData, avatar});

			this.setUser(user);
		} catch (e) {}
	}

	@action async getUsersNearMe() {
		try {
			if (!this.user.isVisible) return [];

			const { users } = await fetchUsersNearMe();

			runInAction(() => {
				this.usersNearMe = users;
			});

			return users;
		} catch (e) {
			console.log({e});

			return [];
		}
	}

	@action setUser(user: User | null) {
		let clearedUser = null;

		if (user) {
			// Fallback for broken base64 image
			clearedUser = {...user, avatar: user.avatar?.length > 3000 ? '' : user.avatar}
		}

		this.user = clearedUser;
		this.token = user?.token;

		if (user?.token) {
			storage.set('token', this.token);
		}

		if (getIsNetConnected()) {
			this.rootStore.offlineStore.saveUser(clearedUser);
		}
	}

	@action dropStore() {
		this.user = null;
		this.token = undefined;
		this.lastCoords = null;
		this.lastCity = null;
		this.usersNearMe = [];
	}

	@computed get isUserExists() {
		return !!this.user?._id;
	}

	 getMyCity() {
		const {liveCoords} = this.rootStore.locationStore;
		if (!liveCoords) return null;

		return this.rootStore.citiesListStore.getCityByCoords(liveCoords);
	}

	@computed get myCity() {
		return this.getMyCity();
	}

	async getLanguages() {
		try {
			const cachedReq = cacheWrap.apply(this, [fetchLanguages]);
			const { languages } = await cachedReq.withLoading().invoke();

			runInAction(() => {
				this.languages = languages;
			})
		} catch (e) {

		}
	}
}
