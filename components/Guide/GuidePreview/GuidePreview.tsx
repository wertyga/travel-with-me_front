import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Guide } from '@/types';
import { getCurrencyMeta } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import DefaultImage from '@/assets/images/default_point_image.png';

type Props = {
  guide: Guide;
};

export const GuidePreview = ({ guide }: Props) => {
  const navi = useNavigation();

  return (
    <ImageBackground
      resizeMode="cover"
      className={`relative h-60 bg-gray-400 rounded-2xl overflow-hidden`}
      source={
        guide.hImage
          ? {
              uri: guide.hImage,
            }
          : DefaultImage
      }
    >
      <TouchableOpacity
        onPress={() => navi.navigate('Guide', { guideSlug: guide.slug })}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.03)']}
          className="h-full"
        >
          <View className="justify-between mt-2 mx-4">
            <Text className="text-white font-bold text-[16px]">
              {guide.title}
            </Text>
            {!!guide.pointsCount && (
              <Text className="text-white font-bold text-[18px]">
                {guide.pointsCount}
              </Text>
            )}
            <Text style={styles.description}>{guide.description}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  description: {
    color: 'white',
    marginTop: 10,
    lineHeight: 20,
  },
});
