import { StyleSheet, View, ViewStyle } from 'react-native';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  style?: ViewStyle;
};

export const PullTrigger = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.trigger} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  trigger: {
    height: CONSTANTS.spaces.pullTriggerHeight,
    backgroundColor: 'white',
    borderRadius: 4,
    width: 150,
  },
});
