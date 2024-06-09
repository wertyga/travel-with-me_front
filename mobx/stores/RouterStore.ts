import { RootStore } from '@/mobx/RootStore';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {storage} from "@/utils";
import {NavigationContainerRefWithCurrent} from "@react-navigation/native";
import {getLastRoute, SCREENS} from "@/types";
import {AppState} from "react-native";
import {removeAllNotification} from "@/utils";
import {fetchEnvs} from "@/api";
import Constants from "expo-constants";

const envNames = ['stripePk', 'minCloseDistance'];

export class RouterStore {
	navigator: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
	currentRoute: Record<SCREENS, any>; // Last screen name and it's params
	
	@observable initialHistory: any;
	@observable isAppSet: boolean = true;
	static ENV: Record<(typeof envNames)[number], string> = {
		stripePk: (Constants.expoConfig?.extra as any).STRIPE_PUBLIC_KEY,
	};
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	onInitiate() {
		this.applyAppStateChangeListener();
		this.getEnvs();
	}
	
	@action async getEnvs() {
		try {
			const envs = await fetchEnvs();
			RouterStore.ENV = envs;
		} catch (e) {
		
		}
	}
	
	navigateToError(error: string) {
		// @ts-ignore
		this.navigator.navigate(SCREENS.Error, {error})
	}
	
	applyAppStateChangeListener() {
		AppState.addEventListener(
			'change',
			async (nextState) => {
				if (nextState === 'active') {
					runInAction(() => {
						this.isAppSet = true;
					})
					const [history] = await Promise.all([
						storage.get('routeHistory'),
						fetchEnvs(),
						removeAllNotification()
					])

					runInAction(() => {
						this.initialHistory = history;
						this.isAppSet = true;
					})
				}

				if (nextState === 'background') {
					runInAction(() => {
						this.isAppSet = false;
					})
				}
			}
		);
	}
	
	@action onReady(navigationRef: typeof this.navigator) {
		this.navigator = navigationRef;
		this.applyRouterListener();
	}
	
	@action setRouteHistory(state) {
		const { name, params } = getLastRoute(state);
		this.currentRoute = {[name]: params} as typeof this.currentRoute;
		
		this.initialHistory = state;
		storage.set('routeHistory', state);
	}
	
	@action async applyRouterListener() {
		const history = await storage.get('routeHistory');
		await Promise.all([
			fetchEnvs(),
			removeAllNotification()
		])
		
		runInAction(() => {
			this.initialHistory = history;
			this.isAppSet = true;
		})
		
		this.navigator?.addListener('state', ({ data: { state } }) => {
			this.setRouteHistory(state)
		});
	}
}
