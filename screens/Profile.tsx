import { Text } from 'react-native';
import { MainLayout } from '@/Layouts';
import { useAuth } from '@/context';
import React, { useLayoutEffect } from 'react';
import { useAuthGuard } from '@/hooks';
import Button from '@/components/Button';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';

const ProfileScreen = () => {
  useAuthGuard();

  return (
    <MainLayout headerTitle="Profile">
      <Button>Logout</Button>
    </MainLayout>
  );
};

export default ProfileScreen;
