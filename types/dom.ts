import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native';

export type DomStore = {
  footer?: StyleProp<ViewStyle> & { hidden?: boolean };
  header?: StyleProp<ViewStyle> & { hidden?: boolean };
  layout?: {
    height: number;
  };
};
