import React, { FC, useEffect } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import AntDesign from '@expo/vector-icons/AntDesign';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { UploadImage } from '@/components/UI';
import { PointImagesUpload } from '@/screens/AddGuideMap/components/PointImagesUpload';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TPointToAdd } from '../AddGuideMap.screen';

export type TAddGuideMetaFormProps = {
  onSubmit: (point: TPointToAdd) => void;
  point: Partial<TPointToAdd> | null;
};

export const POINT_FORM_SCHEMA = yup
  .object({
    title: yup.string().required('This field should not be empty'),
    description: yup.string().required('This field should not be empty'),
    images: yup.array(yup.string()),
    coords: yup.object({
      lat: yup.number(),
      lng: yup.number(),
    }),
    _id: yup.string(),
  })
  .required();

const MAX_IMAGES = 5;

export const PointDescriptionForm: FC<TAddGuideMetaFormProps> = observer(
  ({ onSubmit, point }) => {
    const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
      watch,
    } = useForm({
      resolver: yupResolver(POINT_FORM_SCHEMA),
    });

    const images = watch('images');

    const onImageUpdate = ({ uri }) => {
      setValue('images', [...(images || []), uri]);
    };

    const onDeleteImage = (uri: string) => {
      setValue('images', [...(images || []).filter(image => image !== uri)]);
    };

    useEffect(() => {
      setValue('title', point.title);
      setValue('description', point.description);
      setValue('images', point.images);
      setValue('coords', point.coords);
      setValue('_id', point._id);
    }, [point]);

    const canAddImage = !images || images.length < MAX_IMAGES;

    return (
      <View>
        <ScrollView
          horizontal
          style={imagesStyles.container}
          contentContainerStyle={imagesStyles.content}
        >
          {canAddImage && (
            <UploadImage
              uri={null}
              onUpdate={onImageUpdate}
              style={styles.imageContainer}
              imageStyle={styles.imageStyle}
            >
              <AntDesign name="plus" size={24} color="white" />
            </UploadImage>
          )}
          {images?.map((image, i) => {
            return (
              <PointImagesUpload
                key={image + i}
                uri={image}
                style={styles.imageContainer}
                imageStyle={styles.imageStyle}
                onUpdate={onImageUpdate}
                onDelete={onDeleteImage}
              />
            );
          })}
        </ScrollView>

        <Controller
          control={control as any}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                style={styles.input}
                value={value}
                onChange={onChange}
                placeholder="Title"
                error={errors?.title?.message}
              />
            );
          }}
          name="title"
        />

        <Controller
          control={control as any}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                inputStyle={styles.textarea}
                value={value}
                onChange={onChange}
                placeholder="Description"
                error={errors?.description?.message}
                multiline
              />
            );
          }}
          name="description"
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          high
          rectangle
          filled
          style={{ marginTop: 30 }}
        >
          Save
        </Button>
      </View>
    );
  }
);

const imagesStyles = StyleSheet.create({
  container: {},
  content: {
    height: 130,
    gap: 10,
    paddingVertical: 15,
  },
});

const styles = StyleSheet.create({
  imageContainer: {
    width: 70,
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderColor: 'white',
  },
  imageStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  textarea: {
    height: 200,
    textAlignVertical: 'top',
    paddingTop: 5,
  },
  input: {
    marginBottom: 15,
  },
});
