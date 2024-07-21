import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { CountryPill } from '@/components/Country';
import { LikeAction } from '@/components/LikeAction';

import { FONTS, Guide, SOCIAL_MODELS } from '@/types';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

const GuideMetaTitle = ({ guide, isFetching }: Props) => {
  return (
    <View style={styles.title}>
      <View>
        <CountryPill title={guide.city.title} icon="map-point-small" />
        <CText style={styles.aboutText}>About the guide</CText>
      </View>

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
  title: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginTop: 5,
    marginBottom: 10,
  },
});
