import * as React from 'react';

import { StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { GoToPayContentLink } from '@/components/GoToPayContentLink';

import { FONTS, Guide } from '@/types';

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

      <CText style={styles.aboutText} light>
        About the guide
      </CText>

      <GuideMetaActions travelTime={travelTime} guide={guide} />

      <CText style={{ marginBottom: 20 }} light>
        {guide.description}
      </CText>

      <>
        {isRenderPointsList && (
          <GuidePointsList points={guide.points} guide={guide} />
        )}
      </>
    </>
  );
};

export const GuideMeta = observer(GuideMetaComponent);

const styles = StyleSheet.create({
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginTop: 5,
    marginBottom: 10,
  },
});
