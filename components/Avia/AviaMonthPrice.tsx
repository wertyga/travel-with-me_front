import { useEffect, useState } from 'react';

import { Linking, StyleSheet, View, ViewStyle } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { observer } from 'mobx-react-lite';

import { sendLogs } from '@/api';
import { fetchAviaMonthPriceMatrix } from '@/api/avia.api';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { useStores } from '@/hooks';

import { DateUnit, getCurrencyMeta } from '@/utils';
import { cacheWrap } from '@/utils/cache_request';

import { CURRENCY, City, FONTS, PriceMatrixItem } from '@/types';

import { CONSTANTS } from '@/styles/constants';

const AVIASALES_AFF_LINK =
  'https://tp.media/click?shmarker=577952&promo_id=5457&source_type=link&type=click&campaign_id=100&trs=355995';

type Props = {
  style?: ViewStyle;
  destinationCity: string;
};

export const AviaMonthPrice = observer(({ style, destinationCity }: Props) => {
  const { liveCoords, isNetConnected } = useStores(stores => {
    return {
      liveCoords: stores.locationStore.liveCoords,
      isNetConnected: stores.appStateStore.isNetConnected,
    };
  });

  const [state, setState] = useState<{
    data: PriceMatrixItem[];
    currency: CURRENCY;
    originCity: City | null;
  }>({ data: [], currency: CURRENCY.Eur, originCity: null });

  const fetchMonthPriceMatrix = async (destinationCity: string) => {
    setState({
      data: [],
      currency: CURRENCY.Eur,
      originCity: null,
    });

    try {
      const { data, currency, originCity } = await cacheWrap(
        fetchAviaMonthPriceMatrix,
        {
          originCoords: liveCoords,
          destination: destinationCity,
        },
        {
          expireIn: DateUnit.oneSecond,
        }
      ).invoke();

      setState({
        data: data,
        currency,
        originCity,
      });
    } catch (e) {
      await sendLogs(e);
    }
  };

  useEffect(() => {
    if (!isNetConnected || !liveCoords || !destinationCity) return;

    fetchMonthPriceMatrix(destinationCity);
  }, [isNetConnected, destinationCity]);

  if (!isNetConnected || !liveCoords || !state.data.length) return null;

  return (
    <View style={style}>
      <View style={styles.title}>
        <MaterialIcons
          name="flight-takeoff"
          size={24}
          color={CONSTANTS.colors.typographyLight}
        />
        {!!state.originCity && (
          <CText
            light
          >{`${state.originCity?.title} - ${destinationCity}`}</CText>
        )}
      </View>
      <ScrollHorizontalNoEdges
        edge={CONSTANTS.spaces.paddingHorizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {state.data.map(item => {
          const date = new Date(item.depart_date)
            .toDateString()
            .split(' ')
            .slice(0, 3)
            .join(' ');
          return (
            <Button
              key={`${item.depart_date}_${item.gate}_${item.value}`}
              noPaddings
              style={styles.item}
              rectangle
              onPress={() => {
                Linking.openURL(AVIASALES_AFF_LINK);
              }}
            >
              <View style={styles.price}>
                <CText
                  light
                  style={styles.priceNumber}
                >{`${item.value}`}</CText>
                <CText
                  light
                  style={styles.priceCurrency}
                >{`${getCurrencyMeta(state.currency).sign}`}</CText>
              </View>
              <CText light style={styles.date}>{`${date}`}</CText>
            </Button>
          );
        })}
      </ScrollHorizontalNoEdges>
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  scrollContent: {
    gap: 10,
  },
  item: {
    width: 100,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: 5,
    paddingHorizontal: 5,
    paddingLeft: 10,
  },
  price: {
    flexDirection: 'row',
    gap: 3,
  },
  priceNumber: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 20,
  },
  priceCurrency: {
    fontFamily: FONTS.CrimsonSemiBold,
    alignSelf: 'flex-end',
    marginBottom: 1,
  },
  date: {
    fontSize: 12,
  },
});
