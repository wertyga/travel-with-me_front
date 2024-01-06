import { Text } from 'react-native';
import { MainLayout } from '@/Layouts';
import { useAuth } from '@/context';
import { useLayoutEffect } from 'react';
import { useAuthGuard } from '@/hooks';

const ProfileScreen = () => {
  useAuthGuard();

  return (
    <MainLayout>
      <Text>asdasdasd</Text>
    </MainLayout>
  );
};

export default ProfileScreen;
