import {makeObservable, observable, runInAction} from 'mobx';
import {City, RootStoreType} from "@/types";
import { fetchLightCityList } from '@/api';
import {withLoading} from "@/mobx/store.utils";

export class CitiesListStore {
  @observable isLoading: boolean;
  @observable cityLightList: City[] = [];
  @observable total: number = 0;
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
  
  @withLoading async getCityLightList() {
    try {
      const {cities, total} = await fetchLightCityList();

      runInAction(() => {
        this.cityLightList = cities;
        this.total = total;
      })
    } catch (e) {
      this.rootStore.routerStore.navigateToError(e.message)
    }
  }
}
