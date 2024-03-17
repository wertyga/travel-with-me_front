import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { FastImage } from '@/components/Image';
import { CText } from '@/components/CText';
import Button from '@/components/Button';
import { useSetLikeMutation } from '@/api';
import { FONTS, SCREENS, SOCIAL_MODELS } from '@/types';
import { GesturesContainer } from '@/components/Gestures/Gestures';

import DefaultGuideImage from '@/assets/images/guide_placeholder.png';
import DefaultPlaceImage from '@/assets/images/default_point_image.png';

type Props = {
  title: string;
  subtitle: string;
  image: string;
  modelType: SOCIAL_MODELS;
  slug: string;
  _id: string;
  city?: string;
};

const { width: windowWidth } = Dimensions.get('window');

const TRANSLATE_FOR_DELETE = -1000;

export const FavoritesListItem = ({
  title,
  subtitle,
  image,
  modelType,
  _id,
  slug,
  city,
}: Props) => {
  const [setLike] = useSetLikeMutation();

  const swipeValues = useSharedValue({
    translateX: 0,
  });

  const animatedStyles = useAnimatedStyle<any>(() => {
    const { translateX } = swipeValues.value;
    const isWithTiming =
      translateX === TRANSLATE_FOR_DELETE || translateX === 0;

    return {
      transform: [
        {
          translateX: isWithTiming
            ? withTiming(swipeValues.value.translateX)
            : translateX,
        },
      ],
    };
  });

  const onUpdate = e => {
    const { translationX } = e;

    swipeValues.value = {
      translateX: translationX,
    };
  };

  const onFinalize = e => {
    const { translationX } = e;
    const isNotDelete = translationX > 0 || Math.abs(translationX) < 100;

    if (isNotDelete) {
      swipeValues.value = {
        translateX: 0,
      };
      return;
    }

    swipeValues.value = {
      translateX: TRANSLATE_FOR_DELETE,
    };
    runOnJS(setLike)({ modelType, _id });
  };

  const href =
    modelType === SOCIAL_MODELS.Guide ? SCREENS.Guide : SCREENS.Place;
  const hrefParams =
    modelType === SOCIAL_MODELS.Guide
      ? {
          guide: {
            title,
            image,
            _id,
            slug,
            city,
          },
        }
      : { placeSlug: slug };
  const defaultImage =
    modelType === SOCIAL_MODELS.Guide ? DefaultGuideImage : DefaultPlaceImage;

  return (
    <GesturesContainer onUpdate={onUpdate} onFinalize={onFinalize}>
      <Animated.View style={animatedStyles}>
        <Button
          href={href}
          hrefParams={hrefParams}
          style={styles.container}
          activeOpacity={1}
          rectangle
        >
          <FastImage uri={image || defaultImage} style={styles.image} />
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
    </GesturesContainer>
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
