import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import { ICONS_MAP } from '@/components/Icon/Icon';

import { SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type FooterMuItemType = {
  icon: keyof typeof ICONS_MAP | React.ReactNode;
  screen: SCREENS;
  title: string;
  iconSize?: number;
};

export const FOOTER_MENU: FooterMuItemType[] = [
  {
    icon: 'city',
    screen: SCREENS.CitiesList,
    title: 'Cities',
    iconSize: 26,
  },
  {
    icon: 'heart',
    screen: SCREENS.Favorite,
    title: 'Favorite',
  },
  {
    icon: <SimpleLineIcons name="people" size={26} color="white" />,
    screen: SCREENS.UsersNearMe,
    title: 'People',
  },
  {
    icon: 'profile',
    screen: SCREENS.Profile,
    title: 'Account',
  },
];
