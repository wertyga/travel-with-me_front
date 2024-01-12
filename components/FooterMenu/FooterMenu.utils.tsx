import { ICONS_MAP } from '@/components/Icon/Icon';
import { FontAwesome } from '@expo/vector-icons';
import { SCREENS } from '@/types';

export const FOOTER_MENU: {
  icon: keyof typeof ICONS_MAP | React.ReactNode;
  screen: SCREENS;
  title: string;
}[] = [
  {
    icon: <FontAwesome name="map-o" size={23} color="white" />,
    screen: SCREENS.CitiesList,
    title: 'Cities',
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
