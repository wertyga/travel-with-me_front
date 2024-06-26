import { Audio } from 'expo-av';
import { action, makeObservable, observable, reaction, runInAction } from 'mobx';
import { RootStoreType } from '@/types';
import { getNotificationAsync, removeNotification, showNotification, storage } from '@/utils';
import { CONSTANTS } from '@/styles/constants';
import * as Notifications from 'expo-notifications';

const IDENTIFIERS = {
  point: {
    category: 'point-playback-category',
    baseID: 'point-playback',
    stopAction: 'stop-playback',
  },
  default: {
    action: 'expo.modules.notifications.actions.DEFAULT'
  }
}

export class SoundStore {
  private audio: Audio.Sound | null = null;
  
  @observable isPlaying = false;
  @observable isPaused = false;
  @observable isLoading = false;
  @observable playedPercent = 0;
  @observable audioUrl = '';
  
  constructor(rootStore: RootStoreType) {
    makeObservable(this);
    
    reaction(() => this.playedPercent, () => {
      this.stopPointPlaybackIfNoNotification();
    })
  }
  
  async onInitiate() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    
    await Notifications.setNotificationCategoryAsync(IDENTIFIERS.point.category, [
      {
        identifier: IDENTIFIERS.point.stopAction,
        buttonTitle: 'Stop playback',
        options: {
          opensAppToForeground: true,
        },
      },
    ]);
    
    Notifications.addNotificationResponseReceivedListener((response) => {
      const { notification: { request: { content: { categoryIdentifier } } }, actionIdentifier } = response as any;

      if (categoryIdentifier === IDENTIFIERS.point.category && actionIdentifier === IDENTIFIERS.point.stopAction) {
        this.dropState();
      }
    })
  }
  
  async goPlay(title: string) {
    await this.audio?.playAsync();
    
    this.showPointPlaybackNotification(title);
  }
  
  private showPointPlaybackNotification(title: string) {
    const id = `${IDENTIFIERS.point.baseID}_${title}`;
    storage.set(IDENTIFIERS.point.baseID, id);
    
    showNotification({
      identifier: id,
      content: {
        title: title,
        color: CONSTANTS.colors.bg1,
        categoryIdentifier: IDENTIFIERS.point.category,
        autoDismiss: false,
      },
    });
  }
  
  @action async playSound(audioUrl: string, notificationTitle: string) {
   try {
     this.isLoading = true;
     
     if (this.audioUrl !== audioUrl) {
       await this.dropState();
     }
     
     if (this.audio) {
       if (this.isPlaying) {
         await this.setPause();
       } else {
         await this.goPlay(notificationTitle);
         
         runInAction(() => {
           this.isPaused = false;
           this.isLoading = false;
         })
       }
       return;
     }
     
     const { sound } = await Audio.Sound.createAsync(
       { uri: audioUrl },
       undefined,
       this.onPlaybackStatusUpdate
     );
     
     runInAction(() => {
       this.audio = sound;
       this.audioUrl = audioUrl;
       this.isLoading = false;
     })
     
     await this.goPlay(notificationTitle);
   } catch (e) {
     console.log({e});
   }
  }
  
  @action async setPause() {
    await this.audio?.pauseAsync();
    
    runInAction(() => {
      this.isPaused = true;
      this.isLoading = false;
    });
  }
  
  @action onPlaybackStatusUpdate(status) {
    const { positionMillis, durationMillis, isPlaying } = status;
    
    const percents = Math.round(positionMillis / ((durationMillis || 1) / 100));
    
    this.isPlaying = isPlaying;
    this.playedPercent = percents;
    
    if (percents === 100 && !isPlaying) {
      this.stopSound();
    }
  }
  
  async getPointPlaybackID() {
    return storage.get(IDENTIFIERS.point.baseID);
  }
  
  stopSound(){
    this.audio?.stopAsync();
    this.audio?.setPositionAsync(0);
    this.removeSoundNotification();
  };
  
  async removeSoundNotification() {
    const pointPlaybackID = await this.getPointPlaybackID();
    await removeNotification(pointPlaybackID);
    
    storage.delete(IDENTIFIERS.point.baseID);
  }
  
  @action async dropState () {
    await Promise.all([
      this.audio?.unloadAsync(),
      this.removeSoundNotification()
    ]);
    
    runInAction(() => {
      this.audio = null;
      this.playedPercent = 0;
      this.isLoading = false;
      this.isPaused = false;
      this.isPlaying = false;
      this.audioUrl = '';
    })
  }
  
  async stopPointPlaybackIfNoNotification() {
    const id = await this.getPointPlaybackID();
    if (!id) return;
    
    const notification = await getNotificationAsync(id);
    if (!notification) {
      this.dropState();
    }
  }
}
