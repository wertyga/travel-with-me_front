import { useState } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { CText } from '@/components/CText';
import { CTextProps } from '@/components/CText/CText';

type Props = CTextProps & {
  children: string;
  containerStyle?: ViewStyle;
};

export const ReadMore = ({
  children,
  numberOfLines = 10,
  containerStyle,
  style: textStyle,
  ...textProps
}: Props) => {
  const [isReadMoreOpened, setIsReadMoreOpened] = useState(false);

  const toggleOpen = () => {
    setIsReadMoreOpened(!isReadMoreOpened);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <CText
        {...textProps}
        numberOfLines={isReadMoreOpened ? undefined : numberOfLines}
      >
        {children}
      </CText>

      <CText
        light={textProps.light}
        style={{ ...styles.readMore, ...(textStyle || {}) }}
        onPress={toggleOpen}
      >
        {isReadMoreOpened ? 'Read less' : 'Read more'}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  readMore: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
