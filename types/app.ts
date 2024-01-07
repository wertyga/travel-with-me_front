import { LocationStore } from './location';
import WorldGuidesMap from '@/screens/WorldGuidesMap';

export enum SCREENS {
  Home = 'Home',
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
}

export type RootStore = {
  location: LocationStore;
};
