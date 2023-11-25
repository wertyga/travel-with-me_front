import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { CONSTANTS } from '@/styles/constants';

export const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator size="large" color={CONSTANTS.colors.accent} />
      <Text className="text-white mt-1">Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
