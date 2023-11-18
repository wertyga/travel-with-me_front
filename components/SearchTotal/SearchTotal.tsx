import Search from '../Search';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SearchTotal = () => {
  return (
    <Search
      className="mt-20"
      placeholder="Search..."
      icon={<Ionicons name="ios-earth-outline" size={18} color="white" />}
    />
  );
};
