import * as React from 'react';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMap } from '@/components/Guide';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useAuth } from '@/context';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const { user } = useAuth();
  const navi = useNavigation();

  const { data: guide, isLoading } = useGetGuideQuery(
    { slug: route.params?.guideSlug },
    { skip: !route.params?.guideSlug }
  );

  useLayoutEffect(() => {
    if (!route.params?.guideSlug) {
      Toast.show({
        type: 'error',
        text1: 'No guide slug was provided',
      });
    }
    if (!user) {
      navi.navigate('Login');
    }
  }, []);

  if (!guide || isLoading) {
    return <SafeLoader />;
  }

  return (
    <MainLayout>
      <GuideMap guide={guide} />
    </MainLayout>
  );
};

export default GuideScreen;
