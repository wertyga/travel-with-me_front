import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import Button from '@/components/Button';
import { CityGuidesCategories } from '@/components/City/CityGuidesCategories/CityGuidesCategories';
import {
  CITY_TABS,
  DOM_VISITORS,
  TAG_STYLES,
  getCityMetaData,
  getGuidesCategories,
} from '@/components/City/CityScreenMeta/CityScreenMeta.utils';
import { CountryPill } from '@/components/Country';
import { GuidesSlideList } from '@/components/Guide';
import { useSelector } from '@/stores';
import { City, FONTS } from '@/types';

type Props = {
  city: City;
};

export const CityScreenMeta = ({ city }: Props) => {
  const { width } = useWindowDimensions();
  const layoutHeight = useSelector(
    ({ domStore }) => domStore?.layout?.height || 0
  );

  const [state, setState] = useState({
    filterByCategory: '',
    tabChosen: CITY_TABS[0],
  });

  const onChangeFilterByCategory = (filterByCategory: string) => () => {
    setState(prev => {
      return {
        ...prev,
        filterByCategory:
          prev.filterByCategory === filterByCategory ? '' : filterByCategory,
      };
    });
  };

  const onChangeTextData = (title: string) => () => {
    setState(prev => ({ ...prev, tabChosen: title }));
  };

  const guidesCityCategories = getGuidesCategories(city.guides);
  const filteredGuides = !state.filterByCategory
    ? city.guides
    : city.guides.filter(({ categories }) =>
        categories.includes(state.filterByCategory)
      );

  const cityMetaInfo = useMemo(() => {
    return getCityMetaData(city);
  }, [city]);

  const cityTabs = Object.keys(cityMetaInfo);

  return (
    <>
      <View style={styles.top}>
        <CountryPill title={city.country.title} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cityTabs.map(title => {
          return (
            <Button
              style={styles.aboutText}
              key={title}
              onPress={onChangeTextData(title)}
              outlined={state.tabChosen !== title}
            >
              {title}
            </Button>
          );
        })}
      </ScrollView>

      <RenderHtml
        contentWidth={width}
        source={{ html: (cityMetaInfo as any)[state.tabChosen]?.info }}
        tagsStyles={TAG_STYLES}
        domVisitors={DOM_VISITORS}
      />

      <>
        <CityGuidesCategories
          categories={guidesCityCategories}
          onCategoryPress={onChangeFilterByCategory}
          chosenCategory={state.filterByCategory}
          style={styles.categories}
        />

        <GuidesSlideList guides={filteredGuides} country={city.country.title} />
      </>
    </>
  );

  // return (
  //   <EntityMeta
  //     wrapperHeight={layoutHeight - 40}
  //     collapsedHeight={400}
  //     descriptionTextCutLines={8}
  //     withHeaderHide
  //     TopContent={
  //       <>
  //         <View style={styles.top}>
  //           <CountryPill title={city.country.title} />
  //         </View>
  //         <CText style={styles.aboutText}>About city</CText>
  //       </>
  //     }
  //     BottomContent={
  //       <>
  //         <CityGuidesCategories
  //           categories={guidesCityCategories}
  //           onCategoryPress={onChangeFilterByCategory}
  //           chosenCategory={state.filterByCategory}
  //           style={styles.categories}
  //         />
  //
  //         <GuidesSlideList
  //           guides={filteredGuides}
  //           country={city.country.title}
  //         />
  //         <GuidesSlideList
  //           guides={filteredGuides}
  //           country={city.country.title}
  //         />
  //         <GuidesSlideList
  //           guides={filteredGuides}
  //           country={city.country.title}
  //         />
  //       </>
  //     }
  //     description={city.description + city.description}
  //   />
  // );
};

const styles = StyleSheet.create({
  top: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  country: {
    fontFamily: FONTS.OpenSansSemiBold,
    marginLeft: 10,
  },
  aboutText: {
    marginBottom: 15,
    marginRight: 10,
  },
  aboutText_chosen: {
    textDecorationLine: 'underline',
  },
  categories: {
    marginBottom: 30,
    marginTop: 10,
  },
});
