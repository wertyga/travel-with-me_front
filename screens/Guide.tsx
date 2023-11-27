import { Text, View } from 'react-native';
import { useGetGuideQuery } from '@/api';
import { SafeLoader } from '@/components/SafeLoader';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';

type Props = {
  slug: string;
};

const GuideScreen = ({ slug, ...naviProps }: Props) => {
  const { data: guide, isLoading } = useGetGuideQuery(
    { slug },
    { skip: !slug }
  );

  if (!guide && isLoading) {
    return <SafeLoader />;
  }

  return (
    <MainLayout title={guide.title} {...naviProps}>
      <Text>GuideScreen</Text>
    </MainLayout>
  );
};

export default GuideScreen;
