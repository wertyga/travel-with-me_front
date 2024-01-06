import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const HEIGHTS = [
  60, 50, 70, 100, 40, 30, 20, 50, 100, 90, 80, 30, 20, 60, 50, 70, 100, 40, 30,
  20, 50, 100, 90, 80, 30, 20, 60, 50, 70, 100, 40, 30, 20, 50, 100, 90, 80, 30,
  20, 60, 50, 70, 100, 40, 30, 20, 50, 100, 90, 80, 30, 20, 60, 50, 70, 100, 40,
  30, 20, 50, 100, 90, 80, 30, 20,
];

type Props = {
  progressInPercentage: number;
};

export const AudioLine = ({ progressInPercentage }: Props) => {
  const [state, setState] = useState({
    lineWidth: 0,
    barsCount: 0,
  });

  const barsActive = Math.floor((state.barsCount / 100) * progressInPercentage);
  return (
    <View
      style={styles.container}
      onLayout={e => {
        if (state.lineWidth) return;

        const lineWidth = e.nativeEvent?.layout.width || 0;
        setState(prev => ({
          ...prev,
          lineWidth,
          barsCount: Math.round(lineWidth / 9),
        }));
      }}
    >
      {HEIGHTS.map((height, i) => {
        const isActive = barsActive > i;
        return (
          <View
            key={i}
            style={{
              ...styles.bar,
              height: `${height}%`,
              backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.40)',
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
  },
  bar: {
    width: 3,
    borderRadius: 2,
    marginRight: 6,
  },
});
