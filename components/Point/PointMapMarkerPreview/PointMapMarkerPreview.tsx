import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Place } from '@/types';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { openGoogleMap } from '@/components/Map/Map.utils';
import { AudioPlayer } from '@/components/AudioPlayer';
import React from 'react';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { GuideMapPointActions } from '@/components/Guide';
import { CarouselDots } from '@/components/Carousel';

type Props = {
  point: Place;
  onClose: () => void;
  onToggleCarouselShow: () => void;
  autoplayAudio?: boolean;
};

export const PointMapMarkerPreview = ({
  point,
  onClose,
  onToggleCarouselShow,
  autoplayAudio,
}: Props) => {
  const { story, title, audioStory } = point;

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
        />
      </View>

      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{story}</Text>
      </ScrollView>

      {!!audioStory && (
        <AudioPlayer audioUrl={audioStory} autoplay={autoplayAudio} />
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
