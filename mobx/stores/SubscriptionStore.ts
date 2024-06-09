import { RootStore } from '@/mobx/RootStore';
import {makeObservable, action, observable, runInAction} from 'mobx';
import {
	cancelMySubscription as cancelMySubscriptionApi,
	createSubscriptionPayment,
	fetchMySubscription,
	fetchSubscriptionList,
	renewMySubscription as renewMySubscriptionApi
} from '@/api';
import { withLoading } from '../store.utils';
import {SubscriptionPreview, UserSubscription} from "@/types";
import {storage} from "@/utils";

export class SubscriptionStore {
	@observable isLoading: boolean;
	@observable subscriptions: SubscriptionPreview[] = []
	@observable mySubscription: UserSubscription | null = null;
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	@withLoading async createSubscription(...data: Parameters<typeof createSubscriptionPayment>) {
		try {
		  const subscription = await createSubscriptionPayment(...data);
			
			return subscription;
		} catch (e) {
		
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
				await this.getMySubscription({})
			}
		} catch (e) {
		
		}
	}
	
	@action async getMySubscription(...params: Parameters<typeof fetchMySubscription>) {
		try {
			const {subscription} = await fetchMySubscription(...params);
			
			runInAction(() => {
				this.mySubscription = subscription;
			})
		} catch (e) {
		
		}
	}
	
	@withLoading async renewMySubscription(...params: Parameters<typeof renewMySubscriptionApi>) {
		try {
			const {success} = await renewMySubscriptionApi(...params);
			
			if (success) {
				this.getMySubscription({});
			}
		} catch (e) {
		
		}
	}
}
