import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import _flatten from 'lodash/flatten';
import _flattenDeep from 'lodash/flattenDeep';
import Toast from 'react-native-toast-message';

import { City, Guide, Place, RootStoreType, UserSubscription } from '@/types';
import { getCachedBunchImages, getImageFromCacheOrSaveImageToCache, storage, formatBytes } from '@/utils';
import { fetchCity, fetchGuide } from '@/api';
import { withLoading } from '@/mobx/store.utils';
import { User } from '@/types/user';
import * as FileSystem from 'expo-file-system';
import { AppStateStore } from '@/mobx/stores/AppStateStore';

export const OFFLINE_KEYS = {
  user: 'offline_user',
  cities: 'offline_cities',
  guides: 'offline_guides',
  userSubscription: 'offline_user_subscription',
  env: 'env_subscription'
};

export class OfflineStore {
  @observable cities: City[] = [];
  @observable userSubscription: UserSubscription | null = null;
  @observable cachedCitiesIds: string[] = [];
  
  @observable isLoading = false;
  @observable isCitySaved = false;
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }
  
  async onInitiate() {
    const cachedCities = await  storage.get(OFFLINE_KEYS.cities);
    
    runInAction(() => {
      this.cachedCitiesIds = (cachedCities || []).map(({_id}) => _id);
    })
  }
  
  private async _getCityPlacesAudioStories(citySlug: string) {
    const city = await storage.get(OFFLINE_KEYS.cities).then(cities => (cities || []).find(({slug}) => slug === citySlug));
    if (!city) return [];
    
    return Array.from(new Set(_flattenDeep(city.guides.map(({points}) => points)).map(({ audioStory }) => audioStory)));
  }
  
  getGuide(idOrSlug: string) {
    return this.guides.find(guide => guide._id === idOrSlug || guide.slug === idOrSlug);
  }
  
  getCity(idOrSlug: string) {
    return this.cities.find(city => city._id === idOrSlug || city.slug === idOrSlug);
  }
  
  getPlace(idOrSlug: string): Place | null {
    let needPlace = null;
    
    this.guides.find(guide => {
      needPlace = guide.points.find(point => point._id === idOrSlug || point.slug === idOrSlug);
      if (needPlace) {
        needPlace.city = guide.city;
      }
      
      return !!needPlace;
    });
    
    return needPlace;
  }
  
  async getCities() {
    const cities = await storage.get(OFFLINE_KEYS.cities);
    
    return cities || [];
  }
  
  async getCityMemoryUsage(citySlug: string) {
    try {
      const city = await storage.get(OFFLINE_KEYS.cities).then(cities => cities.find(({slug}) => slug === citySlug));

      if (!city) return '0 Bytes';
   
      const placesAudios = await this._getCityPlacesAudioStories(citySlug);
      if (!placesAudios.length) return '0 Bytes';
      
      const placesAudioStoriesSizes = await Promise.all(placesAudios.map((audioStory) => {
        if (!audioStory) return 0;
        
        return FileSystem.getInfoAsync(audioStory).then((stats: any) => {
            return stats.size || 0
          })
          .catch((err) => {
            return 0;
          })
      })).then(sizes => sizes.reduce((acc, size) => acc + size, 0));
      
      const textSize = JSON.stringify(city).length;
      
      return formatBytes(textSize + placesAudioStoriesSizes)
    } catch (e) {
      console.log({e});
    }
  }
  
  getOfflineUser() {
    return storage.get(OFFLINE_KEYS.user)
  }
  
  saveUserSubscription(subscription: UserSubscription) {
    storage.set(OFFLINE_KEYS.userSubscription, subscription)
  }
  
  saveUser(user: User) {
    storage.set(OFFLINE_KEYS.user, user)
  }
  
  saveEnv(env: typeof AppStateStore.ENV) {
    storage.set(OFFLINE_KEYS.env, env)
  }
  
  @action setIsCitySaved(value: boolean) {
    this.isCitySaved = value;
  }
  
  @computed get guides(): Guide[] {
    return _flatten(this.cities.map(({guides}) => guides));
  }
  
  private async handleCityPlaces(city: City) {
    const placesImagesAndAudio = city.guides.map(guide => {
      return guide.points.map(({images, audioStory}) => ({
        images,
        audioStory
      }));
    });
    
    const cachedPlacesImages = await Promise.all(
      placesImagesAndAudio.map(imagesAndAudioArrs => Promise.all(
        imagesAndAudioArrs.map(({ images, audioStory }) => Promise.all([getCachedBunchImages(images), getImageFromCacheOrSaveImageToCache(audioStory)]))
      )));
    
    city.guides.forEach((guide, guideIndex) => {
      guide.points.forEach((point, pointIndex) => {
        point.images = cachedPlacesImages[guideIndex][pointIndex][0];
        point.audioStory = cachedPlacesImages[guideIndex][pointIndex][1];
      })
    })
  }
  
  private async saveGuideWithImages(guide: Guide) {
    const guideCachedImages = await getCachedBunchImages([guide.vImage, guide.hImage]);
    const placesImages = await Promise.all(guide.points.map(point => getCachedBunchImages(point.images)));
    
    const cachedGuide: Guide = {
      ...guide,
      vImage: guideCachedImages[0],
      hImage: guideCachedImages[1],
      points: guide.points.map((point, i) => ({
        ...point,
        images: placesImages[i],
      }))
    };
    
    return cachedGuide;
  }
  
  @withLoading async saveCity(citySlug: string) {
    try {
      const { city } = await fetchCity({slug: citySlug});
      if (!city) return;
      
      city.image = await getImageFromCacheOrSaveImageToCache(city.image);
      city.guides = await Promise.all(
        city.guides.map(guide =>
          fetchGuide({slug: guide.slug, withFullPoints: true})
          .then(guide => this.saveGuideWithImages(guide))
        )
      );
      
      await this.handleCityPlaces(city);
      
      const cachedCities = await this.getCities().then(cities => (cities || []).filter(c => c._id !== city._id));
      const cities =  [...cachedCities, city]
      await storage.set(OFFLINE_KEYS.cities, cities);
   
      runInAction(() => {
        this.cities = cities;
        this.cachedCitiesIds = cities.map(({_id}) => _id);
        this.setIsCitySaved(true);
      })
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e.message,
      })
    }
  }
  
  @withLoading async removeCityFromStorage(citySlug: string) {
    try {
        const cities = await this.getCities();
        const audioStories = await this._getCityPlacesAudioStories(citySlug);
        
        await Promise.all(audioStories.map((audioStory: string) => {
          return FileSystem.getInfoAsync(audioStory).then(stat => {
            if (!stat.exists) return;

            return FileSystem.deleteAsync(audioStory)
          })
        }))

        const filteredCities = cities.filter(({slug}) => slug !== citySlug);

        await storage.set(OFFLINE_KEYS.cities, filteredCities);

        runInAction(() => {
          this.cachedCitiesIds = filteredCities.map(({_id}) => _id);
          this.rootStore.citiesListStore.cityLightList = filteredCities;
          this.cities = filteredCities;
        });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e.message,
      })
    }
  }
  
  @withLoading async populateOfflineStore() {
    const [cachedCities, cachedUser, mySubscription, env] = await Promise.all([
      this.getCities(),
      storage.get(OFFLINE_KEYS.user),
      storage.get(OFFLINE_KEYS.userSubscription),
      storage.get(OFFLINE_KEYS.env),
    ]);
    
    const isSubscriptionValid = !!mySubscription && new Date(mySubscription.validUntil).getTime() > Date.now();
    if (!isSubscriptionValid) {
      Toast.show({
        type: 'error',
        text1: 'Your subscription is expired',
      });
      return;
    }
    
    runInAction(() => {
      this.rootStore.citiesListStore.cityLightList = cachedCities || [];
      this.rootStore.userStore.setUser(cachedUser);
      this.rootStore.subscriptionStore.mySubscription = mySubscription;
      this.cities = cachedCities || [];
      AppStateStore.ENV = env;
    })
  }
  
  @action dropStore() {
    this.cities = [];
  }
}
