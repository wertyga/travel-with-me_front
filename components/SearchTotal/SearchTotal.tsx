import { Ionicons } from '@expo/vector-icons';
import Search from '../Search';

export const SearchTotal = () => {
  return (
    <Search
      placeholder="Search..."
      icon={<Ionicons name="ios-earth-outline" size={18} color="white" />}
    />
  );
};
