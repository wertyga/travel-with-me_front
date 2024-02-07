import { Guide } from '@/types';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  guide: Guide;
};

export const GuideShallowOverview = ({ guide }: Props) => {
  const { title, description } = guide;

  return (
    <View>
      <Text className="text-white text-[20px] font-bold mb-4">{title}</Text>
      <Text className="text-white mb-4" style={styles.text}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 20,
  },
});
