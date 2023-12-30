import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ReactNode, useState } from 'react';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { FONTS } from '@/types';
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { TextInputTextInputEventData } from 'react-native/Libraries/Components/TextInput/TextInput';

type Props = TextInputProps & {
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
  onSearch?: (data: NativeSyntheticEvent<TextInputTextInputEventData>) => void;
};

const Search = ({
  icon,
  style,
  inputProps: { style: inputStyles, ...inputProps } = {},
  onSearch,
}: Props) => {
  const [search, setSearch] = useState('');

  const handleConfirm = () => {
    onSearch?.({
      value: (inputProps as TextInputProps)?.value || search,
    } as NativeSyntheticEvent<TextInputTextInputEventData>);
  };

  return (
    <View style={cn(styles.container, style)}>
      <TextInput
        style={cn(styles.input, inputStyles)}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="rgba(0, 53, 59, 0.60)"
        {...inputProps}
      />
      <TouchableOpacity style={styles.search} onPress={handleConfirm}>
        {icon || <Feather name="search" size={20} color="black" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 45,
    color: 'rgba(0, 53, 59, 0.60)',
    fontFamily: FONTS.OpenSansSemiBold,
  },
  search: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
