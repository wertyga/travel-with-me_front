import { useRef, useState } from 'react';

import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { setLike } from '@/api';
import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { CText } from '@/components/CText';
import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { useStores } from '@/hooks';
import { FastImage } from 'components/FastImage';

import { FONTS, SOCIAL_MODELS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

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
  const scrollRef = useRef<ScrollView | null>(null);
  const [isOpened, setIsOpened] = useState(false);

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

  const onScrollEnd = () => {
    if (isOpened) {
      scrollRef.current?.scrollTo({ x: 0, animated: true });
    } else {
      scrollRef.current?.scrollToEnd({ animated: true });
    }

    setIsOpened(!isOpened);
  };

  return (
    <ScrollView
      horizontal
      scrollEnabled={!isRemoveDisabled}
      style={styles.wrapper}
      showsHorizontalScrollIndicator={false}
      onScrollEndDrag={onScrollEnd}
      ref={scrollRef}
    >
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
    </ScrollView>
  );
};

export default FavoritesListItem;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width:
      Dimensions.get('window').width - CONSTANTS.spaces.paddingHorizontal * 2,
  },
  container: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    zIndex: 2,
    width:
      Dimensions.get('window').width - CONSTANTS.spaces.paddingHorizontal * 2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 6,
    marginRight: 10,
  },
  removeBtn: {
    width: 70,
    height: '100%',
    marginLeft: 10,
  },
  title: {
    fontFamily: FONTS.OpenSansBold,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
  },
});
