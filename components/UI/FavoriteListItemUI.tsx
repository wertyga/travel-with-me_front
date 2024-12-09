import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';

import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { CText } from '@/components/CText';
import { FastImage } from '@/components/FastImage';
import { MEDIA_SIZES } from '@/components/FastImage/FastImage';

import { FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = Pick<CustomButtonProps, 'href' | 'hrefParams' | 'onPress'> & {
  image: string | number;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
};

export const FavoriteListItemUI = ({
  hrefParams,
  href,
  image,
  title,
  subtitle,
  onPress,
  style,
}: Props) => {
  return (
    <Button
      href={href}
      hrefParams={hrefParams}
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={1}
      rectangle
    >
      <FastImage
        source={image}
        style={styles.image}
        mediaSize={MEDIA_SIZES.Small}
      />
      <View
        style={{
          flex: 1,
        }}
      >
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
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontFamily: FONTS.OpenSansBold,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
  },
});
