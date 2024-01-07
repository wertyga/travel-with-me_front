import { StyleSheet, View } from 'react-native';
import { CountryPill } from '@/components/Country';
import { CText } from '@/components/CText';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { FONTS, Guide } from '@/types';
import { GuidePointsList } from '@/components/Guide/GuidePointsList/GuidePointsList';

type Props = {
  guide: Guide;
};

const META_HEIGHT = 550;

export const GuideMeta = ({ guide }: Props) => {
  const { travelTime } = guide;

  return (
    <EntityMeta
      wrapperHeight={META_HEIGHT}
      TopContent={
        <>
          <View style={styles.top}>
            {!!travelTime && <CountryPill title={travelTime} icon="clock" />}
            <CountryPill
              title={`${guide.pointsCount} points`}
              icon="map-point-small"
            />
          </View>

          <CText style={styles.aboutText}>About the guide</CText>
        </>
      }
      BottomContent={
        !!guide.points && (
          <>
            <CText style={{ ...styles.aboutText, ...styles.pointsTitle }}>
              Guide's points
            </CText>
            <GuidePointsList points={guide.points} />
          </>
        )
      }
      description={guide.description}
    />
  );
};

const styles = StyleSheet.create({
  meta: {
    flexDirection: 'row',
  },
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginBottom: 15,
  },
  pointsTitle: {
    marginTop: 15,
  },
  top: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },
});
