import { View } from 'react-native';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import { CountryPill } from '@/components/Country';
import { EntityMeta } from '@/components/EntityMeta/EntityMeta';
import { GoToPayContentLink } from '@/components/GoToPayContentLink';
import { GuidesSlideList } from '@/components/Guide';
import { useSubscription } from '@/hooks';
import { useSelector } from '@/stores';
import { Guide } from '@/types';
import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { GuideMetaActions } from './GuideMetaActions';
import { GuideMetaTitle } from './GuideMetaTitle';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

export const GuideMeta = ({ guide, isFetching }: Props) => {
  const { subscription } = useSubscription();
  const layoutHeight = useSelector(
    ({ domStore }) => domStore?.layout?.height || 0
  );

  const { travelTime } = guide;
  const isRenderPointsList = !!guide.points?.length && !!subscription;

  return (
    <>
      <GuideMetaTitle guide={guide} isFetching={isFetching} />
      <GuideMetaActions travelTime={travelTime} guide={guide} />

      <CText style={{ marginBottom: 20 }}>{guide.description}</CText>

      <>
        {!subscription && (
          <GoToPayContentLink high style={{ marginTop: 20, marginBottom: 30 }}>
            For more info get subscription
          </GoToPayContentLink>
        )}
        {isRenderPointsList && (
          <>
            <GuidePointsList points={guide.points} guide={guide} />
          </>
        )}
      </>
    </>
  );

  // return (
  //   <EntityMeta
  //     wrapperHeight={layoutHeight - 120}
  //     collapsedHeight={400}
  //     descriptionTextCutLines={8}
  //     underTopContentSlot={
  //       <GuideMetaActions travelTime={travelTime} guide={guide} />
  //     }
  //     TopContent={<GuideMetaTitle guide={guide} isFetching={isFetching} />}
  //     BottomContent={
  //       <>
  //         {!subscription && (
  //           <GoToPayContentLink
  //             high
  //             style={{ marginTop: 50, marginBottom: 30 }}
  //           >
  //             For more info get subscription
  //           </GoToPayContentLink>
  //         )}
  //         {isRenderPointsList && (
  //           <>
  //             <GuidePointsList points={guide.points} guide={guide} />
  //           </>
  //         )}
  //       </>
  //     }
  //     description={guide.description}
  //   />
  // );
};
