import { ViewStyle } from 'react-native';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  children: React.ReactNode;
  onFinalize?: (e: any) => void;
  onUpdate: (e: any) => void;
  onEnd?: (e: any) => void;
  onStart?: (e: any) => void;
  style?: StyleProp<ViewStyle>;
};

const Detector = ({
  children,
  onFinalize,
  onUpdate,
  onEnd,
  onStart,
}: Partial<Props>) => {
  const gesture = Gesture.Pan().onUpdate(onUpdate);

  if (onEnd) {
    gesture.onEnd(onEnd);
  }

  if (onStart) {
    gesture.onStart(onStart);
  }

  if (onFinalize) {
    gesture.onFinalize(onFinalize);
  }

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
};

export const GesturesContainer = ({ children, style, ...props }: Props) => {
  return (
    <GestureHandlerRootView style={style}>
      <Detector {...props}>{children}</Detector>
    </GestureHandlerRootView>
  );
};
