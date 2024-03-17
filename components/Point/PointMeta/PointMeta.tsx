import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import cn from '@/app/classname';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { AudioPlayer } from '@/components/AudioPlayer';
import { FONTS, Place, SOCIAL_MODELS } from '@/types';
import { LikeAction } from '@/components/LikeAction';
import Button from '@/components/Button';
import { useSelector } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

type Props = {
  point: Place;
  autoplay?: boolean;
  isFetching?: boolean;
  toggleGallery: () => void;
  onOpenStateChange: (state: boolean) => void;
};

const META_TEXT = {
  description: {
    title: 'About the point',
  },
  story: {
    title: 'The story',
  },
};

export const PointMeta = ({
  point,
  autoplay,
  isFetching,
  toggleGallery,
  onOpenStateChange,
}: Props) => {
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);
  const [state, setState] = useState({
    chosen: 'description' as keyof typeof META_TEXT,
  });

  const {
    city: { title: cityTitle },
    audioStory,
    images,
  } = point;

  const hasImages = !!images?.length;
  return (
    <EntityMeta
      wrapperHeight={layoutHeight - 120}
      collapsedHeight={400}
      descriptionTextCutLines={8}
      onOpenStateChange={onOpenStateChange}
      TopContent={
        <>
          <View style={styles.top}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <CountryPill title={cityTitle} icon="map-point-small" />
              {hasImages && (
                <Button
                  style={styles.galleryAction}
                  noPaddings
                  onPress={toggleGallery}
                >
                  <Ionicons name="images-outline" size={20} color="white" />
                </Button>
              )}
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
              onPress={() =>
                setState(prev => ({ ...prev, chosen: 'description' }))
              }
            >
              <CText
                style={cn(styles.aboutText, {
                  [state.chosen === 'description']: styles.activeTitle,
                })}
              >
                {META_TEXT.description.title}
              </CText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setState(prev => ({ ...prev, chosen: 'story' }))}
            >
              <CText
                style={cn(styles.aboutText, {
                  [state.chosen === 'story']: styles.activeTitle,
                })}
              >
                {META_TEXT.story.title}
              </CText>
            </TouchableOpacity>
          </View>
        </>
      }
      description={point[state.chosen]}
      BottomContent={
        !!audioStory && (
          <>
            <CText style={styles.aboutText}>Audio play of the story</CText>
            <AudioPlayer audioUrl={audioStory} autoplay={autoplay} />
          </>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  description: {},
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
    marginBottom: 25,
    gap: 10,
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeTitle: {
    textDecorationLine: 'underline',
  },
});
