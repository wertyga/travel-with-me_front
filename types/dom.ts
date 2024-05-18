import { ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

export type DomStore = {
  footer?: StyleProp<ViewStyle> & { hidden?: boolean };
  header?: StyleProp<ViewStyle> & { hidden?: boolean };
  layout?: {
    height: number;
  };
};
