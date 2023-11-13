import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

import { CONSTANTS } from '@/styles/constants';

const Home = () => {
  const navi = useNavigation();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className={`bg-[${CONSTANTS.bg}] px-2 h-full`}></SafeAreaView>
  );
};

export default Home;
