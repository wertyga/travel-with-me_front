import React from 'react';

import { ViewStyle } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MapBoxView } from '@/components/Map/MapBox/MapBoxView';
import { useNavigation } from '@/hooks';
import { useStores } from '@/hooks';

import { City, SCREENS } from '@/types';

const EUROPE_REGION = {
  latitude: 43.13591618938807,
  latitudeDelta: 64.52384581909979,
  longitude: 13.603910151869059,
  longitudeDelta: 61.60953674465418,
};

type Props = {
  containerStyle?: ViewStyle;
};

export const CitiesMapComponent = ({ containerStyle }: Props) => {
  const navi = useNavigation();
  const { cityLightList } = useStores(stores => ({
    cityLightList: stores.citiesListStore.cityLightList,
  }));

  const navigateToCity = (city: City) => {
    navi.navigate(SCREENS.City, { city });
  };

  return (
    <MapBoxView
      points={cityLightList}
      onPress={navigateToCity}
      containerStyle={containerStyle}
    />
  );
};

export const CitiesMap = observer(CitiesMapComponent);
