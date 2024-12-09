import React, { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { CityDropdownWithLabel } from '@/components/City/CityListDropdown/CityDropdownWithLabel';
import { AvatarWithName } from '@/components/UI/AvatarWithName';
import { useAuthGuard, useFocus, useNavigation, useStores } from '@/hooks';

import { storage } from '@/utils';

import { City, SCREENS } from '@/types';
import { User } from '@/types/user';

import { CONSTANTS } from '@/styles/constants';

const UsersNearMeScreen = () => {
  useAuthGuard();

  const navi = useNavigation();

  const {
    usersNearMe,
    cityLightList,
    getUsersInTheCity,
    user,
    getSavedMyCityBefore,
    setMyCity,
  } = useStores(stores => ({
    usersNearMe: stores.userStore.usersNearMe,
    user: stores.userStore.user,
    getSavedMyCityBefore: stores.userStore.getSavedMyCityBefore,
    getUsersInTheCity: stores.userStore.getUsersInTheCity,
    setMyCity: stores.userStore.setMyCity,
    cityLightList: stores.citiesListStore.cityLightList,
  }));

  const [state, setState] = useState({
    isLoading: false,
    chosenCity: null,
    myCity: null,
  });

  const fetchUsersInTheCity = async () => {
    if (!state.chosenCity) return;

    setState(prev => ({ ...prev, isLoading: true }));
    await getUsersInTheCity(state.chosenCity._id);

    setState(prev => ({ ...prev, isLoading: false }));
  };

  const onPressGoToChat = async (user: User) => {
    navi.navigate(SCREENS.Chat, { withUser: user });
  };

  const onChangeMyCity = async (city: City) => {
    setState(prev => ({ ...prev, myCity: city }));

    await setMyCity(city);
  };

  const onChangeTargetCity = async (city: City) => {
    setState(prev => ({ ...prev, chosenCity: city }));

    await storage.set('findPeopleInTheCity', city);
  };

  useEffect(() => {
    const getInitialMyCity = async () => {
      const cityChosenBefore = await getSavedMyCityBefore();
      const targetCityBefore = await storage.get('findPeopleInTheCity');

      setState(prev => ({
        ...prev,
        myCity: cityChosenBefore,
        chosenCity: targetCityBefore || cityChosenBefore,
      }));
    };

    getInitialMyCity();
  }, []);

  useFocus(() => {
    if (!state.chosenCity) return;

    fetchUsersInTheCity();
  }, [state.chosenCity]);

  const isRenderEmptyList = !usersNearMe?.length && user?.isVisible;
  const isRenderWarning = !user?.isVisible;

  return (
    <MainLayout
      headerTitle="People Near Me"
      bgImage={state.chosenCity?.image}
      isLoading={state.isLoading}
    >
      <View
        style={{
          gap: 10,
        }}
      >
        <CityDropdownWithLabel
          label="My city"
          subLabel="Help other people to find you"
          defaultCity={state.myCity}
          cities={cityLightList}
          onChange={onChangeMyCity}
        />
        <CityDropdownWithLabel
          label=" Find people in"
          defaultCity={state.chosenCity}
          cities={cityLightList}
          onChange={onChangeTargetCity}
        />
      </View>

      <View style={styles.reload}>
        <Button squareSize={40} rectangle onPress={fetchUsersInTheCity} darkBg>
          <Ionicons
            name="reload"
            size={24}
            color={CONSTANTS.colors.typographyLight}
          />
        </Button>
      </View>

      {isRenderWarning && (
        <CText
          light
          style={{
            fontSize: 18,
          }}
        >
          To see people in the city - enable your visibility
        </CText>
      )}

      {isRenderEmptyList && (
        <CText
          light
          style={{
            fontSize: 18,
          }}
        >
          Empty
        </CText>
      )}

      <ScrollView contentContainerStyle={styles.list}>
        {usersNearMe?.map(user => {
          return (
            <Button
              key={user._id}
              style={styles.user}
              onPress={() => onPressGoToChat(user)}
            >
              <AvatarWithName
                size={50}
                avatar={user.avatar}
                username={user.username}
                underNameText={user.lastCity?.title}
                verticalAlign="center"
              />
            </Button>
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

export default observer(UsersNearMeScreen);

const styles = StyleSheet.create({
  list: {
    gap: 20,
  },
  user: {
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  onlineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lastCity: {
    fontSize: 12,
  },
  reload: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
