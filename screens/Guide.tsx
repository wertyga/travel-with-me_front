import { Text, View } from 'react-native';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { Map } from '@/components/Map';

const GuideScreen = ({ route }) => {
  const { data: guide, isLoading } = useGetGuideQuery(
    { slug: route.params?.guideSlug },
    { skip: !route.params?.guideSlug }
  );

  if (!guide || isLoading) {
    return <SafeLoader />;
  }

  return (
    <MainLayout>
      <View className="bg-red-400 w-full h-full">
        <Map coords={guide.points[0].coords} points={guide.points} />
      </View>
    </MainLayout>
  );
};

export default GuideScreen;
