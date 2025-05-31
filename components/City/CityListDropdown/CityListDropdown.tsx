import React, { useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Modal } from '@/components/Common/Modal/Modal';
import { CountryPill } from '@/components/Country';
import { FavoriteListItemUI } from '@/components/UI/FavoriteListItemUI';
import { useFocus } from '@/hooks';

import { City } from '@/types';

import { CONSTANTS } from '@/styles/constants';

export type Props = {
  cities: City[];
  defaultCity?: City;
  onChange: (city: City) => void;
};

const FALLBACK_CITY = {
  _id: '1',
  title: 'Choose city',
} as City;

export const CityListDropdown = ({
  cities,
  onChange,
  defaultCity = FALLBACK_CITY,
}: Props) => {
  const [state, setState] = useState<City>(defaultCity);
  const [isOpened, setIsOpened] = useState(false);

  const chooseCity = (city: City) => {
    setIsOpened(false);
    setState(city);
    onChange(city);
  };

  useFocus(() => {
    setState(defaultCity);
  }, [defaultCity]);

  return (
    <View>
      <CountryPill
        title={state?.title || 'Choose a city'}
        rectangle
        onPress={() => setIsOpened(true)}
        customIcon={
          <FontAwesome
            name="angle-down"
            size={22}
            color={CONSTANTS.colors.typographyLight}
            style={styles.angleIcon}
          />
        }
      />

      <Modal
        visible={isOpened}
        onClose={() => setIsOpened(false)}
        bodyStyle={styles.modalContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.citiesContent}
        >
          {cities.map(city => {
            return (
              <FavoriteListItemUI
                key={city._id}
                title={city.title}
                image={city.image}
                subtitle={`${city.country.flag} ${city.country.title}`}
                onPress={() => chooseCity(city)}
              />
            );
          })}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  angleIcon: {
    bottom: 1,
  },
  citiesContent: {
    gap: 5,
  },
  modalContainer: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
});
