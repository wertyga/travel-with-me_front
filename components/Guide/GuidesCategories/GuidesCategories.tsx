import { ScrollView, Text } from 'react-native';

type Props = {
  selected: string[];
  onChange: (category: string) => void;
  categories: string[];
};

export const GuidesCategories = ({ selected, onChange, categories }: Props) => {
  const onPress = (category: string) => () => {
    onChange(category);
  };

  return (
    <ScrollView className="pt-3 pb-1" horizontal>
      {categories.map(category => (
        <Text
          key={category}
          onPress={onPress(category)}
          className={`pr-4 text-white font-bold ${
            selected.includes(category) ? 'opacity-100' : 'opacity-70'
          }`}
        >
          {category}
        </Text>
      ))}
    </ScrollView>
  );
};
