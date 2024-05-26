import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { Guide } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { GuidePreview } from '../GuidePreview/GuidePreview';

type Props = {
  guides: Guide[];
  country: string;
};

export const GuidesSlideList = ({ guides, country }: Props) => {
  return (
    <ScrollHorizontalNoEdges edge={CONSTANTS.spaces.paddingHorizontal}>
      {guides.map(guide => {
        return <GuidePreview guide={guide} key={guide._id} country={country} />;
      })}
    </ScrollHorizontalNoEdges>
  );
};
