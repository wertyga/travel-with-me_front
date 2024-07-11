import { RootStore } from '@/mobx/RootStore';
import {makeObservable, action, observable, runInAction} from 'mobx';
import {GetGlobalSearchResponse} from "@/types";
import {fetchGlobalSearch} from "@/api";
import {withLoading} from "@/mobx/store.utils";

export class SearchStore {
	private _initialState = {
		cities: [],
		places: [],
		guides: []
	}
	@observable isLoading: boolean;
	@observable global: GetGlobalSearchResponse = this._initialState
	
  constructor(rootStore: RootStore) {
    makeObservable(this);
  }
	
	@withLoading async getGlobalSearch(...params: Parameters<typeof fetchGlobalSearch>) {
		try {
		  const data = await fetchGlobalSearch(...params);

			runInAction(() => {
				this.global = data;
			})
		} catch (e) {
		
		}
	}
	
	@action dropStore() {
		this.global = this._initialState
	}
}
