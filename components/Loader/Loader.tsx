import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CText } from '@/components/CText';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  textColor?: string;
};

export const Loader = ({ textColor = 'white' }: Props) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator size="large" color={CONSTANTS.colors.accent} />
      <CText style={{ ...styles.text, color: textColor }}>Loading...</CText>
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
