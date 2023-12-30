import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CONSTANTS } from '@/styles/constants';
import { CText } from '@/components/CText';

export const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator size="large" color={CONSTANTS.colors.accent} />
      <CText style={styles.text}>Loading...</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    marginTop: 5,
  },
});
