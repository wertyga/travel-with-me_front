import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ReactNode } from 'react';

type Props = TextInputProps & {
  action?: ReactNode;
};

const SearchDefaultAction = () => {
  return (
    <View className="absolute top-[5px] right-[5px]">
      <TouchableOpacity className="rounded-full w-7 h-7 bg-[#19B9DD] items-center justify-center ">
        <FontAwesome name="search" size={12} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const Search = ({ action, ...inputProps }: Props) => {
  return (
    <View className="mx-2 relative mt-20 bg-red-400">
      <TextInput
        className="bg-white h-10 rounded-3xl shadow-lg shadow-black px-4 font-bold"
        {...inputProps}
      />
      <View className="absolute top-[5px] right-[5px]">
        <TouchableOpacity className="rounded-full w-7 h-7 bg-[#19B9DD] items-center justify-center ">
          <FontAwesome name="search" size={12} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
