import React, { useState } from 'react';

import {
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Toast from 'react-native-toast-message';

import * as ImagePicker from 'expo-image-picker';

import { Modal } from '@/components/Common/Modal/Modal';
import { FastImage } from '@/components/FastImage';
import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { UploadChoice, UploadTypes } from '@/components/UI/UploadChoice';

export type ImageStorage = {
  uri: string;
};

export type TUploadImageProps = {
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  uri: string;
  onUpdate: (data: ImageStorage) => void | Promise<void>;
  children?: React.ReactNode;
  additionalContent?: React.ReactNode;
};

export const UploadImage = ({
  style,
  onUpdate,
  uri,
  children,
  imageStyle,
  additionalContent,
}: TUploadImageProps) => {
  const [isModalShown, setIsModalShown] = useState(false);

  const toggleModalShow = () => {
    setIsModalShown(!isModalShown);
  };

  const onLoadFromInnerStorage = async () => {
    try {
      const {
        assets: [{ uri }],
      } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      await onUpdate({ uri });
      toggleModalShow();
    } catch (e) {
      if (e.message?.includes('non-iterable instance.')) {
        return;
      }

      Toast.show({
        type: 'error',
        text1: e.message,
      });
    }
  };

  const onLoadFromCamera = async () => {
    try {
      const {
        assets: [{ uri }],
      } = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      onUpdate({ uri });
      toggleModalShow();
    } catch (e) {
      if (e.message?.includes('non-iterable instance.')) {
        return;
      }

      Toast.show({
        type: 'error',
        text1: e.message,
      });
    }
  };

  const onChooseType = (type: UploadTypes) => {
    if (type === 'folder') {
      return onLoadFromInnerStorage();
    }
    if (type === 'camera') {
      return onLoadFromCamera();
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleModalShow}
        style={[styles.container, style]}
      >
        {!!uri && (
          <FastImage
            source={uri}
            style={{ ...styles.image, ...imageStyle }}
            mediaSize={MEDIA_SIZES.Small}
          />
        )}
        {!uri && children}
        {additionalContent}
      </TouchableOpacity>

      <Modal
        visible={isModalShown}
        onClose={() => setIsModalShown(false)}
        title="Choose image"
        style={styles.modal}
        transparent
      >
        <UploadChoice onChoose={onChooseType} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
