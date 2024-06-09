import { RootStore } from '@/mobx/RootStore';
import {makeObservable, action, observable, runInAction} from 'mobx';
import {City} from "@/types";
import {fetchCity} from "@/api";
import {withLoading} from "@/mobx/store.utils";

export class CityStore {
	@observable city: City| null = null;
	@observable isLoading: boolean;
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	@withLoading async getCity(...params: Parameters<typeof fetchCity>) {
		try {
		  const {city} = await fetchCity(...params);
			
			runInAction(() => {
				this.city = city;
			});
		} catch (e) {
		
		}
	}
}
