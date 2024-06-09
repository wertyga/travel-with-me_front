import { RootStore } from '@/mobx/RootStore';
import {Guide, Path} from '@/types';
import {action, makeObservable, observable, runInAction} from 'mobx';
import { startWatchToLiveLocation } from './location.utils';

export class LocationStore {
  locationWatcher: any = null;
  @observable liveCoords: Path | null = null;
  
  constructor(public rootStore: RootStore) {
    makeObservable(this);
  }

  @action onStartWatchingLocation(guide: Guide, callback?: (guide: Guide) => void) {
    this.locationWatcher = startWatchToLiveLocation(liveCoords => {
      runInAction(() => {
        this.liveCoords = liveCoords;
      })
      
      callback?.(guide)
    });
  }
  
  @action dropStore() {
    this.locationWatcher?.remove?.();
    this.locationWatcher = null;
    this.liveCoords = null;
  }
}
