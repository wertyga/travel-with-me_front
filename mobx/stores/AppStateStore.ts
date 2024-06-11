import {action, makeObservable} from 'mobx';
import {AppState} from "react-native";
import {removeAllNotification} from "@/utils";
import {RootStoreType} from "@/types";
import {fetchEnvs} from "@/api";
import Constants from "expo-constants";

const envNames = ['stripePk', 'minCloseDistance'];

export class AppStateStore {
	static ENV: Record<(typeof envNames)[number], string> = {
		stripePk: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
	};
	
  constructor(rootStore: RootStoreType) {
    makeObservable(this);
  }
	
	onInitiate() {
		this.applyAppStateChangeListener();
		this.getEnvs();
	}
	
	@action async getEnvs() {
		try {
			const envs = await fetchEnvs();
			AppStateStore.ENV = envs;
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
						removeAllNotification(),
					])
				}
			}
		);
	}
}
