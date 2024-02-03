import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native';

export type DomStore = {
  footer?: StyleProp<ViewStyle>;
  header?: StyleProp<ViewStyle>;
  layout?: {
    height: number;
  };
};
