import React from 'react';

import ChangeEmailScreen from '@/screens/ChangeEmail';
import ChatScreen from '@/screens/Chat.screen';
import ChatListScreen from '@/screens/ChatList.screen';
import CitiesListScreen from '@/screens/CitiesList.screen';
import CityScreen from '@/screens/City.screen';
import ContactScreen from '@/screens/Contact.screen';
import ErrorScreen from '@/screens/Error';
import FavoritesScreen from '@/screens/Favorites.screen';
import GuideScreen from '@/screens/Guide.screen';
import GuideMapScreen from '@/screens/GuideMap.screen';
import LoginScreen from '@/screens/Login';
import OfflineScreen from '@/screens/Offline.screen';
import OfflineStorageScreen from '@/screens/OfflineStorage.screen';
import PlaceScreen from '@/screens/Place.screen';
import ProfileScreen from '@/screens/Profile';
import RecoveryPasswordScreen from '@/screens/RecoveryPassword';
import SubscriptionsScreen from '@/screens/Subscriptions';
import UserAchievementsScreen from '@/screens/UserAchievements.screen';
import UsersNearMeScreen from '@/screens/UsersNearMe.screen';

import { SCREENS } from '@/types';

type ScreenType = {
  name: SCREENS;
  component: React.FunctionComponent;
};

export const onLineScreens: ScreenType[] = [
  {
    name: SCREENS.CitiesList,
    component: CitiesListScreen,
  },
  {
    name: SCREENS.City,
    component: CityScreen,
  },
  {
    name: SCREENS.Profile,
    component: ProfileScreen,
  },
  {
    name: SCREENS.Place,
    component: PlaceScreen,
  },
  {
    name: SCREENS.GuideMap,
    component: GuideMapScreen,
  },
  {
    name: SCREENS.Guide,
    component: GuideScreen,
  },
  {
    name: SCREENS.Subscriptions,
    component: SubscriptionsScreen,
  },
  {
    name: SCREENS.Error,
    component: ErrorScreen,
  },
  {
    name: SCREENS.Login,
    component: LoginScreen,
  },
  {
    name: SCREENS.Favorite,
    component: FavoritesScreen,
  },
  {
    name: SCREENS.Contact,
    component: ContactScreen,
  },
  {
    name: SCREENS.RecoveryPassword,
    component: RecoveryPasswordScreen,
  },
  {
    name: SCREENS.ChangeEmail,
    component: ChangeEmailScreen,
  },
  {
    name: SCREENS.OfflineStorage,
    component: OfflineStorageScreen,
  },
  {
    name: SCREENS.Offline,
    component: OfflineScreen,
  },
  {
    name: SCREENS.Achievements,
    component: UserAchievementsScreen,
  },
  {
    name: SCREENS.UsersNearMe,
    component: UsersNearMeScreen,
  },
  {
    name: SCREENS.Chat,
    component: ChatScreen,
  },
  {
    name: SCREENS.ChatList,
    component: ChatListScreen,
  },
];

export const offLineScreens: ScreenType[] = [
  {
    name: SCREENS.Guide,
    component: GuideScreen,
  },
  {
    name: SCREENS.GuideMap,
    component: GuideMapScreen,
  },
  {
    name: SCREENS.Place,
    component: PlaceScreen,
  },
];
