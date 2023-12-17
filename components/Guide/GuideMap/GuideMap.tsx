import { Dimensions, StyleSheet, View, SafeAreaView } from 'react-native';
import { Map } from '@/components/Map';
import { Guide, Place } from '@/types';
import { useState } from 'react';
import { PointPreview } from '@/components/Point';

type Props = {
  guide: Guide;
};

export const GuideMap = ({ guide }: Props) => {
  const [state, setState] = useState({
    point: null as Place | null,
  });

  const onPointChoose = (point: Place) => {
    setState(prev => ({ ...prev, point }));
  };

  const onClose = () => {
    setState(prev => ({ ...prev, point: null }));
  };

  return (
    <View>
      <Map points={guide.points} onPress={onPointChoose} />

      {!!state.point && (
        <View style={styles.pointPreview}>
          <PointPreview point={state.point} onClose={onClose} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pointPreview: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('screen').height / 2.5,
    bottom: 0,
    left: 0,
    backgroundColor: 'grey',
  },
});
