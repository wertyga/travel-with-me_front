import { RootStoreType as RootStoreTypeRoot } from '@/mobx/RootStore';
import * as stores from '@/mobx/stores';

export type RootStoreType = RootStoreTypeRoot<{
  userStore: stores.UserStore;
  authStore: stores.AuthStore;
  routerStore: stores.RouterStore;
  domStore: stores.DomStore;
  citiesListStore: stores.CitiesListStore;
  searchStore: stores.SearchStore;
  cityStore: stores.CityStore;
  // subscriptionStore: stores.SubscriptionStore;
  guideStore: stores.GuideStore;
  guidesListStore: stores.GuidesListStore;
  placeStore: stores.PlaceStore;
  locationStore: stores.LocationStore;
  appStateStore: stores.AppStateStore;
  soundStore: stores.SoundStore;
  offlineStore: stores.OfflineStore;
  achievementsStore: stores.AchievementsStore;
  chatsStore: stores.ChatsStore;
  analyticStore: stores.AnalyticStore;
}>;
