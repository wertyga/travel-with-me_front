import {action, makeObservable, observable, runInAction} from 'mobx';
import * as Updates from 'expo-updates';
import {AppState} from "react-native";
import { getNotificationAsync, IDENTIFIERS, removeAllNotification, removeNotification } from '@/utils';
import {EnvMap, RootStoreType} from "@/types";
import { fetchEnvs, sendLogs } from '@/api';
import Constants from "expo-constants";
import {CacheReq} from "@/utils/cache_request";
import Toast from 'react-native-toast-message';

export class AppStateStore {
	static ENV: Partial<EnvMap> = {
		stripePk: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
	};
	
	@observable isAppReady: boolean = false;
	
	@observable isUpdateAvailable: boolean = false;
	@observable isUpdateDownloading: boolean = false;
	
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
	
	@action async checkForUpdates() {
		try {
			const update = await Updates.checkForUpdateAsync();
			sendLogs({update});
			
			runInAction(() => {
				this.isUpdateAvailable = update.isAvailable;
			})
		} catch (e) {
			sendLogs(e);
		  console.log({e});
		}
	}
	
	@action async downloadUpdate() {
		this.isUpdateDownloading = true;
		
		try {
			const result = await Updates.fetchUpdateAsync();
			console.log({result});
			sendLogs({result});
			
			await Updates.reloadAsync();
		} catch (e) {
		  console.log({e});
		} finally {
			this.isUpdateDownloading = false;
		}
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
