import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ReactNode } from 'react';

type Props = TextInputProps & {
  icon?: ReactNode;
  className?: string;
};

const Search = ({ icon, className, ...inputProps }: Props) => {
  return (
    <View className={`relative ${className}`}>
      <TextInput
        className="bg-white h-8 rounded-3xl shadow-lg shadow-black px-4 font-bold"
        {...inputProps}
      />
      <View className="absolute top-[4px] right-[5px]">
        <TouchableOpacity className="rounded-full w-6 h-6 bg-[#379FA0] items-center justify-center ">
          {/*<TouchableOpacity className="rounded-full w-6 h-6 bg-[#19B9DD] items-center justify-center ">*/}
          {icon || <FontAwesome name="search" size={12} color="white" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
