import { TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { CText } from '@/components/CText';
import GuidePlaceholder from '@/assets/images/guide_placeholder.png';
import { Place, SCREENS } from '@/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  points: Place[];
};

export const GuidePointsList = ({ points }: Props) => {
  const navi = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.points} horizontal>
      {points.map(point => {
        return (
          <TouchableOpacity
            key={point._id}
            style={styles.point}
            onPress={() =>
              navi.navigate(SCREENS.Place, { placeSlug: point.slug })
            }
          >
            <Image
              source={
                point.images[0] ? { uri: point.images[0] } : GuidePlaceholder
              }
              style={styles.image}
            />
            <CText style={styles.title} numberOfLines={2}>
              {point.title}
            </CText>
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
  },
  point: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    objectFit: 'cover',
  },
  title: {
    marginTop: 10,
    maxWidth: 100,
    textAlign: 'center',
  },
});
