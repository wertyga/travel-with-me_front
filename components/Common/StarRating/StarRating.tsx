import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import StarRatingEx from 'react-native-star-rating-widget';

import { CText } from '@/components/CText';

type Props = {
  rating: number;
};

export const StarRating: React.FC<Props> = ({ rating }) => {
  return (
    <View style={styles.container}>
      <StarRatingEx
        rating={rating}
        onChange={() => {}}
        maxStars={5}
        starSize={20}
        color="white"
      />
      <CText>{rating}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
