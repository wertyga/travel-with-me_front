import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { getArrayedButtonStyles } from '@/components/Button/Button.utils';
import { CText } from '@/components/CText';
import { CTextProps, CTextStyleProp } from '@/components/CText/CText';
import { useNavigation } from '@/hooks';
import { FONTS, SCREENS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

export type ButtonStylesProp = ViewStyle & CTextStyleProp;

export type CustomButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  style?: ButtonStylesProp | ButtonStylesProp[];
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
  left?: boolean;
  right?: boolean;
};

const CustomButton = ({
  children,
  style,
  onPress,
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
  left,
  right,
  ...rest
}: CustomButtonProps) => {
  const navi = useNavigation();

  const { button: btnStyles, text: textStyles } = getArrayedButtonStyles(
    style || {}
  );

  const handleOnPress = () => {
    onPress?.();

    if (href) {
      navi.navigate(href, hrefParams);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        wide && styles.wide,
        fluid && styles.fluid,
        outlined && styles.outlined,
        high && styles.high,
        filled && styles.filled,
        rectangle && styles.rectangle,
        textable && styles.textable,
        noPaddings && styles.noPaddings,
        !!disabled && styles.disabled,
        left && { justifyContent: 'flex-start' },
        right && { justifyContent: 'flex-end' },
        ...(btnStyles as any),
      ]}
      onPress={handleOnPress}
      disabled={disabled}
      {...rest}
    >
      {typeof children !== 'string' && children}
      {typeof children === 'string' && (
        <CText
          style={[
            styles.text,
            filled && styles.textFilled,
            !!disabled && styles.textDisabled,
            ...(textStyles as any),
          ]}
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
