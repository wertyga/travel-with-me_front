import { Dimensions, Image, View } from 'react-native';
import { GuidePreview } from '@/components/Guide/GuidePreview/GuidePreview';
import { Guide } from '@/types';
import { Carousel } from '@/components/Carousel';
import CarouselEx, {
  CarouselProperties,
  ParallaxImageStatic,
} from 'react-native-snap-carousel';
import * as React from 'react';
import { useRef } from 'react';

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

  return (
    <CarouselEx
      layout="stack"
      layoutCardOffset={9}
      ref={ref}
      data={guides as any}
      renderItem={({ item: guide }: { item: Guide }) => {
        return <GuidePreview key={guide._id} guide={guide} />;
      }}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      inactiveSlideShift={0}
      useScrollView={true}
    />
  );
};
