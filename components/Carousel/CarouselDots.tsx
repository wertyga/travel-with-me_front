import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  totalCount: number;
  currentIndex: number;
  activeColor?: string;
  inActiveColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function CarouselDots({ totalCount, currentIndex }: Props) {
  return (
    <View style={styles.container}>
      <AnimatedDotsCarousel
        length={totalCount}
        currentIndex={currentIndex}
        maxIndicators={3}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'white',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
