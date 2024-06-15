import {makeObservable, observable, runInAction} from 'mobx';
import {City, RootStoreType} from "@/types";
import {fetchGuide, fetchLightCityList} from '@/api';
import {withLoading} from "@/mobx/store.utils";
import {CacheReq} from "@/utils";

export class CitiesListStore {
  @observable isLoading: boolean;
  @observable cityLightList: City[] = [];
  @observable total: number = 0;
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
  
  async getCityLightList() {
    try {
      const cachedReq = CacheReq.wrap(fetchLightCityList);
      const {cities, total} = await cachedReq.withLoading(this).invoke();

      runInAction(() => {
        this.cityLightList = cities;
        this.total = total;
      })
    } catch (e) {
      this.rootStore.routerStore.navigateToError(e.message)
    }
  }
}
