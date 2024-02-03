import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
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

type Props = {
  point: Place;
  onClose: () => void;
  autoplayAudio?: boolean;
};

export const PointMapMarkerPreview = ({
  point,
  onClose,
  autoplayAudio,
  onOpenGallery,
}: Props) => {
  const { images, story, title, coords, audioStory } = point;

  return (
    <BackgroundGradient style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
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
