import {action, makeObservable, observable, runInAction} from 'mobx';
import {AppState} from "react-native";
import { getNotificationAsync, removeAllNotification } from '@/utils';
import {EnvMap, RootStoreType} from "@/types";
import {fetchEnvs} from "@/api";
import Constants from "expo-constants";
import {CacheReq} from "@/utils/cache_request";

export class AppStateStore {
	static ENV: Partial<EnvMap> = {
		stripePk: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
	};
	
	@observable isAppReady: boolean = false;
	
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
	
	onInitiate() {
		this.applyAppStateChangeListener();
		this.getEnvs();
		this.rootStore.subscriptionStore.getMySubscription({isActive: true})
	
		runInAction(() => {
			this.isAppReady = true;
		})
	}
	
	@action async getEnvs() {
		try {
			const envs = await fetchEnvs();
			if (AppStateStore.ENV?.cacheDropIdentifier !== envs?.cacheDropIdentifier) {
				CacheReq.dropAll();
			}
			if (envs) {
				AppStateStore.ENV = envs;
			}
		} catch (e) {
		
		}
	}
	
	
	
	applyAppStateChangeListener() {
		AppState.addEventListener(
			'change',
			async (nextState) => {
	
				if (nextState === 'active') {
					await Promise.all([
						this.getEnvs(),
						this.rootStore.soundStore.stopPointPlaybackIfNoNotification(),
						this.rootStore.subscriptionStore.getMySubscription({isActive: true})
					]);
					
					runInAction(() => {
						this.isAppReady = true;
					})
				}
				if (nextState === 'background') {
					runInAction(() => {
						this.isAppReady = false;
					})
				}
			}
		);
	}
}
