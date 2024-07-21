import { action, makeObservable, observable, runInAction } from 'mobx';
import { City, RootStoreType } from '@/types';
import {fetchCity} from "@/api";
import {cacheWrap} from "@/utils/cache_request";


export class CityStore {
	@observable city: City | null = null;
	@observable isLoading: boolean;
	
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
	
	@action async getCity(...params: Parameters<typeof fetchCity>) {
		try {
			if (!this.rootStore.appStateStore.isNetConnected) {
				this.city = this.rootStore.offlineStore.getCity(params[0].slug || params[0]._id);
				
				return this.city;
			}
			
			const cachedReq = cacheWrap.apply(this, [fetchCity, params]);
		  const {city} = await cachedReq.withLoading().invoke();

			runInAction(() => {
				this.city = city;
			});

			return city;
		} catch (e) {
		console.log({e});
		}
	}
}
