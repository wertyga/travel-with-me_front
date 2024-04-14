import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import cn from '@/app/classname';
import { useNavigation } from '@/hooks';
import { CText } from '@/components/CText';
import { CTextProps } from '@/components/CText/CText';
import { FONTS, SCREENS } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { getTruthlyValues } from '@/utils';

export type CustomButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  style?: TouchableOpacityProps['style'] | CTextProps['style'];
  textStyle?: CTextProps['style'];
  onPress?: () => void;
  href?: SCREENS;
  hrefParams?: Record<string, any>;
  wide?: boolean;
  fluid?: boolean;
  outlined?: boolean;
  high?: boolean;
  filled?: boolean;
  rectangle?: boolean;
  textable?: boolean;
  noPaddings?: boolean;
};

const CustomButton = ({
  children,
  style,
  onPress,
  textStyle,
  wide,
  fluid,
  outlined,
  high,
  href,
  hrefParams,
  filled,
  disabled,
  textable,
  rectangle,
  noPaddings,
  ...rest
}: CustomButtonProps) => {
  const navi = useNavigation();

  const { fontSize, color, fontFamily, fontWeight, textAlign, ...btnStyle } =
    style || {};

  const handleOnPress = () => {
    if (href) {
      navi.navigate(href, hrefParams);
    } else {
      onPress?.();
    }
  };

  return (
    <TouchableOpacity
      style={cn(
        styles.container,
        { [wide]: styles.wide },
        { [fluid]: styles.fluid },
        { [outlined]: styles.outlined },
        { [high]: styles.high },
        { [filled]: styles.filled },
        { [rectangle]: styles.rectangle },
        { [textable]: styles.textable },
        { [noPaddings]: styles.noPaddings },
        { [!!disabled]: styles.disabled },
        btnStyle
      )}
      onPress={handleOnPress}
      disabled={disabled}
      {...rest}
    >
      {typeof children !== 'string' && children}
      {typeof children === 'string' && (
        <CText
          style={cn(
            styles.text,
            getTruthlyValues({
              fontSize,
              color,
              fontFamily,
              fontWeight,
              textAlign,
            }),
            { [filled]: styles.textFilled },
            { [!!disabled]: styles.textDisabled }
          )}
        >
          {children}
        </CText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'rgba(246, 245, 242, 0.40)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  wide: {
    paddingHorizontal: 20,
  },
  fluid: {
    paddingHorizontal: 20,
    width: '100%',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
  },
  high: {
    height: 42,
  },
  filled: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5F2',
  },
  rectangle: {
    borderRadius: 10,
  },
  textFilled: {
    color: CONSTANTS.colors.bgDark,
    fontFamily: FONTS.OpenSansBold,
  },
  textable: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
  },
  noPaddings: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  disabled: {
    backgroundColor: CONSTANTS.colors.disabled,
  },
  textDisabled: {
    color: CONSTANTS.colors.textDisabled,
  },
  free: {
    width: undefined,
  },
});

export default CustomButton;
