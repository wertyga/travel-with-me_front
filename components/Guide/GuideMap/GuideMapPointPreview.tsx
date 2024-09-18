import React from 'react';

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { observer } from 'mobx-react-lite';

import { AudioContainer } from '@/components/Audio';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { CText } from '@/components/CText';
import { GuideMapPointActions } from '@/components/Guide/GuideMap/GuideMapPointActions';
import { PointListSmall } from '@/components/Point';

import { Guide, Place } from '@/types';

const TRIGGER_HEIGHT = 380;
const SCROLL_VIEW_BOTTOM_SPACE = TRIGGER_HEIGHT + 50;

type Props = {
  point: Place;
  guide: Guide;
  Trigger: React.FC<{ style: ViewStyle; children?: React.ReactNode }>;
  onPointChange: (point: Place) => void;
  onOpenGallery: () => void;
  isBig?: boolean;
};

const GuideMapPointPreview = ({
  point,
  Trigger,
  onOpenGallery,
  guide,
  onPointChange,
  isBig,
}: Props) => {
  return (
    <BackgroundGradient style={styles.carouselWrapper}>
      <Trigger style={styles.swipeTrigger}>
        <CText style={styles.pointTitle} numberOfLines={1} light>
          {point.title}
        </CText>
      </Trigger>

      <View style={styles.content}>
        <PointListSmall
          points={guide.points}
          chosenPointId={point._id}
          onPointChange={onPointChange}
          isBig={isBig}
        />

        <View style={styles.actions}>
          <GuideMapPointActions point={point} onOpenGallery={onOpenGallery} />
        </View>

        {!!point.audioStory && (
          <AudioContainer
            audioUrl={point.audioStory}
            title={point.title}
            checkTitles
            defaultOpenState={true}
          />
        )}

        <ScrollView
          style={styles.descriptionContainer}
          contentContainerStyle={{ paddingBottom: SCROLL_VIEW_BOTTOM_SPACE }}
        >
          <CText style={styles.description} light>
            {point.story}
          </CText>
        </ScrollView>
      </View>
    </BackgroundGradient>
  );
};

export default observer(GuideMapPointPreview);

const styles = StyleSheet.create({
  carouselWrapper: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    overflow: 'hidden',
    zIndex: 20,
  },
  swipeTrigger: {
    paddingHorizontal: 10,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    marginBottom: 20,
  },
  pointTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textTransform: 'uppercase',
  },
  descriptionContainer: {
    height: Dimensions.get('window').height,
    paddingBottom: 20,
  },
  description: {
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
    marginBottom: 10,
  },
});
