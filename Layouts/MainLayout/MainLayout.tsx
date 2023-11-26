import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Header } from '@/components/Header';
import { RouteProp } from '@react-navigation/core';

type Props = {
  children: React.ReactNode;
  route: RouteProp<any>;
  navigation: any;
  className?: string;
  title: string;
};

export const MainLayout = ({
  children,
  route,
  navigation,
  className = '',
  title,
}: Props) => {
  return (
    <SafeAreaView>
      <View className={`relative w-screen h-screen ${className}`}>
        {children}
        <Header className="mb-4 absolute top-0 left-0" title={title} />
      </View>
    </SafeAreaView>
  );
};
