import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { Tabs } from '@/components/UI/Tabs';

import { Guide } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import { GuidePointsList } from '../GuidePointsList/GuidePointsList';
import { GuideMetaActions } from './GuideMetaActions';
import GuideMetaTitle from './GuideMetaTitle';

type Props = {
  guide: Guide;
  isFetching?: boolean;
};

const TABS = ['Points', 'Info'];

export const GuideMetaComponent = ({ guide, isFetching }: Props) => {
  const { travelTime } = guide;
  const isRenderPointsList = !!guide.points?.length;

  return (
    <View style={styles.container}>
      <GuideMetaTitle guide={guide} isFetching={isFetching} />

      <GuideMetaActions travelTime={travelTime} guide={guide} />

      <Tabs tabs={TABS} tabTextProps={{ light: true }} style={styles.tabs}>
        {[
          <View key={TABS[0]}>
            {isRenderPointsList && (
              <GuidePointsList points={guide.points} guide={guide} />
            )}
          </View>,
          <CText light key={TABS[1]}>
            {guide.description}
          </CText>,
        ]}
      </Tabs>
    </View>
  );
};

export const GuideMeta = observer(GuideMetaComponent);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 40,
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
  },
  tabs: {
    marginTop: 20,
  },
});
