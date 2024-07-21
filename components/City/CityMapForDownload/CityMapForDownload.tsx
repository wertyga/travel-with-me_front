import React, { useEffect, useRef, useState } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Animated, { FadeOut, SlideInDown } from 'react-native-reanimated';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { Map } from '@/components/Map';
import { useFocus, useStores } from '@/hooks';

import { Place } from '@/types';

type Props = {
  points: Place[];
};

export const CityMapForDownload = ({ points }: Props) => {
  const timer = useRef<any>();

  const { setIsCitySaved } = useStores(stores => ({
    setIsCitySaved: stores.offlineStore.setIsCitySaved,
  }));

  const [focusedIndex, setFocusedIndex] = useState(0);

  const [region, setRegion] = useState({
    ...points[0],
    regionDelta: 0.01,
  });

  const changeRegionForCache = async () => {
    let index = 1;

    timer.current = setInterval(() => {
      setRegion({
        ...points[index],
        regionDelta: 0.01,
      });
      index += 1;

      setFocusedIndex(index);

      if (index >= points.length - 1) {
        clearInterval(timer.current);
        timer.current = null;
        setIsCitySaved(false);
      }
    }, 500);
  };

  useEffect(() => {
    changeRegionForCache();
  }, []);

  useFocus(() => {
    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          zIndex: 1000,
        },
      ]}
      entering={SlideInDown}
      exiting={FadeOut}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
        <CText>Saving map...</CText>
        <CText>{`${focusedIndex + 1} / ${points.length}`}</CText>
      </View>
      <Map
        points={points}
        chosenPoint={region}
        onPointPress={() => {}}
        mapStyles={{
          ...StyleSheet.absoluteFillObject,
        }}
      />
    </Animated.View>
  );
};

export default observer(CityMapForDownload);
