import React from 'react';

import { RouteProp } from '@react-navigation/core';

import { City } from './city';
import { Guide } from './guide';

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
  Contact = 'Contact',
  Offline = 'Offline',
}

export type RootStackParamList = {
  [SCREENS.City]: { city?: City; isFromError?: boolean } | undefined;
  [SCREENS.ChangeEmail]: undefined;
  [SCREENS.RecoveryPassword]: undefined;
  [SCREENS.Login]: undefined;
  [SCREENS.Guide]: { guide: Guide };
  [SCREENS.CitiesList]: undefined;
  [SCREENS.GuideMap]: { guideSlug: string; isOnlyMap?: boolean; guide: Guide };
  [SCREENS.Subscriptions]: undefined;
  [SCREENS.Favorite]: undefined;
  [SCREENS.Profile]: undefined;
  [SCREENS.WorldGuidesMap]: undefined;
  [SCREENS.Offline]: undefined;
  [SCREENS.Contact]: undefined;
  [SCREENS.Place]: { placeSlug: string; autoplay?: boolean };
  [SCREENS.Error]: { error: string };
};

export type ParamsListType<DEPENDENCY> = DEPENDENCY extends SCREENS
  ? RootStackParamList[DEPENDENCY]
  : undefined;

export type PageScreen<SCREEN extends keyof RootStackParamList> = React.FC<{
  route: RouteProp<RootStackParamList, SCREEN>;
}>;
