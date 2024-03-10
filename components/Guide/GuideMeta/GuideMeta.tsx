import { Dimensions, StyleSheet } from 'react-native';
import { CText } from '@/components/CText';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { FONTS, Guide, SCREENS } from '@/types';
import { useSubscription } from '@/hooks';
import { GoToPayContentLink } from '@/components/GoToPayContentLink';
import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { GuideMetaActions } from './GuideMetaActions';
import { GuideMetaTitle } from './GuideMetaTitle';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

const { height } = Dimensions.get('window');
const META_HEIGHT = height - 120;

export const GuideMeta = ({ guide, isFetching }: Props) => {
  const { subscription } = useSubscription();

  const { travelTime } = guide;
  const isRenderPointsList = !!guide.points?.length && !!subscription;

  return (
    <EntityMeta
      wrapperHeight={META_HEIGHT}
      collapsedHeight={300}
      underTopContentSlot={
        <GuideMetaActions travelTime={travelTime} guide={guide} />
      }
      TopContent={<GuideMetaTitle guide={guide} isFetching={isFetching} />}
      BottomContent={
        <>
          {!subscription && (
            <GoToPayContentLink high style={{ marginTop: 50 }}>
              For more info get subscription
            </GoToPayContentLink>
          )}
          {isRenderPointsList && (
            <>
              {/*<CText style={{ ...styles.aboutText, ...styles.pointsTitle }}>*/}
              {/*  Guide's points*/}
              {/*</CText>*/}
              <GuidePointsList points={guide.points} guide={guide} />
            </>
          )}
        </>
      }
      description={guide.description + guide.description}
    />
  );
};

const styles = StyleSheet.create({
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginRight: 15,
  },
  pointsTitle: {
    marginTop: 10,
  },
});
