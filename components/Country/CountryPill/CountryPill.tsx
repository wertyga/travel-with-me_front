import { StyleSheet, View, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import { CText } from '@/components/CText';
import { FONTS } from '@/types';

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
};

export const CountryPill = ({ style, title }: Props) => {
  return (
    <View style={cn(styles.container, style)}>
      <Button>
        <Icon name="map-point-small" />
        <CText style={styles.title}>{title}</CText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily: FONTS.OpenSansSemiBold,
  },
});
