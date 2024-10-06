import * as React from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import { CountryPill } from '@/components/Country';
import { LikeAction } from '@/components/LikeAction';

import { Guide, SCREENS, SOCIAL_MODELS } from '@/types';

import { CONSTANTS, CUSTOM_VIEW_STYLES } from '@/styles/constants';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

const GuideMetaTitle = ({ guide, isFetching }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <BackButton style={styles.backButton} />
        <CountryPill
          title={guide.city.title}
          icon="map-point-small"
          href={SCREENS.City}
          hrefParams={{ city: guide.city }}
          contentStyle={styles.cityPill}
          rectangle
        />
      </View>

      <LikeAction
        modelType={SOCIAL_MODELS.Guide}
        _id={guide._id}
        initialLike={guide.likes}
        parentFetching={isFetching}
        style={styles.likeBtn}
      />
    </View>
  );
};

export default observer(GuideMetaTitle);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: -20,
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
  },
  leftSide: {
    flexDirection: 'row',
  },
  backButton: {
    ...CUSTOM_VIEW_STYLES.metaView.backBtn,
  },
  cityPill: {
    ...CUSTOM_VIEW_STYLES.metaView.cityPill,
  },
  likeBtn: {
    ...CUSTOM_VIEW_STYLES.metaView.likeBtn,
  },
});
