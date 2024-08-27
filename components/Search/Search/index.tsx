import { ReactNode, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Feather } from '@expo/vector-icons';
import { FONTS } from '@/types';

type Props = {
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
  onSearch?: (search: string) => void;
  disabled?: boolean;
};

const Search = ({
  icon,
  style,
  inputProps: { style: inputStyles, ...inputProps } = {},
  onSearch,
  disabled,
}: Props) => {
  const [search, setSearch] = useState('');

  const handleConfirm = () => {
    onSearch?.((inputProps as TextInputProps)?.value || search);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, inputStyles]}
        value={search}
        onEndEditing={handleConfirm}
        onChangeText={setSearch}
        placeholderTextColor="rgba(0, 53, 59, 0.60)"
        {...inputProps}
      />
      <TouchableOpacity style={styles.search} onPress={handleConfirm}>
        {icon || <Feather name="search" size={20} color="black" />}
      </TouchableOpacity>
      {disabled && <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
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
  placeholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default Search;
