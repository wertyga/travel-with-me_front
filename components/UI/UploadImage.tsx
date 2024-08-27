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

export type ImageStorage = {
  uri: string;
};

type Props = {
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  uri: string;
  onUpdate: (data: ImageStorage) => void;
  children?: React.ReactNode;
};

export const UploadImage = ({
  style,
  onUpdate,
  uri,
  children,
  imageStyle,
}: Props) => {
  const onPress = async () => {
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
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {!!uri && <Image source={{ uri }} style={[styles.image, imageStyle]} />}
      {!uri && children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
