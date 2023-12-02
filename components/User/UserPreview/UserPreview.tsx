import { View, Image } from 'react-native';
import { User } from '@/types/user';
import DefaultAvatar from '@/assets/images/avatar.jpg';

type Props = {
  user: User;
};

export const UserPreview = ({ user }: Props) => {
  return (
    <View>
      <Image
        source={user.avatar ? { uri: user.avatar } : DefaultAvatar}
        className="rounded-full object-cover w-5 h-5 bg-green-50"
      />
    </View>
  );
};
