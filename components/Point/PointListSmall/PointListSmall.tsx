import React, { useEffect } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { FastImage } from '@/components/FastImage';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';

import { Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import DefaultPointImage from '@/assets/images/default_point_image.png';

type Props = {
  points: Place[];
  chosenPointId: string;
  isBig?: boolean;
  onPointChange: (point: Place) => void;
};

const IMAGE_SIZE = 60;
const BIG_IMAGE_SIZE = 180;
const BIG_IMAGE_SIZE_BORDER_RADIUS = 6;

const PointListSmall: React.FC<Props> = ({
  points,
  chosenPointId,
  onPointChange,
  isBig,
}) => {
  const aBorderRadius = useSharedValue(IMAGE_SIZE);
  const aImageSize = useSharedValue(IMAGE_SIZE);

  const aContainerStyles = useAnimatedStyle(() => {
    return {
      borderRadius: aBorderRadius.value,
      width: aImageSize.value,
      height: aImageSize.value,
    };
  });

  useEffect(() => {
    aBorderRadius.value = withTiming(
      isBig ? BIG_IMAGE_SIZE_BORDER_RADIUS : IMAGE_SIZE
    );
    aImageSize.value = withTiming(isBig ? BIG_IMAGE_SIZE : IMAGE_SIZE);
  }, [isBig]);

  return (
    <ScrollHorizontalNoEdges contentContainerStyle={styles.content}>
      {points.map(point => {
        const isChosen = point._id === chosenPointId;
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={point._id}
            onPress={() => onPointChange(point)}
          >
            <Animated.View
              style={[
                styles.imageContainer,
                isChosen && styles.chosen,
                aContainerStyles,
              ]}
            >
              <FastImage
                style={styles.image}
                source={point.images[0] || DefaultPointImage}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </ScrollHorizontalNoEdges>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 5,
    paddingBottom: 15,
  },
  imageContainer: {
    borderColor: 'white',
    borderWidth: 2,
    padding: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  chosen: {
    borderColor: CONSTANTS.colors.blue,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  bigImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  bigImageContainer: {
    borderRadius: 6,
  },
});

export default PointListSmall;
