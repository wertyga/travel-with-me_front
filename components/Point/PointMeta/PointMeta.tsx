import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import cn from '@/app/classname';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { AudioPlayer } from '@/components/AudioPlayer';
import { FONTS, Place } from '@/types';

type Props = {
  point: Place;
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

export const PointMeta = ({ point }: Props) => {
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
      TopContent={
        <>
          <View style={styles.top}>
            <CountryPill title={cityTitle} icon="map-point-small" />
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
            <AudioPlayer audioUrl={audioStory} />
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
