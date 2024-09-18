import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import { getArrayedButtonStyles } from '@/components/Button/Button.utils';
import { CText } from '@/components/CText';
import { CTextStyleProp } from '@/components/CText/CText';
import { useNavigation } from '@/hooks';

import { FONTS, ParamsListType, SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

export type ButtonStylesProp = ViewStyle & CTextStyleProp;

export type CustomButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  style?: ButtonStylesProp | ButtonStylesProp[];
  onPress?: () => void;
  href?: SCREENS;
  hrefParams?: ParamsListType<CustomButtonProps['href']>;
  squareSize?: number;
  wide?: boolean;
  fluid?: boolean;
  outlined?: boolean;
  high?: boolean;
  filled?: boolean;
  rectangle?: boolean;
  textable?: boolean;
  noPaddings?: boolean;
  solid?: boolean;
  left?: boolean;
  right?: boolean;
  free?: boolean;
  rounded?: boolean;
  transparent?: boolean;
  isLoading?: boolean;
  light?: boolean;
};

export const BaseButton = ({
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
  solid,
  free,
  squareSize,
  rounded,
  transparent,
  isLoading,
  light,
  ...rest
}: CustomButtonProps) => {
  const { button: btnStyles, text: textStyles } = getArrayedButtonStyles(
    style || {}
  );

  const ChildWrapperComponent = typeof children === 'string' ? CText : View;

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
        left && { justifyContent: 'flex-start' },
        right && { justifyContent: 'flex-end' },
        solid && styles.solid,
        (disabled || isLoading) && styles.disabled,
        free && styles.free,
        squareSize && {
          width: squareSize,
          height: squareSize,
          minHeight: squareSize,
          ...(rounded ? { borderRadius: squareSize } : {}),
          ...(isLoading ? { width: squareSize + 30 } : {}),
        },
        transparent && styles.transparent,
        ...(btnStyles as any),
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={!!href ? 0 : 1}
      {...rest}
    >
      {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
      {typeof children !== 'string' && children}
      {typeof children === 'string' && (
        <ChildWrapperComponent
          style={[
            styles.text,
            filled && styles.textFilled,
            !!disabled && styles.textDisabled,
            {
              color: light
                ? CONSTANTS.colors.typographyLight
                : CONSTANTS.colors.typography,
            },
            ...(textStyles as any),
          ]}
        >
          {children}
        </ChildWrapperComponent>
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
  loadingIndicator: {
    marginRight: 10,
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
    color: CONSTANTS.colors.bgDarkest,
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
  solid: {
    backgroundColor: CONSTANTS.colors.bgLight,
    borderColor: CONSTANTS.colors.bgLight,
  },
  free: {
    width: null,
    minWidth: null,
    maxWidth: null,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});
