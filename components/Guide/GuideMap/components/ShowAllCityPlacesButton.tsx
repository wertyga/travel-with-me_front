import * as React from 'react';

import { StyleSheet } from 'react-native';

import { useRoute } from '@react-navigation/native';

import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { ELEMENTS_ON_THE_TOP_OF_PREVIEW_POSITION } from '@/components/Guide/GuideMap/GuideMap';
import { useNavigation, useStores } from '@/hooks';

import { City } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = Pick<CustomButtonProps, 'style'> & {
  city: City;
};

export const ShowAllCityPlacesButton = ({ city }: Props) => {
  const navigation = useNavigation();
  const router = useRoute();

  const isCitySource = (router.params as any)?.pointSource === 'city';

  const { getCity } = useStores(stores => {
    return {
      getCity: stores.cityStore.getCity,
    };
  });

  const onPress = async () => {
    await getCity({ _id: city._id, withPlaces: true, withPlacesStories: true });

    navigation.setParams({
      pointSource: isCitySource ? 'guide' : 'city',
    } as any);
  };

  return (
    <Button solid style={styles.container} light onPress={onPress}>
      {isCitySource ? 'Show guide places' : 'Show city places'}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: CONSTANTS.spaces.paddingHorizontal,
    bottom: ELEMENTS_ON_THE_TOP_OF_PREVIEW_POSITION,
  },
});
