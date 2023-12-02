import { Text, View } from 'react-native';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { Map } from '@/components/Map';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
      <View className="bg-red-400 w-full h-full">
        <Map points={guide.points} />
      </View>
    </MainLayout>
  );
};

export default GuideScreen;
