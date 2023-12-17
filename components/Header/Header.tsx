import { View, Text, TouchableOpacity } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { useAuth } from '@/context';
import { UserPreview } from '@/components/User/UserPreview/UserPreview';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export const fullImageScreens = ['Home', 'Guide'];

export const Header = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const { logout, user } = useAuth();

  const isFullScreen = fullImageScreens.includes(route.name);

  return (
    <View
      className={`flex-row justify-between w-full ${
        isFullScreen ? 'bg-transparent' : 'bg-white'
      } px-4 py-3 pt-6 items-center w-full mt-5 ${
        isFullScreen ? 'absolute' : ''
      }`}
    >
      <View className="flex-row items-center">
        {back && (
          <TouchableOpacity className="mr-2" onPress={navigation.goBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text className={isFullScreen ? 'text-white' : ''}>{title}</Text>
      </View>

      {/*MOCK*/}
      <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')}>
        <Text className="text-white">GO TO SUBSCRIPTIONS</Text>
      </TouchableOpacity>
      {/**/}

      {!!user && (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={logout} className="mr-2">
            <Text className={`text-[12px] ${isFullScreen ? 'text-white' : ''}`}>
              Logout
            </Text>
          </TouchableOpacity>
          <UserPreview user={user} />
        </View>
      )}

      {!user && (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className={`text-[12px] ${isFullScreen ? 'text-white' : ''}`}>
            Sign in
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
