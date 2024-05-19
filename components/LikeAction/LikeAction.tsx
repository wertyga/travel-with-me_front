import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSetLikeMutation } from '@/api';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/context';
import { Like, SOCIAL_MODELS } from '@/types';

type Props = {
  modelType: SOCIAL_MODELS;
  _id: string;
  initialLike: Like;
  parentFetching?: boolean;
};

export const LikeAction = ({
  modelType,
  _id,
  initialLike: { isInteracted },
  parentFetching,
}: Props) => {
  const { user } = useAuth();

  const [setLike, { isLoading }] = useSetLikeMutation();

  const handleLike = async () => {
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Login first',
      });
      return;
    }
    await setLike({ modelType, _id });
  };

  return (
    <Button
      rectangle
      style={styles.btn}
      disabled={isLoading || parentFetching}
      onPress={handleLike}
      noPaddings
    >
      <MaterialCommunityIcons
        name={isInteracted ? 'cards-heart' : 'cards-heart-outline'}
        size={24}
        color="white"
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
