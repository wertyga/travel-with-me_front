import React from 'react';

import { Image, StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import { CText } from '@/components/CText';

import { SCREENS } from '@/types';

type Props = {
  image?: string;
  title: string;
  createdAt: string;
  slug: string;
};

export const VisitPlaceAchievementItem = ({
  image,
  title,
  createdAt,
  slug,
}: Props) => {
  return (
    <Button
      style={styles.container}
      href={SCREENS.Place}
      hrefParams={{ placeSlug: slug }}
      rectangle
    >
      {!!image && <Image source={{ uri: image }} style={styles.image} />}
      <View>
        <CText>{title}</CText>
        <CText style={styles.text}>
          {`Been here at ${new Date(createdAt).toLocaleDateString()}`}
        </CText>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  text: {
    fontSize: 12,
  },
});
