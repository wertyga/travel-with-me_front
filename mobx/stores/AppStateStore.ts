import { action, makeObservable, observable, runInAction } from 'mobx';
import * as Updates from 'expo-updates';
import {AppState} from "react-native";
import { IDENTIFIERS, removeNotification } from '@/utils';
import { EnvMap, RootStoreType } from '@/types';
import { fetchEnvs } from '@/api/tech.api';
import Constants from "expo-constants";
import {CacheReq} from "@/utils/cache_request";
import { addEventListener, NetInfoSubscription } from '@react-native-community/netinfo';

export class AppStateStore {
	static ENV: Partial<EnvMap> = {
		stripePk: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
	};
	static isNetConnected = true;

	netConnectionUnsubscribe: NetInfoSubscription;

	@observable isAppReady: boolean = false;
	@observable isUpdateAvailable: boolean = false;
	@observable isNetConnected: boolean = undefined;

  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }

	async onInitiate() {
		this.applyNetConnectionListener();
		this.applyAppStateChangeListener();
		await Promise.all([
			this.getEnvs(),
			// this.rootStore.subscriptionStore.getMySubscription({isActive: true})
		])

		runInAction(() => {
			this.isAppReady = true;
		});

		await this.checkForUpdates();
	}

	@action setIsNetConnected(value: boolean) {
		if (this.isNetConnected === value) return;

		this.isNetConnected = value;
		AppStateStore.isNetConnected = value;

		if (!value) {
			this.rootStore.offlineStore.populateOfflineStore();
		}
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

			if (envs) {
				AppStateStore.ENV = envs;
				this.rootStore.offlineStore.saveEnv(envs);
			}

			runInAction(() => {
				this.isUpdateAvailable = !!Constants.expoConfig?.extra?.VERSION &&
					!!envs.runtimeVersion &&
					envs.runtimeVersion !== Constants.expoConfig?.extra?.VERSION
			})
		} catch (e) {}
	}

	@action applyAppStateChangeListener() {
		AppState.addEventListener(
			'change',
			async (nextState) => {

				if (nextState === 'active') {
					await Promise.all([
						this.getEnvs(),
						// this.rootStore.soundStore.stopPointPlaybackIfNoNotification(),
						removeNotification(IDENTIFIERS.pointDirection),
						// this.rootStore.subscriptionStore.getMySubscription({isActive: true}),
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

	@action applyNetConnectionListener() {
		this.netConnectionUnsubscribe = addEventListener(state => {
			this.setIsNetConnected(state.isConnected);
		});
	}
}
