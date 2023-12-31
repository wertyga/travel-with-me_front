import { View } from 'react-native';
import Button from '@/components/Button';

type Props = {
  categories: { title: string; count: number }[];
};

export const CityGuidesCategories = ({ categories }: Props) => {
  return (
    <View>
      {categories.map(({ title, count }) => {
        return (
          <Button key={title}>{`${title}${count ? `(${count})` : ''}`}</Button>
        );
      })}
    </View>
  );
};
