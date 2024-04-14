import { Text, View, Button } from 'react-native';
import { useStores } from '@/mobx/StoreProvider';
import { observer } from 'mobx-react';

const TestScreen = () => {
  const { update, test } = useStores(({ testStore }) => ({
    update: testStore.update,
    test: testStore.test,
  }));
  return (
    <View>
      <Text>TestScreen</Text>
      <Text>{test}</Text>
      <Button title="UPDATE" onPress={update} />
    </View>
  );
};

export default observer(TestScreen);
