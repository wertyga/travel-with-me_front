import { StyleSheet, View, Dimensions } from 'react-native';
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
import { useRef, useState } from 'react';

type Props = {
  city: City;
};

const UPPER_CONTENT_HEIGHT = 330;
const MIN_BOTTOM = 380;
const ONE_PERCENT = Math.abs(MIN_BOTTOM) / 100;

export const CityScreenMeta = ({ city }: Props) => {
  const windowHeight = useRef(Dimensions.get('window').height);
  const maxTranslate = windowHeight.current - 20;

  const refState = useRef({
    initialState: {
      translateY: 0,
      opacity: 0,
      zIndex: 0,
      opened: false,
    },
    openedState: {
      translateY: -maxTranslate + UPPER_CONTENT_HEIGHT,
      opacity: 1,
      zIndex: 20,
      opened: true,
    },
  });

  const [opened, setOpened] = useState(false);
  const swipeValues = useSharedValue(refState.current.initialState);

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
  const animatedScrollViewStyles = useAnimatedStyle(() => {
    return {
      flex: 1,
      maxHeight: swipeValues.value.opened ? undefined : 110,
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
          ? refState.current.openedState.translateY + translationY
          : translationY,
        opacity: translationY > 0 ? 1 : differencePercentY / 100,
      };
    })
    .onFinalize(e => {
      const { translationY } = e;

      const wasSwipeUpAndShouldBeOpened = translationY < -30;
      const wasSwipeDownAndShouldBeClosed = translationY > 30;

      if (wasSwipeUpAndShouldBeOpened) {
        swipeValues.value = refState.current.openedState;
      } else if (wasSwipeDownAndShouldBeClosed) {
        swipeValues.value = refState.current.initialState;
      } else if (swipeValues.value.opened) {
        swipeValues.value = refState.current.openedState;
      } else {
        swipeValues.value = refState.current.initialState;
      }
    });

  const allGuidesCityCategories = uniq(
    flatten(city.guides?.map(({ categories }) => categories)).filter(
      im => !!im
    ) || []
  ).map(category => ({ title: category, count: 1 }));

  return (
    <Animated.View style={[styles.metaWrapper, animatedWrapperStyles]}>
      {/*<GestureDetector gesture={gesture}>*/}
      {/*  <View style={styles.swiperWrapper}>*/}
      {/*    <View style={styles.swiper} />*/}
      {/*  </View>*/}
      {/*</GestureDetector>*/}
      <BackgroundGradient style={[styles.container]}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
            paddingBottom: 30,
          }}
        >
          <View style={styles.swiperWrapper}>
            <View style={styles.swiper} />
          </View>
          <View style={{ flex: 1 }}>
            <GestureDetector gesture={gesture}>
              <View style={styles.meta}>
                <CountryPill title={city.country.title} style={styles.top} />
                <CText style={styles.aboutText}>About city</CText>
              </View>
            </GestureDetector>

            <Animated.ScrollView style={animatedScrollViewStyles}>
              <CText style={styles.description}>
                {city.description + city.description + city.description}
              </CText>
            </Animated.ScrollView>
          </View>

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
        </View>
      </BackgroundGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.colors.bg2,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: Dimensions.get('window').height - 20,
  },
  metaWrapper: {
    position: 'absolute',
    left: 0,
    width: '100%',
    paddingTop: 30,
    bottom: -Dimensions.get('window').height + UPPER_CONTENT_HEIGHT,
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
    color: 'white',
    fontFamily: FONTS.OpenSans,
  },
  meta: {
    paddingTop: 10,
  },
  categories: {
    marginBottom: 30,
    marginTop: 30,
  },
  swiperWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
    marginTop: 10,
  },
  swiper: {
    width: 100,
    height: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
