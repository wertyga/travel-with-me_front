import { View, Text, Button } from 'react-native';
import { useAuth } from '@/context';

type Props = {
  title: string;
  className?: string;
};

export const Header = ({ title, className = '' }: Props) => {
  const { logout } = useAuth();

  return (
    <View
      className={`flex-row justify-between w-full bg-transparent px-4 pt-8 pb-3 items-center ${className}`}
    >
      <Text>{title}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
