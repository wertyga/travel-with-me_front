import { Dimensions, View } from 'react-native';
import { GuidesPreviewsList } from '@/components/Guide';
import { City } from '@/types';
import intersection from 'lodash/intersection';

type Props = {
  city: City;
  title: string;
  filteredCategories?: string[];
};

export const CityFullInfo = ({
  city,
  title,
  filteredCategories = [],
}: Props) => {
  const { guides } = city;
  const isShowGuides = title === city.title;
  const cityGuides =
    filteredCategories?.length > 0
      ? guides.filter(
          guide => !!intersection(guide.categories, filteredCategories).length
        )
      : guides;
  if (!isShowGuides) {
    return null;
  }

  const { width } = Dimensions.get('screen');
  return (
    <View className={`w-full absolute bottom-0 left-0 items-center`}>
      <GuidesPreviewsList
        guides={cityGuides}
        sliderWidth={width}
        itemWidth={width}
        previewContainerClassName={`h-80`}
      />
    </View>
  );
};
