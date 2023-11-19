import { ScrollView, Text, View } from 'react-native';
import { GuidePreview } from '@/components/Guide/GuidePreview/GuidePreview';
import { Guide } from '@/types';
import CarouselEx from 'react-native-snap-carousel';
import { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  guides: Guide[];
  sliderWidth: number;
  itemWidth: number;
};

export const GuidesPreviewsList = ({
  guides,
  sliderWidth,
  itemWidth,
}: Props) => {
  const ref = useRef();
  const [state, setState] = useState({
    index: 0,
    guidesCategories: guides[0].categories,
  });

  const onSnapToItem = (index: number) => {
    setState(prev => ({
      ...prev,
      guidesCategories: guides[index].categories,
      index,
    }));
  };

  return (
    <View className="w-full pb-1">
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)']}
        className="pl-4 pb-1 pt-2"
      >
        <ScrollView horizontal key={state.index}>
          {state.guidesCategories.map((category, i) => (
            <Text
              key={`${category}-${i}`}
              className="text-white font-bold pr-3"
            >
              {category}
            </Text>
          ))}
        </ScrollView>
      </LinearGradient>

      <LinearGradient
        colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
        className="h-full"
      >
        <View className="items-center">
          <CarouselEx
            layout="stack"
            onSnapToItem={onSnapToItem}
            ref={ref}
            data={guides as any}
            renderItem={({ item: guide }: { item: Guide }) => {
              return <GuidePreview key={guide._id} guide={guide} />;
            }}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
