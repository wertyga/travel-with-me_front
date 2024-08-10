import { action, makeObservable, computed, observable, runInAction } from 'mobx';
import {NavigationContainerRefWithCurrent} from "@react-navigation/native";
import {RootStoreType, SCREENS} from "@/types";



export class RouterStore {
	navigator: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
	
	@observable currentRoute: {
		key: string;
		name: SCREENS;
		params?: any;
		path?: any;
	} | null = null;
	
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
	
	navigateToError(error: string) {
		// @ts-ignore
		this.navigator.navigate(SCREENS.Error, {error})
	}
	
	@action onReady(navigationRef: typeof this.navigator) {
		this.navigator = navigationRef;
		
		this.navigator.addListener('state', ({ data: {state} }) => {
			runInAction(() => {
				this.currentRoute = state.routes.concat().reverse()[0] as any;
			})
		})
	}
}
