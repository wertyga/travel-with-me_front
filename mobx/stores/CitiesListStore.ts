import { action, makeObservable, observable, runInAction } from 'mobx';
import {City, RootStoreType} from "@/types";
import {fetchLightCityList} from '@/api';
import {cacheWrap} from "@/utils/cache_request";
import { AppStateStore } from '@/mobx/stores/AppStateStore';

export class CitiesListStore {
  @observable isLoading: boolean;
  @observable cityLightList: City[] = [];
  @observable total: number = 0;
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
  
  @action async getCityLightList() {
    try {
      if (!AppStateStore.isNetConnected) {
        // It set up in OfflineStore
        return;
      }
      
      const cachedReq = cacheWrap.apply(this, [fetchLightCityList]);
      const {cities, total} = await cachedReq.withLoading().invoke();

      runInAction(() => {
        this.cityLightList = cities;
        this.total = total;
      });
    } catch (e) {
      this.rootStore.routerStore.navigateToError(e.message)
    }
  }
}
