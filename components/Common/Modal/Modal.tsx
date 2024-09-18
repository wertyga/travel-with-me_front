import React from 'react';

import {
  Dimensions,
  Modal as ModalNative,
  ModalProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { CText } from '@/components/CText';

import { CONSTANTS } from '@/styles/constants';

type Props = ModalProps & {
  title?: string;
  onClose: () => void;
  style?: ViewStyle;
};

export const Modal = ({
  title,
  animationType = 'slide',
  onClose,
  children,
  style,
  transparent,
  visible,
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
        ]}
      >
        <View style={styles.titleContainer}>
          {!!title && <CText style={styles.title}>{title}</CText>}
          <AntDesign
            name="closecircleo"
            size={24}
            color="white"
            onPress={onClose}
          />
        </View>

        <View style={[{ flex: 1 }, style]}>{children}</View>
      </View>
    </ModalNative>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: CONSTANTS.colors.bgMiddle,
    padding: CONSTANTS.spaces.paddingHorizontal,
    paddingBottom: 20,
    flex: 1,
    width: Dimensions.get('window').width,
  },
  titleContainer: {
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {},
});
