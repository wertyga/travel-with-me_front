import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSetLikeMutation } from '@/api';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { GesturesContainer } from '@/components/Gestures/Gestures';
import { FastImage } from '@/components/Image';
import { useSlideLeft } from '@/hooks';
import { FontAwesome } from '@expo/vector-icons';
import { FONTS, SCREENS, SOCIAL_MODELS } from '@/types';
import DefaultPlaceImage from '@/assets/images/default_point_image.png';
import DefaultGuideImage from '@/assets/images/guide_placeholder.png';

type Props = {
  title: string;
  subtitle: string;
  image: string;
  modelType: SOCIAL_MODELS;
  slug: string;
  _id: string;
  city?: string;
};

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

  const onUnliked = () => {
    setLike({
      modelType,
      _id,
    });
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

  const { onUpdate, animatedStyles, onFinalize } = useSlideLeft({
    thresholdForFinish: 100,
    leftSideTranslation: -80,
  });

  return (
    <GesturesContainer onUpdate={onUpdate} onFinalize={onFinalize}>
      <Animated.View style={[animatedStyles, styles.wrapper]}>
        <Button
          href={href}
          hrefParams={hrefParams}
          style={styles.container}
          activeOpacity={1}
          rectangle
        >
          <FastImage uri={image || defaultImage} style={styles.image} />
          <View>
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
        <Button style={styles.removeBtn} rectangle>
          <FontAwesome name="trash-o" size={34} color="white" />
        </Button>
      </Animated.View>
    </GesturesContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    zIndex: 2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 6,
    marginRight: 10,
  },
  removeBtn: {
    position: 'absolute',
    right: -80,
    top: 0,
    bottom: 0,
    width: 70,
  },
  title: {
    fontFamily: FONTS.OpenSansBold,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
  },
});
