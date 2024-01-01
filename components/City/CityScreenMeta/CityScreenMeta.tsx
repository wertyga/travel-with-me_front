import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CText } from '@/components/CText';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { City, FONTS } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import { GuidesSlideList } from '@/components/Guide';
import { CountryPill } from '@/components/Country';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  city: City;
  style?: StyleProp<ViewStyle>;
  opened?: boolean;
};

const MIN_BOTTOM = 380;
const ONE_PERCENT = Math.abs(MIN_BOTTOM) / 100;
const INITIAL_ANIMATED_STATE = {
  translateY: 0,
  opacity: 0,
  zIndex: 0,
  paddingBottom: 70,
  opened: false,
};

export const CityScreenMeta = ({ city, style, opened }: Props) => {
  const swipeValues = useSharedValue(INITIAL_ANIMATED_STATE);

  const animatedWrapperStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: swipeValues.value.translateY }],
      zIndex: swipeValues.value.zIndex,
    };
  });
  const animatedHidedPartStyles = useAnimatedStyle(() => {
    return {
      opacity: swipeValues.value.opacity,
    };
  });
  const animatedMetaStyles = useAnimatedStyle(() => {
    return {
      paddingBottom: swipeValues.value.paddingBottom,
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      const { translationY } = e;
      const differencePercentY = Math.round(
        Math.abs(translationY) / ONE_PERCENT
      );

      swipeValues.value = {
        ...swipeValues.value,
        translateY: swipeValues.value.opened
          ? -MIN_BOTTOM + translationY
          : translationY,
        opacity: translationY > 0 ? 1 : differencePercentY / 100,
      };
    })
    .onFinalize(e => {
      const { translationY } = e;

      const wasSwipeUp = translationY < -30;
      const wasSwipeDown = translationY > 30;

      const openedState = {
        ...INITIAL_ANIMATED_STATE,
        translateY: -MIN_BOTTOM,
        opacity: 1,
        zIndex: 20,
        opened: true,
        paddingBottom: 20,
      };

      if (wasSwipeUp) {
        swipeValues.value = openedState;
      } else if (wasSwipeDown) {
        swipeValues.value = INITIAL_ANIMATED_STATE;
      } else if (swipeValues.value.opened) {
        swipeValues.value = openedState;
      } else {
        swipeValues.value = INITIAL_ANIMATED_STATE;
      }
    });

  const allGuidesCityCategories = uniq(
    flatten(city.guides?.map(({ categories }) => categories)).filter(
      im => !!im
    ) || []
  ).map(category => ({ title: category, count: 1 }));

  return (
    <Animated.View style={[styles.metaWrapper, animatedWrapperStyles]}>
      <GestureDetector gesture={gesture}>
        <View style={styles.swiperWrapper}>
          <View style={styles.swiper} />
        </View>
      </GestureDetector>
      <BackgroundGradient style={[styles.container]}>
        <Animated.View style={animatedMetaStyles}>
          <GestureDetector gesture={gesture}>
            <View style={styles.meta}>
              <CountryPill title={city.country.title} style={styles.top} />
              <CText style={styles.aboutText}>About city</CText>
              <CText style={styles.description} numberOfLines={5}>
                {city.description}
              </CText>
            </View>
          </GestureDetector>

          <Animated.View style={animatedHidedPartStyles}>
            <CityGuidesCategories
              categories={allGuidesCityCategories}
              style={styles.categories}
            />

            <GuidesSlideList
              guides={city.guides}
              country={city.country.title}
            />
          </Animated.View>
        </Animated.View>
      </BackgroundGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.colors.bg2,
    paddingHorizontal: 15,
    paddingTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  metaWrapper: {
    position: 'absolute',
    left: 0,
    width: '100%',
    paddingTop: 30,
    bottom: -MIN_BOTTOM,
  },
  top: {
    marginBottom: 25,
  },
  country: {
    fontFamily: FONTS.OpenSansSemiBold,
    marginLeft: 10,
  },
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginBottom: 15,
  },
  description: {
    lineHeight: 22,
  },
  meta: {},
  categories: {
    marginBottom: 30,
    marginTop: 30,
  },
  swiperWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
  },
  swiper: {
    width: 100,
    height: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
