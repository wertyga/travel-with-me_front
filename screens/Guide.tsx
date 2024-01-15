import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GuideMap, GuideMeta } from '@/components/Guide';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

const GuideScreen = ({ route }: Props) => {
  const { guideSlug } = route.params || {};
  const navi = useNavigation();

  const { data: guide, isFetching } = useGetGuideQuery(
    { slug: guideSlug },
    { skip: !guideSlug }
  );

  const goToMap = () => {
    navi.navigate('GuideMap', { guideSlug: guide.slug });
  };

  if (!guide || isFetching) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      bgImage={{
        uri: guide.vImage,
      }}
      headerTitle={guide.title}
    >
      <GuideMeta guide={guide} />
    </MainLayout>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({});
