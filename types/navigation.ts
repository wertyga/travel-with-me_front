import React from 'react';

import { RouteProp } from '@react-navigation/core';

import { Chat } from '@/types/chat';
import { Place } from '@/types/place';
import { User } from '@/types/user';

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
  OfflineStorage = 'OfflineStorage',
  Offline = 'Offline',
  Achievements = 'Achievements',
  UsersNearMe = 'UsersNearMe',
  Chat = 'Chat',
  ChatList = 'ChatList',
  AddGuideStepOne = 'AddGuideStepOne',
  AddGuideMap = 'AddGuideMap',
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
  [SCREENS.Contact]: undefined;
  [SCREENS.OfflineStorage]: undefined;
  [SCREENS.Achievements]: undefined;
  [SCREENS.UsersNearMe]: undefined;
  [SCREENS.ChatList]: undefined;
  [SCREENS.AddGuideStepOne]: undefined;
  [SCREENS.AddGuideMap]: {
    title: string;
    description: string;
    city: City;
  };
  [SCREENS.Chat]: { withUser: User };
  [SCREENS.Place]: { point: Place };
  [SCREENS.Error]: { error: string };
};

export type ParamsListType<HREF extends keyof typeof SCREENS> =
  HREF extends keyof RootStackParamList ? RootStackParamList[HREF] : never;

export type PageScreen<SCREEN extends keyof RootStackParamList> = React.FC<{
  route: RouteProp<RootStackParamList, SCREEN>;
}>;
