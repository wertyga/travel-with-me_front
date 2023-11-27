import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context';

type Props = {
  title: string;
  className?: string;
};

export const Header = ({ title, className = '' }: Props) => {
  const navi = useNavigation();
  const { logout, user } = useAuth();

  return (
    <View
      className={`flex-row justify-between w-full bg-transparent px-4 pt-8 pb-3 items-center ${className}`}
    >
      <Text>{title}</Text>
      <View>
        <TouchableOpacity
          onPress={!!user ? logout : () => navi.navigate('Login')}
        >
          <Text className="text-[12px] text-white">
            {!!user ? 'Logout' : 'Sign in'}
          </Text>
        </TouchableOpacity>
        {!!user && (
          <TouchableOpacity onPress={() => navi.navigate('ChangeEmail')}>
            <Text className="text-[12px] text-white">Change e-mail</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
