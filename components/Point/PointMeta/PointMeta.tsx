import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { StyleSheet, View } from 'react-native';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { AudioPlayer } from '@/components/AudioPlayer';
import { FONTS, Place } from '@/types';

type Props = {
  point: Place;
};

export const PointMeta = ({ point }: Props) => {
  const {
    city: { title: cityTitle },
    description,
  } = point;

  return (
    <EntityMeta
      TopContent={
        <>
          <View style={styles.top}>
            <CountryPill title={cityTitle} icon="map-point-small" />
          </View>

          <CText style={styles.aboutText}>About the point</CText>
        </>
      }
      description={description}
      BottomContent={
        <>
          <CText style={styles.aboutText}>Audio play of the story</CText>
          <AudioPlayer audioUrl="https://travelwithme.b-cdn.net/audio/Anne%20Frank%20House_%5Bru%5D.mp3" />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  description: {},
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginBottom: 15,
  },
  top: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },
});
