import { action, makeObservable, observable, runInAction } from 'mobx';
import { City, Path, RootStoreType } from '@/types';
import {fetchLightCityList} from '@/api';
import {cacheWrap} from "@/utils/cache_request";
import { isPointInSquare } from '@/utils/map';
import { getIsNetConnected } from '@/utils/etc';

export class CitiesListStore {
  @observable isLoading: boolean;
  @observable cityLightList: City[] = []
  @observable total: number = 0;

  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }

  @action async getCityLightList() {
    try {
      if (!getIsNetConnected()) {
        this.cityLightList = this.rootStore.offlineStore.cities;
        this.total = this.rootStore.offlineStore.cities.length;
      } else {
        const cachedReq = cacheWrap.apply(this, [fetchLightCityList]);
        const {cities, total} = await cachedReq.withLoading().invoke();

        runInAction(() => {
          this.cityLightList = cities;
          this.total = total;
        });
      }

      return {
        cities: this.cityLightList,
        total: this.total
      }
    } catch (e) {
      this.rootStore.routerStore.navigateToError(e.message)
    }
  }

  getCityByCoords({ lat, lng }: Path) {
    return this.cityLightList.find(({squareCoords}) => {
      return isPointInSquare(lat, lng, squareCoords);
    })
  }
}
