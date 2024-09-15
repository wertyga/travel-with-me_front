import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { useNavigation, useStores } from '@/hooks';

import { getIsNetConnected } from '@/utils/etc';

import { SCREENS } from '@/types';

export const UsersNearMeButton = () => {
  const { getUsersNearMe, myCity, user } = useStores(stores => ({
    user: stores.userStore.user,
    myCity: stores.userStore.getMyCity(),
    getUsersNearMe: stores.userStore.getUsersNearMe,
  }));

  const navi = useNavigation();

  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isShowUsersNearMe = getIsNetConnected() && user.isVisible && !!myCity;

  const onPress = async () => {
    setIsLoading(true);

    const users = await getUsersNearMe();

    if (!users.length) {
      setTitle('No users here');
    } else {
      navi.navigate(SCREENS.UsersNearMe);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isShowUsersNearMe) {
      setTitle('Show users near me');
    }
  }, [isShowUsersNearMe]);

  if (!isShowUsersNearMe) return null;

  return (
    <Button high isLoading={isLoading} onPress={onPress}>
      {`${title} • ${myCity.title}`}
    </Button>
  );
};

export default observer(UsersNearMeButton);
