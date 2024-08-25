import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { GoToPayContentLink } from '@/components/GoToPayContentLink';

import { Guide } from '@/types';

import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { GuideMetaActions } from './GuideMetaActions';
import GuideMetaTitle from './GuideMetaTitle';

type Props = {
  guide: Guide;
  isFetching?: boolean;
};

export const GuideMetaComponent = ({ guide, isFetching }: Props) => {
  const { travelTime } = guide;
  const isRenderPointsList = !!guide.points?.length;

  return (
    <>
      <GuideMetaTitle guide={guide} isFetching={isFetching} />
      <GuideMetaActions travelTime={travelTime} guide={guide} />

      <CText style={{ marginBottom: 20 }}>{guide.description}</CText>

      <>
        {isRenderPointsList && (
          <GuidePointsList points={guide.points} guide={guide} />
        )}
      </>
    </>
  );
};

export const GuideMeta = observer(GuideMetaComponent);
