import React, { useEffect, useState } from 'react';

import {
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Toast from 'react-native-toast-message';

import * as ImagePicker from 'expo-image-picker';

import { UploadChoice, UploadTypes } from '@/components/UI/UploadChoice';
import { useModal } from '@/hooks';

export type ImageStorage = {
  uri: string;
};

type Props = {
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  uri: string;
  onUpdate: (data: ImageStorage) => void;
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
}: Props) => {
  const { toggleShow, createModal } = useModal();

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

      onUpdate({ uri });
      toggleShow();
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
      toggleShow();
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

  useEffect(() => {
    createModal(<UploadChoice onChoose={onChooseType} />);
  }, []);

  return (
    <TouchableOpacity onPress={toggleShow} style={[styles.container, style]}>
      {!!uri && <Image source={{ uri }} style={[styles.image, imageStyle]} />}
      {!uri && children}
      {additionalContent}
    </TouchableOpacity>
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
});
