import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import { CountryPill } from '@/components/Country';
import { LikeAction } from '@/components/LikeAction';

import { Guide, SCREENS, SOCIAL_MODELS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

const GuideMetaTitle = ({ guide, isFetching }: Props) => {
  return (
    <View style={styles.title}>
      <BackButton transparent style={styles.leftSide}>
        <CountryPill
          title={guide.city.title}
          icon="map-point-small"
          href={SCREENS.City}
          hrefParams={{ city: guide.city }}
        />
      </BackButton>

      <LikeAction
        modelType={SOCIAL_MODELS.Guide}
        _id={guide._id}
        initialLike={guide.likes}
        parentFetching={isFetching}
      />
    </View>
  );
};

export default observer(GuideMetaTitle);

const styles = StyleSheet.create({
  leftSide: {
    flexDirection: 'row',
    marginLeft: -CONSTANTS.spaces.paddingHorizontal,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
