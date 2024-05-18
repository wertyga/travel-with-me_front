import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import Button from '@/components/Button';
import { CText } from '@/components/CText';

type Props = {
  children: React.ReactNode;
  fetchError?: { message: string; statusCode: number };
  reFetchMethod?: (data?: any) => void;
};

export const FetchErrorWrapper = ({
  children,
  fetchError,
  reFetchMethod,
}: Props) => {
  const [isError, setIsError] = useState(false);

  const closeErrorLayout = () => {
    reFetchMethod?.();
    setIsError(false);
  };

  useEffect(() => {
    setIsError(!!fetchError);
  }, [fetchError]);

  if (isError) {
    return (
      <BackgroundGradient style={styles.scrollView}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <CText>Oops... Something went wrong</CText>
          <CText>{fetchError?.message}</CText>
        </View>

        <Button onPress={closeErrorLayout} fluid>
          Go Back
        </Button>
      </BackgroundGradient>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
});
