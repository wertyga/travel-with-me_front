import * as React from 'react';

import { Linking, StyleSheet, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import { AudioContainer } from '@/components/Audio';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { StarRating } from '@/components/Common/StarRating/StarRating';
import { CountryPill } from '@/components/Country';
import { LikeAction } from '@/components/LikeAction';
import { gotoPointDirection } from '@/components/Point/PointGoToDirection/PointGoToDirection.utils';
import { Expander } from '@/components/UI/Expander';

import { FONTS, Place, SCREENS, SOCIAL_MODELS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import PointGoToDirection from '../PointGoToDirection/PointGoToDirection';

type Props = {
  point: Place;
  isFetching?: boolean;
};

const META_TEXT = {
  description: {
    title: 'About the point',
  },
  story: {
    title: 'The story',
  },
  contact: {
    title: 'Contact',
  },
};

export const PointMeta = ({ point, isFetching }: Props) => {
  const {
    city: { title: cityTitle },
    address,
    phone,
    email,
    website,
    rating,
    workTime,
  } = point;

  const contactData = {
    phone,
    email,
    website,
    workTime,
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.nameAndLike}>
          <BackButton transparent />
          <CountryPill
            title={cityTitle}
            icon="map-point-small"
            href={SCREENS.City}
            hrefParams={{ city: point.city }}
          />

          <StarRating rating={rating} />
        </View>

        <LikeAction
          modelType={SOCIAL_MODELS.Place}
          _id={point._id}
          initialLike={point.likes}
          parentFetching={isFetching}
        />
      </View>

      <View style={styles.address}>
        {!!address && (
          <Button
            onPress={() => gotoPointDirection(point)}
            style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
          >
            <MaterialIcons name="directions" size={24} color="white" />
            <CText style={styles.directionText} numberOfLines={2} light>
              {address}
            </CText>
          </Button>
        )}
        {!address && <PointGoToDirection point={point} />}
      </View>

      <View style={styles.titles}>
        <Expander title={META_TEXT.description.title} defaultState={true} light>
          <CText light>{point.description}</CText>
        </Expander>
        <Expander
          title={META_TEXT.story.title}
          style={styles.aboutTextNext}
          light
        >
          <CText light>{point.story}</CText>
        </Expander>
        <Expander
          title={META_TEXT.contact.title}
          style={styles.aboutTextNext}
          light
        >
          {!!contactData.phone && (
            <CText
              light
              style={[styles.description]}
              onPress={() => {
                Linking.openURL(`tel:${contactData.phone}`);
              }}
            >{`Phone: ${contactData.phone}`}</CText>
          )}
          {!!contactData.email && (
            <CText
              light
              style={[styles.description]}
              onPress={() => {
                Linking.openURL(`mailto:${contactData.email}`);
              }}
            >{`E-mail: ${contactData.email}`}</CText>
          )}
          {!!contactData.website && (
            <CText
              light
              style={[styles.description]}
              onPress={() => {
                Linking.openURL(contactData.website);
              }}
            >{`Website: ${contactData.website}`}</CText>
          )}
        </Expander>
        {!!contactData.workTime?.length && (
          <Expander title="Work time" style={styles.aboutTextNext} light>
            {contactData.workTime.map(time => {
              return (
                <CText key={time} style={styles.description} light>
                  {time}
                </CText>
              );
            })}
          </Expander>
        )}
      </View>

      <>
        {!!point.audioStory && (
          <>
            <CText style={styles.aboutTitle} light>
              Audio play of the story
            </CText>
            <AudioContainer
              audioUrl={point.audioStory}
              title={point.title}
              checkTitles
              defaultOpenState={true}
            />
          </>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
    paddingTop: 10,
    paddingBottom: 20,
  },
  nameAndLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -CONSTANTS.spaces.paddingHorizontal,
  },
  galleryAction: {
    width: 35,
    height: 35,
  },
  aboutTitle: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    paddingVertical: 10,
  },
  aboutTextNext: {
    borderTopColor: 'transparent',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titles: {
    marginBottom: 20,
  },
  activeTitle: {
    textDecorationLine: 'underline',
  },
  description: {
    marginBottom: 20,
  },
  directionText: {
    fontSize: 14,
    fontFamily: FONTS.OpenSansSemiBold,
    marginLeft: 7,
    paddingRight: 10,
  },
  address: {
    marginBottom: 20,
    overflow: 'hidden',
  },
});
