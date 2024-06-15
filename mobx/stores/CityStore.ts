import { RootStore } from '@/mobx/RootStore';
import { makeObservable, observable, runInAction} from 'mobx';
import {City} from "@/types";
import {fetchCity} from "@/api";
import {CacheReq} from "@/utils/cache_request";


export class CityStore {
	@observable city: City | null = null;
	@observable isLoading: boolean;
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	async getCity(...params: Parameters<typeof fetchCity>) {
		try {
			const cachedReq = CacheReq.wrap(fetchCity, params);
		  const {city} = await cachedReq.withLoading(this).invoke();
			
			runInAction(() => {
				this.city = city;
			});
			
			return city;
		} catch (e) {
		
		}
	}
}
