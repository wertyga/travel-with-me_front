import { TouchableOpacity } from 'react-native';

import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

export const CloseOpenIcon = ({ isOpen, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      {!isOpen && <Ionicons name="musical-notes" size={30} color="white" />}
      {isOpen && <Fontisto name="angle-right" size={20} color="white" />}
    </TouchableOpacity>
  );
};
