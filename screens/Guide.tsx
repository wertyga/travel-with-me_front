import * as React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetMySubscriptionQuery, useLazyGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideShallowOverview } from '@/components/Guide/GuideShallowOverview/GuideShallowOverview';
import { CONSTANTS } from '@/styles/constants';
import { GuideMap } from '@/components/Guide';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useAuth } from '@/context';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const navi = useNavigation();
  const { user } = useAuth();

  const [fetchGuide, { data: guide, isLoading }] = useLazyGetGuideQuery();
  const { data: { subscription } = {} } = useGetMySubscriptionQuery(undefined, {
    skip: !user,
  });

  const goToMap = () => {
    navi.navigate('GuideMap', { guideSlug: guide.slug });
  };

  useFocusEffect(
    useCallback(() => {
      if (!route.params?.guideSlug) return;
      fetchGuide({ slug: route.params?.guideSlug });
    }, [])
  );

  if (!guide || isLoading) {
    return <SafeLoader />;
  }

  return (
    <MainLayout>
      <ImageBackground source={{ uri: guide.vImage }} style={styles.bgImage}>
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.1)',
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0.1)',
            'rgba(0, 0, 0, 0.01)',
          ]}
          locations={[0, 0.7, 0.95, 0.99]}
          style={styles.gradient}
        >
          <GuideShallowOverview guide={guide} />

          {!!subscription && (
            <TouchableOpacity style={styles.goToMap} onPress={goToMap}>
              <Text>Go to map</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </ImageBackground>
    </MainLayout>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: CONSTANTS.colors.blue,
  },
  btnText: {
    color: 'white',
  },
  gradient: {
    width: '100%',
    height: '100%',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  bgImage: {},
  goToMap: {
    padding: 20,
    backgroundColor: CONSTANTS.colors.blue,
  },
});
