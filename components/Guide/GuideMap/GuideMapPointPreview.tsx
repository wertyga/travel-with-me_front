import React from 'react';

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { observer } from 'mobx-react-lite';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import { AudioContainer } from '@/components/Audio';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { CText } from '@/components/CText';
import { GuideMapPointActions } from '@/components/Guide/GuideMap/GuideMapPointActions';
import { PointListSmall } from '@/components/Point';

import { FONTS, Guide, Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

const TRIGGER_HEIGHT = 380;
const SCROLL_VIEW_BOTTOM_SPACE = TRIGGER_HEIGHT + 100;

type Props = {
  point: Place;
  Trigger: React.FC<{ style: ViewStyle; children?: React.ReactNode }>;
  onPointChange: (point: Place) => void;
  onOpenGallery: () => void;
  isOpened?: boolean;
  points: Place[];
};

const GuideMapPointPreview = ({
  point,
  Trigger,
  onOpenGallery,
  onPointChange,
  isOpened,
  points,
}: Props) => {
  return (
    <BackgroundGradient style={styles.carouselWrapper}>
      <Trigger style={styles.swipeTrigger}>
        <BackButton transparent style={styles.swipeTriggerContent}>
          <CText style={styles.pointTitle} numberOfLines={1} light>
            {point.title}
          </CText>
        </BackButton>
      </Trigger>

      <View style={styles.content}>
        <PointListSmall
          points={points}
          chosenPointId={point._id}
          onPointChange={onPointChange}
          isBig={isOpened}
        />

        <View style={styles.actions}>
          <GuideMapPointActions point={point} onOpenGallery={onOpenGallery} />
        </View>

        {isOpened && (
          <>
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
              contentContainerStyle={{
                paddingBottom: SCROLL_VIEW_BOTTOM_SPACE,
              }}
            >
              <CText style={styles.description} light>
                {point.story}
              </CText>
            </ScrollView>
          </>
        )}
      </View>
    </BackgroundGradient>
  );
};

export default observer(GuideMapPointPreview);

const styles = StyleSheet.create({
  carouselWrapper: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    minHeight: Dimensions.get('window').height,
  },
  swipeTrigger: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
  },
  swipeTriggerContent: {
    marginTop: 10,
  },
  pointTitle: {
    fontFamily: FONTS.OpenSansSemiBold,
    fontSize: 20,
    textTransform: 'uppercase',
    width: '90%',
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
