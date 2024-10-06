import { StyleSheet, View } from 'react-native';

import { CText } from '@/components/CText';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';

import { FONTS, Guide } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import { GuidePreview } from '../GuidePreview/GuidePreview';

type Props = {
  guides: Guide[];
  country: string;
  title?: string;
};

export const GuidesSlideList = ({ guides, country, title }: Props) => {
  return (
    <View>
      {!!title && (
        <CText style={styles.title} light>
          {title}
        </CText>
      )}
      <ScrollHorizontalNoEdges edge={CONSTANTS.spaces.paddingHorizontal}>
        {guides.map(guide => {
          return (
            <GuidePreview guide={guide} key={guide._id} country={country} />
          );
        })}
      </ScrollHorizontalNoEdges>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 15,
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
  },
});
