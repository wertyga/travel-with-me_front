import { View, Text, Button } from 'react-native';
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
      <Button
        title={!!user ? 'Logout' : 'Sign in'}
        onPress={!!user ? logout : () => navi.navigate('Login')}
      />
    </View>
  );
};
