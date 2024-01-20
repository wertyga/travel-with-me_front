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
import { useSelector } from '@/stores';

type Props = {
  point: Place;
  onClose: () => void;
  autoplayAudio?: boolean;
};

export const PointMapMarkerPreview = ({
  point,
  onClose,
  autoplayAudio,
}: Props) => {
  // const chosenPoint = useSelector(({ location }) => location?.chosenPoint);

  const { images, story, title, coords, description, audioStory, _id } = point;
  // const isChosen = chosenPoint?._id === _id;

  return (
    <BackgroundGradient style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>

      <View className="flex-row items-center mb-3 pr-20">
        <TouchableOpacity
          onPress={() => openGoogleMap(coords)}
          className="mr-3"
        >
          <FontAwesome5 name="directions" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
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
