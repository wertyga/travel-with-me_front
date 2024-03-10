import { useLayoutEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@/hooks';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import Toast from 'react-native-toast-message';
import { CText } from '@/components/CText';
import { SCREENS } from '@/types';
import Constants from 'expo-constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Error'>;

const Error = ({ route, navigation }: Props) => {
  const navi = useNavigation();

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

    navi.navigate(prevScreenName as SCREENS, { isFromError: true });
  };

  return (
    <MainLayout>
      <ScrollView className="items-center justify-center h-screen px-6">
        <CText>{`Constants.EXPO_PUBLIC_API_BASE_URL: ${JSON.stringify(Constants.expoConfig?.extra, null, 2)}`}</CText>
        <CText>Oops... Something went wrong</CText>
        <CText>{route.params.error}</CText>

        <Button onPress={goBack} fluid>
          Go Back
        </Button>
      </ScrollView>
    </MainLayout>
  );
};

export default Error;
