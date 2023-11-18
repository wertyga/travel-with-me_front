import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

export const SafeLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Text>Safe loader</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
