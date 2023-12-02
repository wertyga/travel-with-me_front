import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import { useAuth } from '@/context';
import { UserPreview } from '@/components/User/UserPreview/UserPreview';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export const Header = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const { logout, user } = useAuth();

  const isHome = route.name === 'Home';

  return (
    <View
      className={`flex-row justify-between w-full ${
        isHome ? 'bg-transparent' : 'bg-white'
      } px-4 pt-8 pb-3 items-center w-full mt-5 ${isHome ? 'absolute' : ''}`}
    >
      <View className="flex-row items-center">
        {back && (
          <TouchableOpacity className="mr-2" onPress={navigation.goBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text className={isHome ? 'text-white' : ''}>{title}</Text>
      </View>

      {!!user && (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={logout} className="mr-2">
            <Text className={`text-[12px] ${isHome ? 'text-white' : ''}`}>
              Logout
            </Text>
          </TouchableOpacity>
          <UserPreview user={user} />
        </View>
      )}

      {!user && (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className={`text-[12px] ${isHome ? 'text-white' : ''}`}>
            Sign in
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
