import { View, Image, ImageBackground, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Guide } from '@/types';
import { getCurrencyMeta } from '@/utils';

type Props = {
  guide: Guide;
};

export const GuidePreview = ({ guide }: Props) => {
  const pointsImages = guide.pointsImages?.slice(0, 3) || [];

  const priceString = `${guide.price.amount} ${
    getCurrencyMeta(guide.price.currency).sign
  }`;

  return (
    <ImageBackground
      resizeMode="cover"
      className={`relative w-full h-full bg-gray-400 rounded-2xl overflow-hidden`}
      imageStyle={styles.image}
      source={{
        uri: guide.images?.[0],
      }}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.03)']}
        className="h-full"
      >
        <View className="flex-row justify-between mt-2 mx-4 items-center">
          <Text className="text-white font-bold text-[16px]">
            {guide.title}
          </Text>
          <Text className="text-white font-bold text-[18px]">
            {guide.pointsCount}
          </Text>
        </View>
      </LinearGradient>

      <View className="flex-row justify-between mt-2 mx-4 items-center">
        <Text className="text-white font-bold text-[16px]">Price</Text>
        <Text className="text-white font-bold text-[18px]">{priceString}</Text>
      </View>

      <View className="flex-row justify-between w-full h-2/5 absolute bottom-0">
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.2)']}
          className="h-full w-full absolute z-10 rounded-t-2xl"
        />
        {pointsImages.map((image, i) => (
          <Image
            className={`w-[32%] h-full ${
              i === 1
                ? 'rounded-t-lg'
                : i === 0
                ? 'rounded-tr-lg rounded-tl-2xl'
                : 'rounded-tl-lg rounded-tr-2xl'
            }`}
            key={`${image}-${i}`}
            source={{
              uri: image,
            }}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
