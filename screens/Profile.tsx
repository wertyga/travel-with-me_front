import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MainLayout } from '@/Layouts';
import { useAuth } from '@/context';
import { useAuthGuard, useSubscription } from '@/hooks';
import { CText } from '@/components/CText';
import Button from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '@/types';

const ProfileScreen = () => {
  useAuthGuard();

  const navi = useNavigation();
  const { logout, user } = useAuth();
  const { subscription } = useSubscription();

  const handleLogout = () => {
    navi.navigate(SCREENS.CitiesList);
    logout();
  };

  if (!user) return null;

  return (
    <MainLayout headerTitle="Profile" style={styles.container}>
      <CText style={styles.item}>{user.username}</CText>
      <View style={styles.item}>
        <CText>{user.email}</CText>
        <CText style={styles.edit}>Edit</CText>
      </View>

      {!!subscription && (
        <View style={styles.item}>
          <CText>Subscription</CText>
          <CText style={styles.edit}>
            {new Date(subscription.validUntil).toLocaleDateString()}
          </CText>
          <CText
            style={styles.edit}
            onPress={() => {
              navi.navigate(SCREENS.Subscriptions);
            }}
          >
            Edit
          </CText>
        </View>
      )}

      {!subscription && (
        <Button high href={SCREENS.Subscriptions}>
          Buy subscription
        </Button>
      )}

      <Button onPress={handleLogout} high style={styles.logoutBtn}>
        Logout
      </Button>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
  item: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  edit: {
    fontSize: 10,
  },
  logoutBtn: {
    marginTop: 25,
  },
});

export default ProfileScreen;
