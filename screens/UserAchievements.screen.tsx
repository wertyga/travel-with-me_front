import React from 'react';

import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { ACHIEVEMENTS_LEGEND } from '@/components/Achievements/Achievements.utils';
import { VisitPlaceAchievement } from '@/components/Achievements/VisitPlaceAchievement';
import { CText } from '@/components/CText';
import { Tabs } from '@/components/UI/Tabs';
import { Avatar } from '@/components/User/Avatar/Avatar';
import { useStores } from '@/hooks';

const UserAchievementsScreen = () => {
  const { achievements, hasAchievements, user } = useStores(stores => ({
    achievements: stores.achievementsStore.achievements,
    hasAchievements: stores.achievementsStore.hasAchievements,
    user: stores.userStore.user,
  }));

  const tabs = ACHIEVEMENTS_LEGEND.map(name => name[1]);

  return (
    <MainLayout headerTitle="Achievements">
      <View style={[styles.item, styles.avatarAndName]}>
        <Avatar size={50} />
        <View style={styles.name}>
          <CText>{`${user.username}`}</CText>
          <CText style={styles.subname}>{user.rank}</CText>
        </View>
      </View>

      {!hasAchievements && <CText>There is no achievements yet</CText>}
      {hasAchievements && (
        <Tabs tabs={tabs} style={styles.tabs} tabStyle={styles.tab}>
          {[
            <VisitPlaceAchievement
              achievements={achievements[ACHIEVEMENTS_LEGEND[0][0]] || []}
              key={ACHIEVEMENTS_LEGEND[0][0]}
            />,
          ]}
        </Tabs>
      )}
    </MainLayout>
  );
};

export default observer(UserAchievementsScreen);

const styles = StyleSheet.create({
  avatar: {},
  tabs: {},
  tab: {
    width: '30%',
  },
  item: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatarAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    marginLeft: 15,
  },
  subname: {
    fontSize: 12,
  },
});
