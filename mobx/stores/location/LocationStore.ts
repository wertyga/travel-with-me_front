import { RootStore } from '@/mobx/RootStore';
import {Guide, Path} from '@/types';
import {action, makeObservable, observable, runInAction} from 'mobx';
import { startWatchToLiveLocation } from './location.utils';

export class LocationStore {
  locationWatcher: any = null;
  @observable isWatching: boolean;
  @observable liveCoords: Path | null = null;
  
  constructor(public rootStore: RootStore) {
    makeObservable(this);
  }

  @action async onStartWatchingLocation(callback?: () => void) {
    if (this.isWatching) return;
    this.isWatching = true;
    
    this.locationWatcher = await startWatchToLiveLocation(liveCoords => {
      runInAction(() => {
        this.liveCoords = liveCoords;
      })
   
      callback?.()
    });
  }
  
  @action dropStore() {
    this.locationWatcher?.remove();
    this.locationWatcher = null;
    this.liveCoords = null;
    this.isWatching = false;
  }
}
