import React from 'react';

import {
  Modal as ModalNative,
  ModalProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Button from '@/components/Button';
import { CText } from '@/components/CText';

import { CONSTANTS } from '@/styles/constants';

export type Props = ModalProps & {
  title?: string;
  onClose: () => void;
  containerStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
  white?: boolean;
};

export const Modal = ({
  title,
  animationType = 'slide',
  onClose,
  children,
  containerStyle,
  bodyStyle,
  transparent,
  visible,
  white,
  style,
  ...props
}: Props) => {
  return (
    <ModalNative
      {...props}
      animationType={animationType}
      visible={visible}
      transparent={transparent}
    >
      <View
        style={[
          styles.content,
          transparent && { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          white && { backgroundColor: 'white' },
          bodyStyle,
        ]}
      >
        <View style={styles.titleContainer}>
          <Button
            squareSize={40}
            rectangle
            onPress={onClose}
            style={[white && { backgroundColor: 'rgba(0, 0, 0, 0.1)' }]}
          >
            <FontAwesome5
              name="angle-left"
              size={24}
              color={
                white
                  ? CONSTANTS.colors.typography
                  : CONSTANTS.colors.typographyLight
              }
            />
          </Button>
          {!!title && <CText light>{title}</CText>}
        </View>

        {children}
      </View>
    </ModalNative>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: CONSTANTS.colors.bgMiddle,
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
    flex: 1,
  },
  titleContainer: {
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
