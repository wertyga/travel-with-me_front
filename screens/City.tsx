import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import AmsterImage from '@/assets/images/amter_1.jpg';

import { CONSTANTS } from '@/styles/constants';

const City = () => {
  const navi = useNavigation();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  return <SafeAreaView className="w-screen"></SafeAreaView>;
};

export default City;
