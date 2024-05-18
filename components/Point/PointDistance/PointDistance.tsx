import { StyleSheet, View, ViewProps } from 'react-native';
import { CText } from '@/components/CText';
import { FontAwesome5 } from '@expo/vector-icons';
import { FONTS } from '@/types';

type Props = {
  distance: string;
  style?: ViewProps['style'];
};

export const PointDistance = ({ distance, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <FontAwesome5 name="walking" size={24} color="white" />
      <CText style={styles.text}>{distance}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontFamily: FONTS.OpenSansBold,
  },
  pulse: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
