import { RootStore } from '@/mobx/RootStore';
import {makeObservable, observable, runInAction} from 'mobx';
import {Place} from "@/types";
import {withLoading} from "@/mobx/store.utils";
import {fetchPlace} from "@/api";

export class PlaceStore {
	@observable isLoading: boolean;
	@observable place: Place| null = null;
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	@withLoading async getPlace(...params: Parameters<typeof fetchPlace>) {
		try {
		  const {place} = await fetchPlace(...params)
			
			runInAction(() => {
				this.place = place;
			})
		} catch (e) {
		
		}
	}
}
