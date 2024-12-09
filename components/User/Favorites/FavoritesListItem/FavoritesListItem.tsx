import { useEffect, useRef, useState } from 'react';

import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { setLike } from '@/api';
import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { FavoriteListItemUI } from '@/components/UI/FavoriteListItemUI';
import { useStores } from '@/hooks';

import { SOCIAL_MODELS } from '@/types';

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
      <FavoriteListItemUI
        href={href}
        hrefParams={hrefParams}
        title={title}
        subtitle={subtitle}
        image={image || defaultImage}
        style={styles.item}
      />
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
  item: {
    width:
      Dimensions.get('window').width -
      CONSTANTS.spaces.paddingHorizontal * 2 -
      20,
  },
  removeBtn: {
    width: 70,
    height: '100%',
    marginLeft: 10,
  },
});
