import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image } from '@/components/Image';
import { CText } from '@/components/CText';
import Button from '@/components/Button';
import { useSetLikeMutation } from '@/api';
import { FONTS, SCREENS, SOCIAL_MODELS } from '@/types';

import DefaultGuideImage from '@/assets/images/guide_placeholder.png';
import DefaultPlaceImage from '@/assets/images/default_point_image.png';

type Props = {
  title: string;
  subtitle: string;
  image: string;
  modelType: SOCIAL_MODELS;
  slug: string;
  _id: string;
};

const { width: windowWidth } = Dimensions.get('window');

export const FavoritesListItem = ({
  title,
  subtitle,
  image,
  modelType,
  _id,
  slug,
}: Props) => {
  const [setLike] = useSetLikeMutation();

  const swipeValues = useSharedValue({
    translateX: 0,
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      translateX: swipeValues.value.translateX,
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      const { translationX } = e;

      swipeValues.value = {
        translateX: translationX,
      };
    })
    .onFinalize(e => {
      const { translationX } = e;

      if (translationX > -windowWidth / 1.5) {
        swipeValues.value = {
          translateX: 0,
        };
        return;
      }

      swipeValues.value = {
        translateX: -1000,
      };
      runOnJS(setLike)({ modelType, _id });
    });

  const href =
    modelType === SOCIAL_MODELS.Guide ? SCREENS.Guide : SCREENS.Place;
  const hrefParams =
    modelType === SOCIAL_MODELS.Guide
      ? { guideSlug: slug }
      : { placeSlug: slug };
  const defaultImage =
    modelType === SOCIAL_MODELS.Guide ? DefaultGuideImage : DefaultPlaceImage;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyles}>
        <Button
          href={href}
          hrefParams={hrefParams}
          style={styles.container}
          activeOpacity={1}
          rectangle
        >
          <Image
            source={image ? { uri: image } : defaultImage}
            style={styles.image}
          />
          <View style={styles.text} t>
            <CText numberOfLines={1} style={styles.title}>
              {title}
            </CText>
            {!!subtitle && (
              <CText numberOfLines={1} style={styles.subtitle}>
                {subtitle}
              </CText>
            )}
          </View>
        </Button>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 6,
    marginRight: 10,
  },
  text: {},
  title: {
    fontFamily: FONTS.OpenSansBold,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
  },
});
