import { StyleSheet, Text, TextProps } from 'react-native';
import cn from '@/app/classname';
import { FONTS } from '@/types';

export type CTextProps = TextProps & {
  style?: TextProps['style'] & { fontFamily?: FONTS };
};

export const CText = ({ children, style, ...props }: CTextProps) => {
  return (
    <Text {...props} style={cn(styles.container, style)}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    fontFamily: FONTS.OpenSans,
    color: 'white',
  },
});
