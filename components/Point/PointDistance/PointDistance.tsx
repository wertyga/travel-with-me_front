import { useEffect, useRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { CText } from '@/components/CText';
import cn from '@/app/classname';
import { FONTS } from '@/types';

type Props = {
  distance: string;
  style?: ViewProps['style'];
};

const PULSE_INTERVAL = 70;

export const PointDistance = ({ distance, style }: Props) => {
  const timer = useRef<any>(null);
  const pulseValues = useSharedValue({
    scale: 0,
  });

  const animatedPulseStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseValues.value.scale }],
      opacity: 1.5 - pulseValues.value.scale,
    };
  });

  // useEffect(() => {
  //   timer.current = setInterval(() => {
  //     let scale = pulseValues.value.scale + 0.1;
  //     if (scale >= 1) {
  //       scale = 0;
  //     }
  //
  //     pulseValues.value = {
  //       scale,
  //     };
  //   }, PULSE_INTERVAL);
  //
  //   return () => {
  //     clearInterval(timer.current as any);
  //     timer.current = null;
  //   };
  // }, []);

  return (
    <View style={cn(styles.container, style)}>
      {/*<Animated.View style={[styles.pulse, animatedPulseStyles]} />*/}
      <FontAwesome5 name="walking" size={24} color="white" />
      <CText style={styles.text}>{distance}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontFamily: FONTS.OpenSansBold,
  },
  pulse: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
