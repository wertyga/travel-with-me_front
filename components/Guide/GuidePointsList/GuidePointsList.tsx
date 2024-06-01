import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CText } from '@/components/CText';
import { ImageBackgroundWithGradient } from '@/components/Common';
import { CountryPill } from '@/components/Country';
import { FastImage } from '@/components/Image';
import { PointDistance } from '@/components/Point';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { useNavigation } from '@/hooks';
import { getHeight } from '@/utils';
import { Guide, Place, SCREENS } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import GuidePlaceholder from '@/assets/images/guide_placeholder.png';

type Props = {
  points: (Place & { distance?: string })[];
  guide: Guide;
};

const POINT_SIZE = 150;

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
              image={point.images[0] || GuidePlaceholder}
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

  // return (
  //   <ScrollHorizontalNoEdges
  //     contentContainerStyle={styles.points}
  //     edge={CONSTANTS.spaces.paddingHorizontal}
  //   >
  //     {points.map(point => {
  //       return (
  //         <TouchableOpacity
  //           key={point._id}
  //           style={styles.point}
  //           onPress={() =>
  //             navi.navigate(SCREENS.Place, { placeSlug: point.slug })
  //           }
  //         >
  //           <View style={styles.imageWrapper}>
  //             <FastImage
  //               uri={point.images[0] || GuidePlaceholder}
  //               style={styles.image}
  //             />
  //             {!!point.distance && (
  //               <PointDistance
  //                 distance={point.distance}
  //                 style={styles.distance}
  //               />
  //             )}
  //           </View>
  //           <CText style={styles.title} numberOfLines={2}>
  //             {point.title}
  //           </CText>
  //         </TouchableOpacity>
  //       );
  //     })}
  //   </ScrollHorizontalNoEdges>
  // );
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
    // width: POINT_SIZE,
    // height: POINT_SIZE,
    // borderRadius: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    // borderRadius: 50,
    objectFit: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    // maxWidth: POINT_SIZE,
    // textAlign: 'center',
  },
  distance: {
    position: 'absolute',
    left: 0,
    top: 0,
    // width: POINT_SIZE,
    // height: POINT_SIZE,
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
