import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import cn from '@/app/classname';
import { CText } from '@/components/CText';
import { CTextProps } from '@/components/CText/CText';

type CustomButtonProps = {
  children: React.ReactNode;
  style?: TouchableOpacityProps['style'];
  textStyle?: CTextProps['style'];
  onPress?: () => void;
  wide?: boolean;
  fluid?: boolean;
  outlined?: boolean;
};

const CustomButton = ({
  children,
  style,
  onPress,
  textStyle,
  wide,
  fluid,
  outlined,
  ...rest
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={cn(
        styles.container,
        { [wide]: styles.wide },
        { [fluid]: styles.fluid },
        { [outlined]: styles.outlined },
        style
      )}
      onPress={onPress}
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
});

export default CustomButton;
