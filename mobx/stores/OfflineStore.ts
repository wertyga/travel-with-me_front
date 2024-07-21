import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import _flatten from 'lodash/flatten';
import Toast from 'react-native-toast-message';

import { City, Guide, Place, RootStoreType, UserSubscription } from '@/types';
import { getCachedBunchImages, getImageFromCacheOrSaveImageToCache, storage } from '@/utils';
import { fetchCity, fetchGuide } from '@/api';
import { withLoading } from '@/mobx/store.utils';
import { User } from '@/types/user';

export const OFFLINE_KEYS = {
  user: 'offline_user',
  cities: 'offline_cities',
  guides: 'offline_guides',
  userSubscription: 'offline_user_subscription'
};

export class OfflineStore {
  @observable cities: City[] = [];
  @observable userSubscription: UserSubscription | null = null;
  @observable isSubscriptionValid = false;
  
  @observable isLoading = false;
  @observable isCitySaved = false;
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
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
  
  getOfflineUser() {
    return storage.get(OFFLINE_KEYS.user)
  }
  
  saveUserSubscription(subscription: UserSubscription) {
    storage.set(OFFLINE_KEYS.userSubscription, subscription)
  }
  
  saveUser(user: User) {
    storage.set(OFFLINE_KEYS.user, user)
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
      
      const cachedCities = await storage.get(OFFLINE_KEYS.cities).then(cities => (cities || []).filter(c => c._id !== city._id));
      const cities =  [...cachedCities, city]
      await storage.set(OFFLINE_KEYS.cities, cities);
   
      runInAction(() => {
        this.cities = cities;
        this.setIsCitySaved(true);
      })
    } catch (e) {
      console.log({e});
    }
  }
  
  @action async getUserSubscription() {
    const sub: UserSubscription = await storage.get(OFFLINE_KEYS.userSubscription);

    runInAction(() => {
      this.userSubscription = sub;
      this.isSubscriptionValid = !!sub && new Date(sub.validUntil).getTime() > new Date().getTime();
    })
  }
  
  @withLoading async populateOfflineStore() {
    await this.getUserSubscription();
    
    if (!this.isSubscriptionValid) {
      Toast.show({
        type: 'error',
        text1: 'Network connection failed',
      });
      return;
    }
    
    const cachedCities = await storage.get(OFFLINE_KEYS.cities);
    const cachedUser = await storage.get(OFFLINE_KEYS.user);
    
    runInAction(() => {
      this.rootStore.citiesListStore.cityLightList = cachedCities || [];
      this.rootStore.userStore.setUser(cachedUser);
      this.cities = cachedCities || [];
    })
  }
  
  @action dropStore() {
    this.cities = [];
  }
}
