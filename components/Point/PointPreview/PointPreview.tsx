import {
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Place } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import DefaultImage from '@/assets/images/default_point_image.png';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  point: Place;
  onClose: () => void;
};

export const PointPreview = ({ point, onClose }: Props) => {
  const { images, title, description } = point;

  return (
    <ImageBackground
      source={!!images[0] ? { uri: images[0] } : DefaultImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.1)']}
        locations={[0, 0.8]}
        style={styles.container}
      >
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.description}>{description + description}</Text>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
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
    marginBottom: 10,
  },
  descriptionContainer: {
    paddingBottom: 20,
  },
  description: {
    color: 'white',
    lineHeight: 20,
  },
});
