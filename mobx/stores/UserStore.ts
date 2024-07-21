import {action, makeObservable, observable, runInAction} from "mobx";
import {User, UserFavoritesResponse} from "@/types/user";
import {storage} from "@/utils";
import {fetchFavorites, fetchSelfUser} from "@/api";
import {RootStoreType} from "@/types";
import {withLoading} from "@/mobx/store.utils";

export class UserStore {
	@observable user: User | null = null;
	@observable token: string
	@observable isLoading: boolean;
	@observable favorites: UserFavoritesResponse = {} as UserFavoritesResponse
	
	constructor(public rootStore: RootStoreType) {
		makeObservable(this);
	}
	
	onInitiate() {
		this.getSelf();
	}
	
	@action async getSelf() {
		try {
			this.rootStore.authStore.isInitialLoading = true;
			
			if (!this.rootStore.appStateStore.isNetConnected) {
				const user = await this.rootStore.offlineStore.getOfflineUser();
				
				this.setUser(user);
				
				return ;
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
	
	@action setUser(user: User | null) {
		this.user = user;
		this.token = user?.token;
		
		if (user?.token) {
			storage.set('token', this.token);
		}
		
		if (this.rootStore.appStateStore.isNetConnected) {
			this.rootStore.offlineStore.saveUser(user);
		}
	}
	
	@action dropStore() {
		this.user = null;
		this.token = undefined;
	}
}
