import { View, Image, ImageBackground, Text } from 'react-native';
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
      className={`relative h-60 bg-gray-400 rounded-2xl overflow-hidden`}
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
          {!!guide.pointsCount && (
            <Text className="text-white font-bold text-[18px]">
              {guide.pointsCount}
            </Text>
          )}
        </View>
        <View className="flex-row justify-between mt-2 mx-4 items-center">
          <Text className="text-white font-bold text-[12px]">Price</Text>
          <Text className="text-white font-bold text-[14px]">
            {priceString}
          </Text>
        </View>
      </LinearGradient>

      <View className="flex-row justify-between w-full h-2/5 absolute bottom-0">
        {pointsImages.map((image, i) => (
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.4)']}
            className={`h-full w-[32%] rounded-t-2xl overflow-hidden ${
              i === 1
                ? 'rounded-t-lg'
                : i === 0
                ? 'rounded-tr-lg rounded-tl-2xl'
                : 'rounded-tl-lg rounded-tr-2xl'
            }`}
            key={`${image}-${i}`}
          >
            <Image
              className="w-full h-full object-cover"
              source={{
                uri: image,
              }}
            />
          </LinearGradient>
        ))}
      </View>
    </ImageBackground>
  );
};
