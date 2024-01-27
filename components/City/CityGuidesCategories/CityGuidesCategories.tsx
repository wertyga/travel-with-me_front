import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { FONTS } from '@/types';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

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
      <CText style={styles.title}>Guide categories</CText>
      <ScrollView contentContainerStyle={styles.list} horizontal>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {},
  category: {
    marginRight: 10,
  },
  title: {
    marginBottom: 15,
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 20,
  },
});
