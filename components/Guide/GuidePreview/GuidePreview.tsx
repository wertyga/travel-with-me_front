import {
  View,
  ScrollView,
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
  containerClassName?: string;
};

const CUT_UNTIL = 200;

export const GuidePreview = ({ guide, containerClassName = '' }: Props) => {
  const navi = useNavigation();

  const cutDescription = guide.description.slice(0, CUT_UNTIL);
  const description =
    guide.description.length > CUT_UNTIL
      ? `${cutDescription}...`
      : cutDescription;
  return (
    <ImageBackground
      resizeMode="cover"
      className={`${containerClassName}`}
      source={
        guide.hImage
          ? {
              uri: guide.hImage,
            }
          : DefaultImage
      }
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.03)']}
        className="h-full"
      >
        <TouchableOpacity
          onPress={() => navi.navigate('Guide', { guideSlug: guide.slug })}
          activeOpacity={1}
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

            <Text className="text-white leading-5">{description}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  touchable: {
    ...StyleSheet.absoluteFillObject,
  },
});
