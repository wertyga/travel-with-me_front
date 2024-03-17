import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { Guide } from '@/types';
import { useSubscription } from '@/hooks';
import { GoToPayContentLink } from '@/components/GoToPayContentLink';
import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { GuideMetaActions } from './GuideMetaActions';
import { GuideMetaTitle } from './GuideMetaTitle';
import { useSelector } from '@/stores';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

export const GuideMeta = ({ guide, isFetching }: Props) => {
  const { subscription } = useSubscription();
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);

  const { travelTime } = guide;
  const isRenderPointsList = !!guide.points?.length && !!subscription;

  return (
    <EntityMeta
      wrapperHeight={layoutHeight - 120}
      collapsedHeight={400}
      descriptionTextCutLines={8}
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
              <GuidePointsList points={guide.points} guide={guide} />
            </>
          )}
        </>
      }
      description={guide.description}
    />
  );
};
