import {action, computed, makeObservable, observable} from "mobx";
import {ViewStyle} from "react-native";
import {RootStore} from "@/mobx/RootStore";

type StyleType = ViewStyle & {hidden?: boolean}

export class DomStore {
	@observable footer: StyleType = {} as StyleType;
	@observable header: StyleType = {} as StyleType;
	@observable layout: StyleType = {} as StyleType;
	
	constructor(rootStore: RootStore) {
		makeObservable(this);
	}
	
	@action updateDomState(data: Partial<Record<'footer' | 'header' | 'layout', StyleType>>) {
		Object.entries(data).forEach(([name, state]) => {
			this[name] = state;
		})
	}
	
	@computed get layoutHeight(): number {
		return Number(this.layout.height || 0)
	}
}
