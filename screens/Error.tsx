import { StyleSheet, View } from 'react-native';

import Toast from 'react-native-toast-message';

import Constants from 'expo-constants';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { useNavigation } from '@/hooks';

import { SCREENS } from '@/types';

const Error = ({ route, navigation }) => {
  const navi = useNavigation();

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
      <View style={styles.scrollView}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <CText light>Oops... Something went wrong</CText>
          <CText light>{route.params?.error}</CText>

          <CText light>{Constants.expoConfig.version}</CText>
          <CText light>{Constants.expoConfig.extra.API_BASE_URL}</CText>
        </View>

        <Button onPress={goBack} fluid high light>
          Go Back
        </Button>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
});

export default Error;
