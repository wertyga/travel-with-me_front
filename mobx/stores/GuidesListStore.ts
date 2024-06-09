import {RootStore} from "@/mobx/RootStore";
import {makeObservable, observable, runInAction} from "mobx";
import {withLoading} from "@/mobx/store.utils";
import {fetchGuidesList} from "@/api";
import {Guide} from "@/types";

export class GuidesListStore {
	@observable isLoading: boolean;
	@observable guides: Guide[] = [];
	@observable total = 0;
	
	constructor(rootStore: RootStore) {
		makeObservable(this);
	}
	
	@withLoading async getGuidesList(...params: Parameters<typeof fetchGuidesList>) {
		try {
			const {guides, total} = await fetchGuidesList(...params);
			
			runInAction(() => {
				this.guides = guides;
				this.total = total;
			})
		} catch (e) {
		
		}
	}
}
