import * as React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideShallowOverview } from '@/components/Guide/GuideShallowOverview/GuideShallowOverview';
import { CONSTANTS } from '@/styles/constants';
import { PaymentForm } from '@/components/Payments/PaymentForm/PaymentForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const { data: guide, isLoading } = useGetGuideQuery(
    { slug: route.params?.guideSlug },
    { skip: !route.params?.guideSlug }
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

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Buy</Text>
          </TouchableOpacity>
        </LinearGradient>

        <PaymentForm />
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
});
