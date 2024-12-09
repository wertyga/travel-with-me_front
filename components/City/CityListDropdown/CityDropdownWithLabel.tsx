import React from 'react';

import { StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import {
  CityListDropdown,
  Props as CityListDropdownProps,
} from '@/components/City/CityListDropdown/CityListDropdown';

type Props = Pick<
  CityListDropdownProps,
  'defaultCity' | 'cities' | 'onChange'
> & {
  label: string;
  subLabel?: string;
};

export const CityDropdownWithLabel = ({
  cities,
  defaultCity,
  onChange,
  label,
  subLabel,
}: Props) => {
  if (!cities.length) return null;

  return (
    <Button rectangle darkBg style={styles.container}>
      <View style={styles.content}>
        <CText light bold>
          {label}
        </CText>
        {!!subLabel && (
          <CText light bold small>
            {subLabel}
          </CText>
        )}
      </View>
      <CityListDropdown
        defaultCity={defaultCity}
        cities={cities}
        onChange={onChange}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    width: '70%',
  },
});
