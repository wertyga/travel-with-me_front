import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import CarouselEx from 'react-native-snap-carousel';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { MapBoxView } from '@/components/Map';
import { useForegroundPermissions, useStores } from '@/hooks';

import { FONTS, Guide, Place, SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import GuideMapPointPreview from './GuideMapPointPreview';
import { PointImagesCarousel } from './PointImagesCarousel';

type Props = {
  toggleHideHeader: (value?: boolean) => void;
};

export const MAP_MARKER_SIZE = 40;
export const ELEMENTS_ON_THE_TOP_OF_PREVIEW_POSITION = 230;

const GuideMap = ({ toggleHideHeader }: Props) => {
  const router = useRoute();
  const carouselRef = useRef<CarouselEx<Guide> | null>(null);

  const { status } = useForegroundPermissions();

  const isCitySource = (router.params as any)?.pointSource === 'city';

  const { visiblePoint, isFollowingToGuide, guide, points } = useStores(
    stores => {
      return {
        visiblePoint: stores.guideStore.visiblePoint,
        guide: stores.guideStore.guide,
        points:
          (isCitySource
            ? stores.cityStore.currentCityPlaces
            : stores.guideStore.guide?.points) || [],
        isFollowingToGuide: stores.guideStore.isFollowingToGuide,
      };
    }
  );

  const [state, setState] = useState({
    pointShowing: undefined,
    isShowCarouselImages: false,
    isAudioPlaying: false,
    isBgPermissionDenied: false,
  });

  const onPointChoose = (point: Place & { image: string }) => {
    const pointIndex = points.findIndex(p => p._id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false);

    if (state.pointShowing?._id !== point._id) {
      setState(prev => ({
        ...prev,
        pointShowing: point,
      }));
    }
  };

  const handleSlideToPoint = (point: Place) => {
    const pointIndex = points.findIndex(({ _id }) => _id === point._id);
    carouselRef.current?.snapToItem(pointIndex, false, false);
  };

  const onToggleCarouselShow = (value?: boolean) => {
    setState(prev => ({
      ...prev,
      isShowCarouselImages:
        typeof value !== 'boolean' ? value : !prev.isShowCarouselImages,
    }));
  };

  useEffect(() => {
    if (!visiblePoint || !isFollowingToGuide) return;

    const fulfilledPoint = points.find(({ _id }) => _id === visiblePoint?._id);
    setState(prev => ({
      ...prev,
      pointShowing: fulfilledPoint || visiblePoint,
      isShowCarouselImages: true,
    }));
    handleSlideToPoint(visiblePoint);
  }, [visiblePoint?._id, isFollowingToGuide, guide]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      pointShowing: points[0],
    }));
  }, [guide, isCitySource]);

  const actualPoints = useMemo(() => {
    return points.map(({ images, ...pointProps }) => {
      return {
        image: images[0],
        images,
        ...pointProps,
      };
    });
  }, [points]);

  const isLocationDenied = status === 'denied';

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <MapBoxView
        points={actualPoints}
        zoomLevel={14}
        onPress={onPointChoose}
        isShowMyLocation
        showMyLocationBtnStyle={styles.showMyLocationBtnStyle}
        initialCoords={[
          state.pointShowing?.coords.lng || 0,
          state.pointShowing?.coords.lat || 0,
        ]}
      >
        {isLocationDenied && (
          <Button style={styles.accessReminder} href={SCREENS.Profile}>
            You have disabled access to your location to follow the guide. You
            can grant the access back in your profile menu
          </Button>
        )}
      </MapBoxView>

      {!!state.pointShowing && (
        <GuideMapPointPreview
          point={state.pointShowing}
          points={points}
          onPointChange={onPointChoose}
          onOpenGallery={() => onToggleCarouselShow(true)}
          toggleHideHeader={toggleHideHeader}
        />
      )}

      {state.isShowCarouselImages && !!state.pointShowing && (
        <PointImagesCarousel
          point={state.pointShowing}
          onClose={onToggleCarouselShow}
        />
      )}
    </View>
  );
};

export default observer(GuideMap);

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  showMyLocationBtnStyle: {
    bottom: ELEMENTS_ON_THE_TOP_OF_PREVIEW_POSITION,
  },
  mapActions: {
    position: 'absolute',
    top: CONSTANTS.spaces.paddingTop + 50,
    paddingHorizontal: 10,
  },
  pointActions: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  mapWithChosenPoint: {
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
  },
  soundBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    backgroundColor: CONSTANTS.colors.bgLight,
    position: 'absolute',
    bottom: 9,
    left: 10,
  },
  accessReminder: {
    color: CONSTANTS.colors.bgLight,
    fontFamily: FONTS.OpenSansBold,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginHorizontal: 5,
    fontSize: 13,
    position: 'absolute',
    top: 80,
  },
});
