import {RootStore} from '@/mobx/RootStore';
import {Path} from '@/types';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {getLocationPermission, startWatchToLiveLocation} from './location.utils';
import * as Location from "expo-location";


export class LocationStore {
  locationWatcher: any = null;
  
  @observable locationWatchingCallback: (() => void) | null = null;
  @observable isWatching: boolean;
  @observable isRequestLocationPopupShown: boolean;
  @observable liveCoords: Path | null = null;
  
  constructor(public rootStore: RootStore) {
    makeObservable(this);
  }
  
  @action setIsRequestLocationPopupShown(value: boolean) {
    this.isRequestLocationPopupShown = value;
  }
  
  @action async requestForWatchingLocation(callback?: () => void) {
    const {status} = await Location.getForegroundPermissionsAsync();

    this.dropStore();
    
    if (status === 'undetermined') {
      this.locationWatchingCallback = callback;
      this.isRequestLocationPopupShown = true;
    } else if (status === 'granted') {
      this.onStartWatchingLocation(callback);
    }
  }

  @action async onStartWatchingLocation(callback?: () => void) {
    if (this.isWatching) return;
    
    // Get fg permission
    const {granted} = await getLocationPermission();
  
    if (!granted) return;
  
    runInAction(() => {
      this.isWatching = true;
    })
    
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
    this.locationWatchingCallback = null;
    this.isRequestLocationPopupShown = false;
  }
}
