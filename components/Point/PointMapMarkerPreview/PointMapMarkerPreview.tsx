import React from 'react';

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import { AudioPlayer } from '@/components/AudioPlayer';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { CText } from '@/components/CText';
import { GuideMapPointActions } from '@/components/Guide/GuideMap/GuideMapPointActions';

import { Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  point: Place;
  onClose: () => void;
  onToggleCarouselShow: () => void;
  autoplayAudio?: boolean;
  onPlaySound?: (state: boolean) => void;
  onPressGoToPointDirections?: (point: Place) => void;
  style?: ViewStyle;
};

export const PointMapMarkerPreviewComponent = ({
  point,
  onClose,
  onToggleCarouselShow,
  autoplayAudio,
  onPlaySound,
  onPressGoToPointDirections,
  style,
}: Props) => {
  const { story, title, audioStory } = point;

  return (
    <BackgroundGradient style={[styles.container, style]}>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.pointActions}>
        <GuideMapPointActions
          point={point}
          onOpenGallery={onToggleCarouselShow}
          onPressGoToPointDirections={onPressGoToPointDirections}
        />
      </View>

      <ScrollView style={styles.descriptionContainer}>
        <CText style={styles.description}>{story}</CText>
      </ScrollView>

      {!!audioStory && (
        <AudioPlayer
          audioUrl={audioStory}
          autoplay={autoplayAudio}
          onPlay={onPlaySound}
        />
      )}
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: '100%',
    zIndex: 50,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 13,
    zIndex: 10,
  },
  pointActions: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
    width: '90%',
  },
  descriptionContainer: {
    paddingBottom: 20,
    marginBottom: 10,
  },
  description: {
    color: 'white',
    lineHeight: 20,
    fontSize: 14,
  },
});

export const PointMapMarkerPreview = observer(PointMapMarkerPreviewComponent);
