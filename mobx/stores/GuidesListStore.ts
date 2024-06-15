import {makeObservable, observable, runInAction} from "mobx";
import {fetchGuidesList} from "@/api";
import {Guide, RootStoreType} from "@/types";
import {CacheReq, cacheWrap} from "@/utils/cache_request";

export class GuidesListStore {
	@observable isLoading: boolean;
	@observable guides: Guide[] = [];
	@observable total = 0;
	
	constructor(public rootStore: RootStoreType) {
		makeObservable(this);
	}
	
	async getGuidesList(...params: Parameters<typeof fetchGuidesList>) {
		try {
			const cachedReq = cacheWrap.apply(this, [fetchGuidesList, params]);
			const {guides, total} = await cachedReq.withLoading().invoke();
			
			runInAction(() => {
				this.guides = guides;
				this.total = total;
			})
		} catch (e) {
		
		}
	}
}
