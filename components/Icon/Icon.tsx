import { ViewStyle } from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import City from './icons/city';
import Clock from './icons/clock';
import Heart from './icons/heart';
import HeartFilled from './icons/heart-filled';
import MapPoint from './icons/map-point';
import MapPointSmall from './icons/map-point-small';
import NoAccess from './icons/no-access';
import Profile from './icons/profile';

export const ICONS_MAP = {
  'map-point': MapPoint,
  'map-point-small': MapPointSmall,
  'no-access': NoAccess,
  'heart-filled': HeartFilled,
  city: City,
  profile: Profile,
  heart: Heart,
  clock: Clock,
};

export type IconNames = keyof typeof ICONS_MAP;

type Props = {
  name: IconNames;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const Icon = ({ name, color = 'white', style, size }: Props) => {
  const Component = ICONS_MAP[name];
  if (!Component) return null;

  return <Component color={color} style={style} size={size} />;
};
