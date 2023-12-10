import { View, Text } from 'react-nativewind';
import { Guide } from '@/types';

type Props = {
  guide: Guide;
};

export const GuideShallowOverview = ({ guide }: Props) => {
  const { title, description } = guide;

  return (
    <View>
      <Text className="text-white text-[20px] font-bold mb-4">{title}</Text>
      <Text className="text-white mb-4">{description}</Text>
    </View>
  );
};
