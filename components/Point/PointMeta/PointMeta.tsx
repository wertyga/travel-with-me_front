import { useState } from 'react';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AudioPlayer } from '@/components/AudioPlayer';
import { CText } from '@/components/CText';
import { CountryPill } from '@/components/Country';
import { LikeAction } from '@/components/LikeAction';
import { useSelector } from '@/stores';
import { FONTS, Place, SOCIAL_MODELS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  point: Place;
  autoplay?: boolean;
  isFetching?: boolean;
};

const META_TEXT = {
  description: {
    title: 'About the point',
  },
  story: {
    title: 'The story',
  },
};

export const PointMeta = ({ point, autoplay, isFetching }: Props) => {
  const [state, setState] = useState({
    chosen: 'description' as keyof typeof META_TEXT,
  });

  const {
    city: { title: cityTitle },
    images,
  } = point;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <CountryPill title={cityTitle} icon="map-point-small" />
        </View>
        <LikeAction
          modelType={SOCIAL_MODELS.Place}
          _id={point._id}
          initialLike={point.likes}
          parentFetching={isFetching}
        />
      </View>

      <View style={styles.titles}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setState(prev => ({ ...prev, chosen: 'description' }))}
        >
          <CText
            style={[
              styles.aboutText,
              state.chosen === 'description' && styles.activeTitle,
            ]}
          >
            {META_TEXT.description.title}
          </CText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setState(prev => ({ ...prev, chosen: 'story' }))}
        >
          <CText
            style={[
              styles.aboutText,
              state.chosen === 'story' && styles.activeTitle,
            ]}
          >
            {META_TEXT.story.title}
          </CText>
        </TouchableOpacity>
      </View>

      <>
        <CText style={styles.description}>
          {state.chosen === 'story' ? point.story : point.description}
        </CText>

        {!!point.audioStory && (
          <>
            <CText style={styles.aboutText}>Audio play of the story</CText>
            <AudioPlayer audioUrl={point.audioStory} autoplay={autoplay} />
          </>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
    paddingTop: 10,
  },
  galleryAction: {
    width: 35,
    height: 35,
  },
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginBottom: 15,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeTitle: {
    textDecorationLine: 'underline',
  },
  description: {
    marginBottom: 20,
  },
});
