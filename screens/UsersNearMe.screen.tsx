import React, { useEffect, useRef, useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { CityDropdownWithLabel } from '@/components/City/CityListDropdown/CityDropdownWithLabel';
import { AvatarWithName } from '@/components/UI/AvatarWithName';
import { CoverRounded } from '@/components/UI/CoverRounded';
import {
  useAuthGuard,
  useFetch,
  useFocus,
  useNavigation,
  useStores,
} from '@/hooks';

import { storage } from '@/utils';

import { City, SCREENS } from '@/types';
import { User } from '@/types/user';

const FETCH_USERS_IN_THE_CITY_INTERVAL = 5000;

const UsersNearMeScreen = () => {
  useAuthGuard();

  const navi = useNavigation();

  const fetchTimer = useRef(null);

  const { cityLightList, getUsersInTheCity, user, myLastCity } = useStores(
    stores => ({
      user: stores.userStore.user,
      getUsersInTheCity: stores.userStore.getUsersInTheCity,
      myLastCity: stores.userStore.lastCity,
      cityLightList: stores.citiesListStore.cityLightList,
    })
  );

  const [fetchUsersInTheCity, { data: usersNearMe = [] }] =
    useFetch(getUsersInTheCity);

  const [state, setState] = useState({
    chosenCity: null,
  });

  const longPollingFetchUsersInTheCity = () => {
    if (fetchTimer.current) {
      clearInterval(fetchTimer.current);
      fetchTimer.current = null;
    }

    fetchTimer.current = setInterval(
      () => fetchUsersInTheCity(state.chosenCity._id),
      FETCH_USERS_IN_THE_CITY_INTERVAL
    );
  };

  const onPressGoToChat = async (user: User) => {
    navi.navigate(SCREENS.Chat, { withUser: user });
  };

  const onChangeTargetCity = async (city: City) => {
    setState(prev => ({ ...prev, chosenCity: city }));

    await storage.set('findPeopleInTheCity', city);
  };

  useEffect(() => {
    const getInitialMyCity = async () => {
      const targetCityBefore = await storage.get('findPeopleInTheCity');

      setState(prev => ({
        ...prev,
        chosenCity: targetCityBefore || myLastCity || cityLightList[0],
      }));
    };

    getInitialMyCity();

    return () => {
      clearInterval(fetchTimer.current);
      fetchTimer.current = null;
    };
  }, []);

  useFocus(() => {
    if (!state.chosenCity) return;

    fetchUsersInTheCity(state.chosenCity._id).then(
      longPollingFetchUsersInTheCity
    );
  }, [state.chosenCity]);

  const isRenderEmptyList = !usersNearMe?.length && user?.isVisible;
  const isRenderWarning = !user?.isVisible;

  return (
    <MainLayout headerTitle="People Near Me" bgImage={state.chosenCity?.image}>
      <CityDropdownWithLabel
        label="Join to city's chat"
        subLabel="Help other people to find you"
        defaultCity={state.chosenCity}
        cities={cityLightList}
        onChange={onChangeTargetCity}
      />

      <CoverRounded style={styles.cover}>
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
      </CoverRounded>
    </MainLayout>
  );
};

export default observer(UsersNearMeScreen);

const styles = StyleSheet.create({
  list: {
    gap: 20,
  },
  cover: {
    marginTop: 10,
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
