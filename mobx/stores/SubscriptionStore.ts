import { makeObservable, action, observable, runInAction, reaction, computed } from 'mobx';
import {
	cancelMySubscription as cancelMySubscriptionApi,
	createSubscriptionPayment,
	fetchMySubscription,
	fetchSubscriptionList,
	renewMySubscription as renewMySubscriptionApi
} from '@/api';
import { withLoading } from '../store.utils';
import { CreateSubscriptionResponse, RootStoreType, SubscriptionPreview, UserSubscription } from '@/types';
import {CacheReq} from "@/utils/cache_request"

export class SubscriptionStore {
	@observable isLoading: boolean;
	@observable mySubHasBeenFetched: boolean = false;
	@observable subscriptions: SubscriptionPreview[] = [];
	@observable mySubscription: UserSubscription | null = null;
	
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
	
	@action setMySubHasBeenFetched(value: boolean) {
		this.mySubHasBeenFetched = value;
	}
	
	@withLoading async createSubscription(...data: Parameters<typeof createSubscriptionPayment>): Promise<CreateSubscriptionResponse | { error: any }> {
		try {
		  const subscription = await createSubscriptionPayment(...data);
			
			this.setMySubHasBeenFetched(false);
			
			return subscription;
		} catch (e) {
			return { error: e };
		}
	}
	
	@withLoading async getSubscriptionsList() {
		try {
			const {subscriptions} = await fetchSubscriptionList();
			
			runInAction(() => {
				this.subscriptions = subscriptions;
			})
		} catch (e) {
		
		}
	}
	
	@withLoading async cancelSubscription() {
		try {
			const {success} = await cancelMySubscriptionApi();
			
			if (success) {
				await this.getMySubscription({isActive: true})
			}
		} catch (e) {
		
		}
	}
	
	@action async getMySubscription(...params: Parameters<typeof fetchMySubscription>) {
		try {
			const { appStateStore: { isNetConnected }, userStore: { user } } = this.rootStore;
			if (!isNetConnected || !user) return;
			
			const {subscription} = await fetchMySubscription(...params);
			
			if (subscription?._id !== this.mySubscription?._id) {
				CacheReq.dropAll();
			}
			
			runInAction(() => {
				this.mySubscription = subscription;
				// this.rootStore.offlineStore.saveUserSubscription(subscription);
				this.setMySubHasBeenFetched(true);
			});
		
		} catch (e) {
			if (e.response?.status === 403) {
				runInAction(() => {
					this.rootStore.authStore.logout();
				})
			}
		}
	}
	
	@withLoading async renewMySubscription(...params: Parameters<typeof renewMySubscriptionApi>) {
		try {
			const {success} = await renewMySubscriptionApi(...params);
			
			if (success) {
				this.getMySubscription({isActive: true});
			}
		} catch (e) {
		
		}
	}
	
	@computed get isSubscriptionExists() {
		return !this.isLoading && this.mySubHasBeenFetched && !!this.mySubscription;
	}
	
	@action dropStore() {
		this.isLoading = false;
		this.mySubHasBeenFetched = false;
		this.subscriptions = [];
		this.mySubscription = null;
	}
}
