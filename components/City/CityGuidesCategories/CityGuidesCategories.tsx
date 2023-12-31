import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { FONTS } from '@/types';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  categories: { title: string; count: number }[];
  style?: StyleProp<ViewStyle>;
};

export const CityGuidesCategories = ({ categories, style }: Props) => {
  return (
    <View style={style}>
      <CText style={styles.title}>Guide categories</CText>
      <ScrollView contentContainerStyle={styles.list} horizontal>
        {categories.map(({ title, count }) => {
          return (
            <Button key={title} outlined style={styles.category}>{`${title}${
              count ? `(${count})` : ''
            }`}</Button>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    // flexDirection: 'row',
  },
  category: {
    marginRight: 10,
  },
  title: {
    marginBottom: 15,
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 20,
  },
});
