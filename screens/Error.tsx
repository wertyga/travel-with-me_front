import { useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CONSTANTS } from '@/styles/constants';

const Error = ({ route }) => {
  const navi = useNavigation();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <View className="items-center justify-center h-screen px-6">
        <Text>{route.params.error}</Text>

        <TouchableOpacity
          className={`rounded-lg bg-[${CONSTANTS.colors.blue}] p-2 mt-8 w-full items-center`}
        >
          <Text
            className="text-white text-[12px]"
            onPress={() => navi.navigate('Home', { isFromError: true })}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Error;
