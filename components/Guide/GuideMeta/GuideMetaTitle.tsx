import { CText } from '@/components/CText';
import { LikeAction } from '@/components/LikeAction';
import { FONTS, Guide, SOCIAL_MODELS } from '@/types';
import { StyleSheet, View } from 'react-native';

type Props = {
  guide: Guide;
  isFetching: boolean;
};

export const GuideMetaTitle = ({ guide, isFetching }: Props) => {
  return (
    <View style={styles.title}>
      <CText style={styles.aboutText}>About the guide</CText>
      <LikeAction
        modelType={SOCIAL_MODELS.Guide}
        _id={guide._id}
        initialLike={guide.likes}
        parentFetching={isFetching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  aboutText: {
    fontFamily: FONTS.CrimsonSemiBold,
    fontSize: 22,
    marginTop: -5,
  },
});
