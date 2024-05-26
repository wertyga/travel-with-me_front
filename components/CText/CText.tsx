import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { FONTS } from '@/types';

export type CTextProps = Omit<TextProps, 'style'> & {
  style?: StyleProp<Omit<TextStyle, 'fontFamily'>> & { fontFamily?: FONTS };
};

export const CText = ({ children, style, ...props }: CTextProps) => {
  return (
    <Text
      {...props}
      style={[styles.container, ...(Array.isArray(style) ? style : [style])]}
    >
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
