import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

export type CTextStyleProp = Omit<TextStyle, 'fontFamily'> & {
  fontFamily?: FONTS;
};
export type CTextProps = Omit<TextProps, 'style'> & {
  style?: CTextStyleProp | CTextStyleProp[];
  small?: boolean;
  light?: boolean;
};

export const CText = ({
  children,
  style,
  small,
  light,
  ...props
}: CTextProps) => {
  return (
    <Text
      {...props}
      style={[
        styles.container,
        small && styles.small,
        {
          color: light
            ? CONSTANTS.colors.typographyLight
            : CONSTANTS.colors.typography,
        },
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
  },
  small: {
    fontSize: 12,
  },
});
