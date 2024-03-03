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
  customIcon?: React.ReactNode; // Size - 22
  onPress?: () => void;
};

export const CountryPill = ({
  style,
  title,
  customIcon,
  icon,
  onPress,
}: Props) => {
  return (
    <View style={cn(styles.container, style)}>
      <Button onPress={onPress} style={styles.content}>
        {!!icon && <Icon name={icon as IconNames} />}
        {customIcon}
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
  content: {
    height: 30,
  },
  title: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily: FONTS.OpenSansSemiBold,
  },
});
