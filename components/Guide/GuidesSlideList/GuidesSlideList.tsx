import { ScrollView } from 'react-native';
import { Guide } from '@/types';
import { GuidePreview } from '../GuidePreview/GuidePreview';

type Props = {
  guides: Guide[];
  country: string;
};

export const GuidesSlideList = ({ guides, country }: Props) => {
  return (
    <ScrollView horizontal>
      {guides.map(guide => {
        return <GuidePreview guide={guide} key={guide._id} country={country} />;
      })}
    </ScrollView>
  );
};
