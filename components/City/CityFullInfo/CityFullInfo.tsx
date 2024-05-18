import { Dimensions, View } from 'react-native';
import { GuidesPreviewsList } from '@/components/Guide';
import intersection from 'lodash/intersection';
import { City } from '@/types';

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
    <View>
      <GuidesPreviewsList
        guides={cityGuides}
        sliderWidth={width}
        itemWidth={width}
      />
    </View>
  );
};
