import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { CText } from '@/components/CText';
import { Icon, IconNames } from '@/components/Icon';

import { FONTS } from '@/types';

type Props = Pick<CustomButtonProps, 'href' | 'hrefParams'> & {
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
  hrefParams,
  href,
}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} activeOpacity={1}>
      <Button
        onPress={onPress}
        style={styles.content}
        href={href}
        hrefParams={hrefParams}
      >
        {!!icon && <Icon name={icon as IconNames} />}
        {customIcon}
        <CText style={styles.title}>{title}</CText>
      </Button>
    </TouchableOpacity>
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
