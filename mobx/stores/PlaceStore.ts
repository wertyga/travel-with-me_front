import { action, makeObservable, observable, runInAction } from 'mobx';
import { Place, RootStoreType } from '@/types';
import {fetchPlace} from "@/api";
import {cacheWrap} from "@/utils/cache_request";
import { getIsNetConnected } from '@/utils/etc';

export class PlaceStore {
	@observable isLoading: boolean;
	@observable place: Place| null = null;

  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }

	@action async getPlace(...params: Parameters<typeof fetchPlace>) {
		try {
			if (!getIsNetConnected()) {
				this.place = this.rootStore.offlineStore.getPlace(params[0].slug);
				return;
			}

			const cachedReq = cacheWrap.apply(this, [fetchPlace, params]);
		  const {place} = await cachedReq.withLoading().invoke()

			runInAction(() => {
				this.place = place;
			})
		} catch (e) {

		}
	}
}
