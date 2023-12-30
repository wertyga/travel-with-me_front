import MapPoint from './icons/map-point';
import MapPointSmall from './icons/map-point-small';

const ICONS_MAP = {
  'map-point': MapPoint,
  'map-point-small': MapPointSmall,
};

type Props = {
  name: keyof typeof ICONS_MAP;
  color?: string;
};

export const Icon = ({ name, color = 'white' }: Props) => {
  const Component = ICONS_MAP[name];
  if (!Component) return null;

  return <Component color={color} />;
};
