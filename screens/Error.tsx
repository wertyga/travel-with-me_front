import { useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { CONSTANTS } from '@/styles/constants';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Error'>;

const Error = ({ route, navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
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
            onPress={() => navigation.navigate('Home', { isFromError: true })}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Error;
