import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ImageBackgroundWithGradient } from '@/components/Common';
import { CountryPill } from '@/components/Country';
import { PointDistance } from '@/components/Point';
import { useNavigation } from '@/hooks';

import { getHeight } from '@/utils';

import { Guide, Place, SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import PointPlaceholder from '@/assets/images/default_point_image.png';

type Props = {
  points: (Place & { distance?: string })[];
  guide: Guide;
};

export const GuidePointsList = ({ points }: Props) => {
  const navi = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ gap: 10 }}>
      {points.map(point => {
        return (
          <TouchableOpacity
            key={point._id}
            style={styles.point}
            onPress={() =>
              navi.navigate(SCREENS.Place, { placeSlug: point.slug })
            }
          >
            <ImageBackgroundWithGradient
              image={point.images[0] || PointPlaceholder}
              style={styles.imageWrapper}
            >
              {!!point.distance && (
                <PointDistance
                  distance={point.distance}
                  style={styles.distance}
                />
              )}
              <CountryPill title={point.title} style={styles.title} />
            </ImageBackgroundWithGradient>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  points: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  point: {
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: getHeight(56, CONSTANTS.spaces.paddingHorizontal * 2),
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
  },
  distance: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 50,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  chosen: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    padding: 3,
  },
  chosenTitle: {},
});
