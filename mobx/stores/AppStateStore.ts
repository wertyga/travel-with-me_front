import {action, makeObservable, observable, runInAction} from 'mobx';
import * as Updates from 'expo-updates';
import {AppState} from "react-native";
import { IDENTIFIERS, removeNotification } from '@/utils';
import {EnvMap, RootStoreType} from "@/types";
import { fetchEnvs, sendLogs } from '@/api';
import Constants from "expo-constants";
import {CacheReq} from "@/utils/cache_request";

export class AppStateStore {
	static ENV: Partial<EnvMap> = {
		stripePk: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
	};
	
	@observable isAppReady: boolean = false;
	@observable isUpdateAvailable: boolean = false;
	
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
	
	async onInitiate() {
		this.applyAppStateChangeListener();
		await Promise.all([
			this.getEnvs(),
			this.rootStore.subscriptionStore.getMySubscription({isActive: true})
		])
		
		runInAction(() => {
			this.isAppReady = true;
		});
		
		await this.checkForUpdates();
	}
	
	@action async checkForUpdates() {
		try {
			const update = await Updates.checkForUpdateAsync();
			
			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (e) {}
	}
	
	@action async getEnvs() {
		try {
			const envs = await fetchEnvs();
			if (AppStateStore.ENV?.cacheDropIdentifier !== envs?.cacheDropIdentifier) {
				CacheReq.dropAll();
			}
			
			runInAction(() => {
				this.isUpdateAvailable = !!Constants.manifest2?.runtimeVersion &&
					!!envs.runtimeVersion &&
					envs.runtimeVersion !== Constants.manifest2.runtimeVersion
			})
			
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
						removeNotification(IDENTIFIERS.pointDirection),
						this.rootStore.subscriptionStore.getMySubscription({isActive: true}),
						this.checkForUpdates(),
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
