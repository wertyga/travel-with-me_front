import { RootStore } from '@/mobx/RootStore';
import {makeObservable, observable, runInAction} from 'mobx';
import {Place} from "@/types";
import {fetchPlace} from "@/api";
import {cacheWrap} from "@/utils/cache_request";

export class PlaceStore {
	@observable isLoading: boolean;
	@observable place: Place| null = null;
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	async getPlace(...params: Parameters<typeof fetchPlace>) {
		try {
			const cachedReq = cacheWrap.apply(this, [fetchPlace, params]);
		  const {place} = await cachedReq.withLoading().invoke()
			
			runInAction(() => {
				this.place = place;
			})
		} catch (e) {
		
		}
	}
}
