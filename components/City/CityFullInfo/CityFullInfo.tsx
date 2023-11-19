import { Dimensions, View } from 'react-native';
import { GuidesPreviewsList } from '@/components/Guide';
import { City } from '@/types';

type Props = {
  city: City;
  title: string;
};

export const CityFullInfo = ({ city, title }: Props) => {
  const { guides } = city;
  const isShowGuides = title === city.title;

  return (
    <View className="w-full absolute bottom-0 left-0">
      {isShowGuides && (
        <View className="w-full items-center" key={title}>
          <GuidesPreviewsList
            key={title}
            guides={guides}
            sliderWidth={Dimensions.get('window').width - 20}
            itemWidth={Dimensions.get('window').width - 20}
          />
        </View>
      )}
    </View>
  );
};
