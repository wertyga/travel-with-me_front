import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { useNavigation } from '@/hooks';
import { SCREENS } from '@/types';

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
      <View style={styles.scrollView}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <CText>Oops... Something went wrong</CText>
          <CText>{route.params.error}</CText>
        </View>

        <Button onPress={goBack} fluid>
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
