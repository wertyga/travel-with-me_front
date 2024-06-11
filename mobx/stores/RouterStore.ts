import {action, makeObservable, observable} from 'mobx';
import {NavigationContainerRefWithCurrent} from "@react-navigation/native";
import {RootStoreType, SCREENS} from "@/types";



export class RouterStore {
	navigator: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
	
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
	
	navigateToError(error: string) {
		// @ts-ignore
		this.navigator.navigate(SCREENS.Error, {error})
	}
	
	@action onReady(navigationRef: typeof this.navigator) {
		this.navigator = navigationRef;
	}
}
