import { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import Toast from 'react-native-toast-message';
import { CText } from '@/components/CText';

type Props = NativeStackScreenProps<RootStackParamList, 'Error'>;

const Error = ({ route, navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const goBack = () => {
    const { routes } = navigation.getState();
    const prevScreenName = routes[routes.length - 2]?.name;
    if (!prevScreenName) {
      Toast.show({
        type: 'error',
        text1: 'Cant find previous screen?',
      });

      return;
    }

    navigation.navigate(prevScreenName, { isFromError: true });
  };

  return (
    <MainLayout>
      <View className="items-center justify-center h-screen px-6">
        <CText>Oops... Something went wrong</CText>
        <CText>{route.params.error}</CText>

        <Button onPress={goBack} fluid>
          Go Back
        </Button>
      </View>
    </MainLayout>
  );
};

export default Error;
