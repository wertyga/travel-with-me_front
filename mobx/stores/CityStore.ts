import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { City, Place, RootStoreType } from '@/types';
import {fetchCity} from "@/api";
import {cacheWrap} from "@/utils/cache_request";
import _flatten from 'lodash/flatten';


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
			
			const cachedReq = cacheWrap.apply(this, [fetchCity, {...params[0], withPlaces: true}]);
		  const {city} = await cachedReq.withLoading().invoke();

			runInAction(() => {
				this.city = city;
			});

			return city;
		} catch (e) {
		}
	}
	
	@action dropStore() {
		this.city = null;
		this.isLoading = false;
	}
	
	@computed get currentCityPlaces(): Place[]  {
		return _flatten(this.city?.guides.map(guide => {
			return guide.points
		}) || [])
	}
}
