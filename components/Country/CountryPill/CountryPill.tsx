import { StyleSheet, View, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import Button from '@/components/Button';
import { Icon, IconNames } from '@/components/Icon';
import { CText } from '@/components/CText';
import { FONTS } from '@/types';

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
  icon?: IconNames;
};

export const CountryPill = ({
  style,
  title,
  icon = 'map-point-small',
}: Props) => {
  return (
    <View style={cn(styles.container, style)}>
      <Button>
        <Icon name={icon as IconNames} />
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
