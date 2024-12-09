import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { CText } from '@/components/CText';
import { Icon, IconNames } from '@/components/Icon';

import { FONTS } from '@/types';

type Props = Pick<
  CustomButtonProps,
  'href' | 'hrefParams' | 'rectangle' | 'textable'
> & {
  style?: StyleProp<ViewStyle>;
  contentStyle?: ViewStyle;
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
  contentStyle = {},
  rectangle,
  textable,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Button
        onPress={onPress}
        style={{
          ...styles.content,
          ...contentStyle,
        }}
        href={href}
        hrefParams={hrefParams}
        rectangle={rectangle}
        textable={textable}
      >
        {!!icon && <Icon name={icon as IconNames} />}
        {customIcon}
        <CText style={styles.title} light>
          {title}
        </CText>
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
