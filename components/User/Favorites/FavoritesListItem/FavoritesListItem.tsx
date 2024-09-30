import { StyleSheet, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { FontAwesome } from '@expo/vector-icons';

import { setLike } from '@/api';
import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { CText } from '@/components/CText';
import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { GesturesContainer } from '@/components/Gestures/Gestures';
import { useSlideLeft, useStores } from '@/hooks';
import { FastImage } from 'components/FastImage';

import { FONTS, SOCIAL_MODELS } from '@/types';

import DefaultPlaceImage from '@/assets/images/default_point_image.png';
import DefaultGuideImage from '@/assets/images/guide_placeholder.png';

type Props = Pick<CustomButtonProps, 'href' | 'hrefParams'> & {
  title: string;
  subtitle: string;
  image: string;
  modelType: SOCIAL_MODELS;
  slug: string;
  _id: string;
  city?: string;
  isRemoveDisabled?: boolean;
};

const FavoritesListItem = ({
  title,
  subtitle,
  image,
  modelType,
  _id,
  isRemoveDisabled,
  href,
  hrefParams,
}: Props) => {
  const { getFavorites } = useStores(stores => ({
    getFavorites: stores.userStore.getFavorites,
  }));

  const onUnliked = async () => {
    await setLike({
      modelType,
      _id,
    });
    getFavorites();
  };

  const defaultImage =
    modelType === SOCIAL_MODELS.Guide ? DefaultGuideImage : DefaultPlaceImage;

  const { onUpdate, animatedStyles, onFinalize } = useSlideLeft({
    thresholdForFinish: 100,
    leftSideTranslation: -80,
  });

  const gestureHandlers = isRemoveDisabled
    ? {
        onUpdate: () => {},
        onFinalize: () => {},
      }
    : {
        onUpdate,
        onFinalize,
      };

  return (
    <GesturesContainer {...gestureHandlers}>
      <Animated.View style={[animatedStyles, styles.wrapper]}>
        <Button
          href={href}
          hrefParams={hrefParams}
          style={styles.container}
          activeOpacity={1}
          rectangle
        >
          <FastImage
            source={image || defaultImage}
            style={styles.image}
            mediaSize={MEDIA_SIZES.Small}
          />
          <View>
            <CText numberOfLines={1} style={styles.title} light>
              {title}
            </CText>
            {!!subtitle && (
              <CText numberOfLines={1} style={styles.subtitle} light>
                {subtitle}
              </CText>
            )}
          </View>
        </Button>
        <Button style={styles.removeBtn} rectangle onPress={onUnliked}>
          <FontAwesome name="trash-o" size={34} color="white" />
        </Button>
      </Animated.View>
    </GesturesContainer>
  );
};

export default FavoritesListItem;

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
    height: '100%',
  },
  title: {
    fontFamily: FONTS.OpenSansBold,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
  },
});
