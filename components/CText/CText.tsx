import { Dimensions, StyleSheet, Text, TextProps } from 'react-native';
import cn from '@/app/classname';
import { FONTS } from '@/types';

export type CTextProps = TextProps & {
  style?: TextProps['style'] & { fontFamily?: FONTS };
};

const { width } = Dimensions.get('window');
export const CText = ({ children, style, ...props }: CTextProps) => {
  if (style?.fontSize) {
    style.fontSize = (style.fontSize as number) * (width / 375);
  }
  return (
    <Text {...props} style={cn(styles.container, style)}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16 * (width / 375),
    fontFamily: FONTS.OpenSans,
    color: 'white',
  },
});
