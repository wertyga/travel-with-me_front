import { RootStore } from '@/mobx/RootStore';
import {makeObservable, observable, runInAction} from 'mobx';
import {Place} from "@/types";
import {fetchPlace} from "@/api";
import {CacheReq} from "@/utils";

export class PlaceStore {
	@observable isLoading: boolean;
	@observable place: Place| null = null;
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	async getPlace(...params: Parameters<typeof fetchPlace>) {
		try {
			const cachedReq = CacheReq.wrap(fetchPlace, params);
		  const {place} = await cachedReq.withLoading(this).invoke()
			
			runInAction(() => {
				this.place = place;
			})
		} catch (e) {
		
		}
	}
}
