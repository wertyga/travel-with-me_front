import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CText } from '@/components/CText';
import { FastImage } from '@/components/FastImage';
import { useNavigation } from '@/hooks';
import { FONTS, SCREENS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  title?: string;
  image?: any;
  description?: string;
  href?: SCREENS;
  hrefParams?: any;
};

export const GlobalSearchItem = ({
  title,
  description,
  image,
  href,
  hrefParams,
}: Props) => {
  const navi = useNavigation();

  const onPress = () => {
    if (!href) return;

    navi.navigate(href, hrefParams);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage style={styles.image} source={image} />
      <View style={styles.itemContent}>
        {!!title && <CText style={styles.title}>{title}</CText>}
        {!!description && (
          <CText style={styles.description} numberOfLines={1}>
            {description}
          </CText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 5,
    flexDirection: 'row',
  },
  itemContent: {
    marginLeft: 5,
  },
  image: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 10,
  },
  title: {
    color: CONSTANTS.colors.bgDark,
    fontFamily: FONTS.OpenSansBold,
    fontSize: 14,
  },
  description: {
    color: CONSTANTS.colors.text,
    fontSize: 12,
  },
});
