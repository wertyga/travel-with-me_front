import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import cn from '@/app/classname';
import { CText } from '@/components/CText';
import { CTextProps } from '@/components/CText/CText';
import { SCREENS } from '@/types';
import { useNavigation } from '@react-navigation/native';

type CustomButtonProps = {
  children: React.ReactNode;
  style?: TouchableOpacityProps['style'];
  textStyle?: CTextProps['style'];
  onPress?: () => void;
  href?: SCREENS;
  wide?: boolean;
  fluid?: boolean;
  outlined?: boolean;
  high?: boolean;
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
  ...rest
}: CustomButtonProps) => {
  const navi = useNavigation();

  const handleOnPress = () => {
    if (href) {
      navi.navigate(href as any);
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
        style
      )}
      onPress={handleOnPress}
      {...rest}
    >
      {typeof children !== 'string' && children}
      {typeof children === 'string' && (
        <CText style={cn(styles.text, textStyle)}>{children}</CText>
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
});

export default CustomButton;
