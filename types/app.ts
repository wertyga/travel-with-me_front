import { AppStateStatus } from 'react-native';
import { GuideStore } from '@/types/guide';
import { DomStore } from '@/types/dom';
import { LocationStore } from './location';
import { AppStateType } from '@/stores/appState/appState.reducer';

export type AppStateStore = {
  state: AppStateStatus;
};

export enum SCREENS {
  City = 'City',
  GuideMap = 'GuideMap',
  CitiesList = 'CitiesList',
  Guide = 'Guide',
  Subscriptions = 'Subscriptions',
  Error = 'Error',
  Login = 'Login',
  RecoveryPassword = 'RecoveryPassword',
  ChangeEmail = 'ChangeEmail',
  Profile = 'Profile',
  Place = 'Place',
  Favorite = 'Favorite',
  WorldGuidesMap = 'WorldGuidesMap',
}

export enum FONTS {
  Crimson = 'Crimson',
  CrimsonSemiBold = 'CrimsonSemiBold',
  CrimsonBold = 'CrimsonBold',
  OpenSans = 'OpenSans',
  OpenSansSemiBold = 'OpenSansSemiBold',
  OpenSansBold = 'OpenSansBold',
}

export type RootStore = {
  locationStore: LocationStore;
  guideStore: GuideStore;
  domStore: DomStore;
  appStateStore: AppStateType;
};
