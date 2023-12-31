import MapPoint from './icons/map-point';
import MapPointSmall from './icons/map-point-small';
import Profile from './icons/profile';
import Heart from './icons/heart';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native';

export const ICONS_MAP = {
  'map-point': MapPoint,
  'map-point-small': MapPointSmall,
  profile: Profile,
  heart: Heart,
};

type Props = {
  name: keyof typeof ICONS_MAP;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Icon = ({ name, color = 'white', style }: Props) => {
  const Component = ICONS_MAP[name];
  if (!Component) return null;

  return <Component color={color} style={style} />;
};
