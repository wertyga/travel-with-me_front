import { StyleSheet, View, ViewStyle } from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';

import { FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  categories: Record<string, number>;
  chosenCategory?: string;
  style?: StyleProp<ViewStyle>;
  onCategoryPress: (category: string) => () => void;
};

export const CityGuidesCategories = ({
  categories,
  style,
  onCategoryPress = () => () => {},
  chosenCategory,
}: Props) => {
  return (
    <View style={style}>
      <CText style={styles.title} light>
        Guide categories
      </CText>

      <ScrollHorizontalNoEdges edge={CONSTANTS.spaces.paddingHorizontal}>
        {Object.entries(categories).map(([title, count]) => {
          return (
            <Button
              key={title}
              outlined={title !== chosenCategory}
              style={styles.category}
              onPress={onCategoryPress(title)}
            >{`${title}${count ? ` (${count})` : ''}`}</Button>
          );
        })}
      </ScrollHorizontalNoEdges>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    marginRight: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 15,
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
  },
});
