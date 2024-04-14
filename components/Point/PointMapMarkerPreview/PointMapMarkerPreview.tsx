import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Place } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { AudioPlayer } from '@/components/AudioPlayer';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { GuideMapPointActions } from '@/components/Guide/GuideMap/GuideMapPointActions';
import { useSelector } from '@/stores';
import { calculateDistance } from '@/utils/map';

type Props = {
  point: Place;
  onClose: () => void;
  onToggleCarouselShow: () => void;
  autoplayAudio?: boolean;
  onPlaySound?: (state: boolean) => void;
  onPressGoToPointDirections?: (point: Place) => void;
};

export const PointMapMarkerPreview = ({
  point,
  onClose,
  onToggleCarouselShow,
  autoplayAudio,
  onPlaySound,
  onPressGoToPointDirections,
}: Props) => {
  const { story, title, audioStory } = point;

  const liveCoords = useSelector(
    ({ locationStore }) => locationStore?.liveCoords
  );

  const distanceToPoint = calculateDistance(point.coords, liveCoords);

  return (
    <BackgroundGradient style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.pointActions}>
        <GuideMapPointActions
          point={point}
          onOpenGallery={onToggleCarouselShow}
          distanceToPoint={distanceToPoint as string}
          onPressToDirection={onPressGoToPointDirections}
        />
      </View>

      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{story}</Text>
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
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 150,
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
  },
});
