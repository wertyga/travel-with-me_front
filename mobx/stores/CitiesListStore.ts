import {makeObservable, observable, runInAction} from 'mobx';
import {City, RootStoreType} from "@/types";
import {fetchLightCityList} from '@/api';
import {cacheWrap} from "@/utils/cache_request";

export class CitiesListStore {
  @observable isLoading: boolean;
  @observable cityLightList: City[] = [];
  @observable total: number = 0;
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
  
  async getCityLightList() {
    try {
      const cachedReq = cacheWrap.apply(this, [fetchLightCityList]);
      const {cities, total} = await cachedReq.withLoading().invoke();

      runInAction(() => {
        this.cityLightList = cities;
        this.total = total;
      })
    } catch (e) {
      this.rootStore.routerStore.navigateToError(e.message)
    }
  }
}
