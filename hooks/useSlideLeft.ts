import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  thresholdForFinish: number;
  onFinish?: (data?: any) => void;
  onFinishParams?: any;
  leftSideTranslation?: number;
};

export const useSlideLeft = ({
  thresholdForFinish,
  onFinish,
  onFinishParams,
  leftSideTranslation = -1000,
}: Props) => {
  const swipeValues = useSharedValue({
    translateX: 0,
    initialValue: 0,
  });

  const animatedStyles = useAnimatedStyle<any>(() => {
    const { translateX } = swipeValues.value;
    const isWithTiming = translateX === leftSideTranslation || translateX === 0;

    return {
      transform: [
        {
          translateX: isWithTiming
            ? withTiming(swipeValues.value.translateX)
            : translateX,
        },
      ],
    };
  });

  const onUpdate = e => {
    const { translationX } = e;

    swipeValues.value = {
      initialValue: swipeValues.value.initialValue,
      translateX: swipeValues.value.initialValue + translationX,
    };
  };

  const onFinalize = e => {
    const { translationX } = e;
    const isNotDelete =
      translationX > 0 || Math.abs(translationX) < thresholdForFinish;

    if (isNotDelete) {
      swipeValues.value = {
        translateX: 0,
        initialValue: 0,
      };
      return;
    }

    swipeValues.value = {
      translateX: leftSideTranslation as number,
      initialValue: leftSideTranslation as number,
    };

    if (onFinish) {
      runOnJS(onFinish)(onFinishParams);
    }
  };

  return { onFinalize, onUpdate, animatedStyles };
};
