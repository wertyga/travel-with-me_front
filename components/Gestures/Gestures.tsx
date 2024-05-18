import { ViewStyle } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  children: React.ReactNode;
  onFinalize: (e: any) => void;
  onUpdate: (e: any) => void;
  style?: StyleProp<ViewStyle>;
};

const Detector = ({ children, onFinalize, onUpdate }) => {
  const gesture = Gesture.Pan().onUpdate(onUpdate).onFinalize(onFinalize);

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
};

export const GesturesContainer = ({ children, style, ...props }: Props) => {
  return (
    <GestureHandlerRootView style={style}>
      <Detector {...props}>{children}</Detector>
    </GestureHandlerRootView>
  );
};
