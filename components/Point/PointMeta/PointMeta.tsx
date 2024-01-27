import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import cn from '@/app/classname';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { AudioPlayer } from '@/components/AudioPlayer';
import { FONTS, Place, SOCIAL_MODELS } from '@/types';
import { LikeAction } from '@/components/LikeAction';

type Props = {
  point: Place;
  autoplay?: boolean;
  isFetching?: boolean;
};

const META_HEIGHT = 600;

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
    audioStory,
  } = point;

  return (
    <EntityMeta
      wrapperHeight={META_HEIGHT}
      collapsedHeight={320}
      TopContent={
        <>
          <View style={styles.top}>
            <CountryPill title={cityTitle} icon="map-point-small" />
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
