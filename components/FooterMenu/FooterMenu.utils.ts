import { ICONS_MAP } from '@/components/Icon/Icon';
import { SCREENS } from '@/types';

export const FOOTER_MENU: {
  icon: keyof typeof ICONS_MAP;
  screen: SCREENS;
  title: string;
}[] = [
  {
    icon: 'map-point',
    screen: SCREENS.WorldGuidesMap,
    title: 'Map',
  },
  {
    icon: 'heart',
    screen: SCREENS.Favorite,
    title: 'Favorite',
  },
  {
    icon: 'profile',
    screen: SCREENS.Profile,
    title: 'Account',
  },
];
