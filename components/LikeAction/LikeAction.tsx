import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { setLike } from '@/api';
import Button from '@/components/Button';
import { useStores } from '@/hooks';
import { Like, SOCIAL_MODELS } from '@/types';

type Props = {
  modelType: SOCIAL_MODELS;
  _id: string;
  initialLike: Like;
  parentFetching?: boolean;
};

export const LikeActionComponent = ({
  modelType,
  _id,
  initialLike: { isInteracted },
  parentFetching,
}: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState<Like>({ isInteracted, count: 0 });

  const { user } = useStores(stores => ({
    user: stores.userStore.user,
  }));

  const handleLike = async () => {
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Login first',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await setLike({ modelType, _id });

      if (response) {
        setState(response);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
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
        name={state.isInteracted ? 'cards-heart' : 'cards-heart-outline'}
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

export const LikeAction = observer(LikeActionComponent);
