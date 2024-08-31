import {RootStore} from '@/mobx/RootStore';
import {Path} from '@/types';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {getLocationPermission, startWatchToLiveLocation} from './location.utils';


export class LocationStore {
  locationWatcher: any = null;
  locationWatchingCallback: (() => void) | null = null;
  
  @observable isWatching: boolean;
  @observable liveCoords: Path | null = null;
  
  constructor(public rootStore: RootStore) {
    makeObservable(this);
  }

  @action async onStartWatchingLocation() {
    if (this.isWatching) return;
    
    // Get fg permission
    const { granted } = await getLocationPermission();
 
    if (!granted) return;
    
    this.dropStore();
    
    runInAction(() => {
      this.isWatching = true;
    });

    this.locationWatcher = await startWatchToLiveLocation(liveCoords => {
      runInAction(() => {
        this.liveCoords = liveCoords;
      })
    });
  }
  
  @action async dropStore() {
    this.liveCoords = null;
    this.isWatching = false;
    this.locationWatchingCallback = null;
    
    await this.locationWatcher?.remove();
    this.locationWatcher = null;
  }
}
