import {
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SearchTotal } from '@/components/SearchTotal';
import { SafeLoader } from '@/components/SafeLoader';
import { Carousel } from '@/components/Carousel';
import { useLazyGetCitiesQuery } from '@/api';
import { City, Guide, SORT_BY, SORT_DIRECTION } from '@/types';
import { getSortAndPaginationParams } from '@/utils/query';
import uniq from 'lodash/uniq';
import { navigateToError } from '@/utils';
import { GuidesPreviewsList } from '@/components/Guide';
import { LinearGradient } from 'expo-linear-gradient';

const PER_REQUEST_CITIES_LIMIT = 10;

const Home = ({ route }) => {
  const navi = useNavigation();
  const [state, setState] = useState<
    { currentCity: City; guides: Guide[]; guidesCategories: string[] } & {
      [key: string]: any;
    }
  >({
    page: 1,
    currentCity: {} as City,
    guides: [],
    guidesCategories: [],
  });

  const [
    fetchCities,
    { data: { cities = [], total = 0 } = {}, isLoading, error, refetch },
  ] = useLazyGetCitiesQuery();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const params = getSortAndPaginationParams(
        {
          sortBy: SORT_BY.CreatedAt,
          sortDirection: SORT_DIRECTION.DESC,
          page: state.page,
        } as any,
        PER_REQUEST_CITIES_LIMIT
      );

      fetchCities(params);
    }, [])
  );

  useEffect(() => {
    if (!error) return;

    navigateToError(navi, error);
  }, [error]);

  const onSnapToItem = (index: number) => {
    if (!cities[index]) return;

    setState(prev => ({
      ...prev,
      currentCity: cities[index],
      guides: cities[index].guides,
      guidesCategories: uniq(
        cities[index].guides
          ?.map(({ category }) => category)
          .filter(im => !!im) || []
      ),
    }));
  };

  useEffect(() => {
    if (!cities) return;

    onSnapToItem(0);
  }, [cities]);

  if (!state.currentCity) {
    return <SafeLoader />;
  }

  const citiesImages = cities.map(({ image }) => image);

  const {
    currentCity: { title },
    guides,
    guidesCategories,
  } = state;

  return (
    <SafeAreaView className="">
      <Carousel
        className="absolute top-0 left-0"
        images={citiesImages}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={onSnapToItem}
      />

      <View className="absolute w-full px-4">
        <SearchTotal />

        <Text className="text-white font-bold mt-6">{title}</Text>
      </View>

      <View className="absolute bottom-0 left-0">
        <LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.6)']}>
          <ScrollView className="space-x-4 mx-4 py-2 pr-2 pt-2" horizontal>
            {guidesCategories.map(category => (
              <Text key={category} className="text-white font-bold">
                {category}
              </Text>
            ))}
          </ScrollView>

          <View className="h-60 px-2 mb-1 items-center">
            <GuidesPreviewsList
              key={title}
              guides={guides}
              sliderWidth={Dimensions.get('window').width - 20}
              itemWidth={Dimensions.get('window').width - 20}
            />
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default Home;
