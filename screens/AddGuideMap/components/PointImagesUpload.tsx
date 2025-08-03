import React, { FC } from 'react';

import { ImageStyle, Pressable, StyleSheet, ViewStyle } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { TUploadImageProps, UploadImage } from '@/components/UI';

import { CONSTANTS } from '@/styles/constants';

export type TPointImagesUploadProps = {
  uri: string;
  onUpdate: TUploadImageProps['onUpdate'];
  style: ViewStyle;
  imageStyle: ImageStyle;
  onDelete: (uri: string) => void;
};

export const PointImagesUpload: FC<TPointImagesUploadProps> = ({
  uri,
  onUpdate,
  style,
  imageStyle,
  onDelete,
}) => {
  return (
    <UploadImage
      uri={uri}
      onUpdate={onUpdate}
      style={style}
      imageStyle={imageStyle}
      additionalContent={
        <Pressable style={styles.deleteIcon} onPress={() => onDelete(uri)}>
          <FontAwesome name="trash-o" size={16} color="white" />
        </Pressable>
      }
    >
      <AntDesign name="plus" size={24} color="white" />
    </UploadImage>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: CONSTANTS.colors.bgDark,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
