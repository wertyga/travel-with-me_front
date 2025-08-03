import { FC } from 'react';

import { StyleSheet, View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CityDropdownWithLabel } from '@/components/City/CityListDropdown/CityDropdownWithLabel';
import { Input } from '@/components/Input';
import { useStores } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { City } from '@/types';

export type TAddGuideMetaFormProps = {
  onSubmit: (data: { title: string; description: string; city: City }) => void;
};

export const ADD_GUIDE_FORM_SCHEMA = yup
  .object({
    title: yup.string().required('This field should not be empty'),
    description: yup.string().required('This field should not be empty'),
    city: yup.object().required('This field should not be empty'),
  })
  .required();

export const AddGuideMetaForm: FC<TAddGuideMetaFormProps> = observer(
  ({ onSubmit }) => {
    const { citiesList } = useStores(stores => ({
      citiesList: stores.citiesListStore.cityLightList,
    }));

    const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(ADD_GUIDE_FORM_SCHEMA),
    });

    return (
      <View style={styles.container}>
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
                style={styles.input}
                value={value}
                onChange={onChange}
                placeholder="Description"
                error={errors?.description?.message}
              />
            );
          }}
          name="description"
        />

        <CityDropdownWithLabel
          cities={citiesList}
          onChange={city => {
            setValue('city', city);
          }}
          label="Choose a city"
          noBg
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          high
          rectangle
          filled
          style={{ marginTop: 20 }}
        >
          Go to map
        </Button>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
  input: {
    marginBottom: 15,
  },
});
