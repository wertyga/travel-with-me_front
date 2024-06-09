import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { FONTS } from '@/types';

export type CTextStyleProp = Omit<TextStyle, 'fontFamily'> & {
  fontFamily?: FONTS;
};
export type CTextProps = Omit<TextProps, 'style'> & {
  style?: CTextStyleProp | CTextStyleProp[];
  small?: boolean;
};

export const CText = ({ children, style, small, ...props }: CTextProps) => {
  return (
    <Text
      {...props}
      style={[
        styles.container,
        small && styles.small,
        ...(Array.isArray(style) ? style : [style]),
      ]}
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
  small: {
    fontSize: 12,
  },
});
