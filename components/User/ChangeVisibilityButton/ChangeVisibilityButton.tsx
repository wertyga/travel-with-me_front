import React from 'react';

import { StyleSheet, Switch, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { useStores } from '@/hooks';

export const ChangeVisibilityButton = () => {
  const { fetchUpdateUserImmidiately, user } = useStores(stores => ({
    fetchUpdateUserImmidiately: stores.userStore.fetchUpdateUserImmidiately,
    user: stores.userStore.user,
  }));

  const onChangeVisibility = () => {
    fetchUpdateUserImmidiately({ isVisible: !user.isVisible });
  };

  return (
    <Button
      style={[styles.item, user.isVisible && { marginBottom: 10 }]}
      noPaddings
      onPress={onChangeVisibility}
    >
      <View style={{ flex: 1 }}>
        <CText light>Show me for other people</CText>
        <CText style={styles.optionSubtext} light>
          This option will show you for other users who is in the same city as
          you and allow them to write to you
        </CText>
      </View>
      <Switch value={user.isVisible} onChange={onChangeVisibility} />
    </Button>
  );
};

export default observer(ChangeVisibilityButton);

const styles = StyleSheet.create({
  item: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  optionSubtext: {
    marginTop: 5,
    maxWidth: '90%',
    fontSize: 12,
  },
});
