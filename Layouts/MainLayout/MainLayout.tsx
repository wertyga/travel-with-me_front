import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Header } from '@/components/Header';
import { useNavigation } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const MainLayout = ({ children, className = '' }: Props) => {
  const route = useNavigation();

  return (
    <SafeAreaView>
      <View className={`relative w-screen h-screen ${className}`}>
        {children}
        {/*<Header className="mb-4 absolute top-0 left-0" title={title} />*/}
      </View>
    </SafeAreaView>
  );
};
