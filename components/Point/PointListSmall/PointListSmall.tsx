import React from 'react';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { FastImage } from '@/components/FastImage';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';

import { Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import DefaultPointImage from '@/assets/images/default_point_image.png';

type Props = {
  points: Place[];
  chosenPointId: string;
  onPointChange: (point: Place) => void;
};

const PointListSmall: React.FC<Props> = ({
  points,
  chosenPointId,
  onPointChange,
}) => {
  return (
    <ScrollHorizontalNoEdges contentContainerStyle={styles.content}>
      {points.map(point => {
        const isChosen = point._id === chosenPointId;
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={point._id}
            style={[styles.imageContainer, isChosen && styles.chosen]}
            onPress={() => onPointChange(point)}
          >
            <FastImage
              style={styles.image}
              source={point.images[0] || DefaultPointImage}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollHorizontalNoEdges>
  );
};

const IMAGE_SIZE = 60;
const styles = StyleSheet.create({
  content: {
    gap: 5,
    paddingBottom: 15,
  },
  imageContainer: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: IMAGE_SIZE,
    padding: 2,
  },
  chosen: {
    borderColor: CONSTANTS.colors.blue,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
  },
});

export default PointListSmall;
