import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { observer } from 'mobx-react-lite';

import { BackgroundGradient } from '@/components/BackgroundGradient';
import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { useStores } from '@/hooks';
import { FastImage } from 'components/FastImage';

import { CONSTANTS } from '@/styles/constants';

import { Props as MainLayoutProps } from '../MainLayout';

type Props = Pick<
  MainLayoutProps,
  'onBgPress' | 'bgImage' | 'bgContent' | 'bgColors'
> & {};

export const BgContent = observer(
  ({ onBgPress, bgImage, bgContent, bgColors }: Props) => {
    const { layoutHeight } = useStores(stores => ({
      layoutHeight: stores.domStore.layoutHeight,
    }));

    if (!!bgContent) {
      return <View style={styles.bgImage}>{bgContent}</View>;
    }

    if (!bgImage) {
      return <BackgroundGradient style={styles.bgGradient} colors={bgColors} />;
    }

    const Wrapper: any = !!onBgPress ? TouchableOpacity : View;
    const style = [StyleSheet.absoluteFillObject, { height: layoutHeight }];
    const wrapperProps = !!onBgPress
      ? {
          onPress: onBgPress,
          style,
          activeOpacity: 1,
        }
      : { style };

    return (
      <Wrapper {...wrapperProps}>
        <FastImage
          source={bgImage}
          style={styles.bgImage}
          mediaSize={MEDIA_SIZES.Big}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.01)']}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Wrapper>
    );
  }
);

const styles = StyleSheet.create({
  bgImage: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  bgGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: CONSTANTS.colors.bgDark2,
  },
});
