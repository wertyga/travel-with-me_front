import React from 'react';

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { observer } from 'mobx-react-lite';

import { AudioPlayer } from '@/components/AudioPlayer';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { GuideMapPointActions } from '@/components/Guide';
import { PointListSmall } from '@/components/Point';
import { useStores } from '@/hooks';

import { Guide, Place } from '@/types';

const TRIGGER_HEIGHT = 280;

type Props = {
  point: Place;
  guide: Guide;
  Trigger: React.FC<{ style: ViewStyle; children?: React.ReactNode }>;
  // onPlaySound?: (state: boolean) => void;
  onPointChange: (point: Place) => void;
};

const GuideMapPointPreview = ({
  point,
  Trigger,
  // onPlaySound,
  guide,
  onPointChange,
}: Props) => {
  const { isGuideMuted, visiblePoint } = useStores(stores => {
    return {
      isGuideMuted: stores.guideStore.isGuideMuted,
      visiblePoint: stores.guideStore.visiblePoint,
    };
  });

  const autoplay = !isGuideMuted && visiblePoint?._id === point?._id;
  return (
    <BackgroundGradient style={styles.carouselWrapper}>
      <Trigger style={styles.swipeTrigger}>
        <CText style={styles.pointTitle} numberOfLines={1}>
          {point.title}
        </CText>
      </Trigger>

      <View style={styles.content}>
        <PointListSmall
          points={guide.points}
          chosenPointId={point._id}
          onPointChange={onPointChange}
        />

        <View style={styles.actions}>
          <GuideMapPointActions point={point} onOpenGallery={() => {}} />

          {!!point.audioStory && (
            <AudioPlayer
              audioUrl={point.audioStory}
              title={point.title}
              // autoplay={autoplay}
              // onPlay={onPlaySound}
              simple
              small
            />
          )}
        </View>

        <ScrollView
          style={styles.descriptionContainer}
          contentContainerStyle={{ paddingBottom: TRIGGER_HEIGHT }} // Height of the Trigger
        >
          <CText style={styles.description}>{point.story}</CText>
        </ScrollView>
      </View>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    overflow: 'hidden',
  },
  swipeTrigger: {
    paddingHorizontal: 10,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    marginBottom: 10,
  },
  pointTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textTransform: 'uppercase',
  },
  descriptionContainer: {
    height: Dimensions.get('window').height,
    paddingBottom: 20,
    paddingTop: 20,
  },
  description: {
    color: 'white',
    lineHeight: 20,
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default observer(GuideMapPointPreview);
