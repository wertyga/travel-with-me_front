import { StyleSheet, View, ViewStyle } from 'react-native';
import cn from '@/app/classname';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  totalCount: number;
  currentIndex: number;
  activeColor?: string;
  inActiveColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const CarouselDots = ({
  totalCount,
  currentIndex,
  activeColor = 'white',
  inActiveColor = 'white',
  style,
}: Props) => {
  const isFirstActive = currentIndex === 0;
  const isMiddleActive = currentIndex > 0 && currentIndex !== totalCount - 1;
  const isLastActive = currentIndex === totalCount - 1;
  return (
    <View style={[styles.container, style]}>
      <View
        style={cn(
          {
            ...styles.item,
            backgroundColor: isFirstActive ? activeColor : inActiveColor,
          },
          { [isFirstActive]: styles.activeItem }
        )}
      />
      <View
        style={cn(
          {
            ...styles.item,
            backgroundColor: isMiddleActive ? activeColor : inActiveColor,
          },
          { [isMiddleActive]: styles.activeItem }
        )}
      />
      <View
        style={cn(
          {
            ...styles.item,
            backgroundColor: isLastActive ? activeColor : inActiveColor,
          },
          { [isLastActive]: styles.activeItem }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  item: {
    width: 30,
    height: 4,
    transform: [{ scaleX: 0.5 }],
    opacity: 0.7,
    borderRadius: 6,
  },
  activeItem: {
    transform: [{ scaleX: 1 }],
    opacity: 1,
  },
});
