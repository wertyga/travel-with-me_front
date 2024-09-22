import { TouchableOpacity } from 'react-native';

import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

import { CONSTANTS } from '@/styles/constants';

export const CloseOpenIcon = ({ isOpen, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...(isOpen
          ? {
              paddingHorizontal: 10,
              paddingLeft: 15,
            }
          : {}),
      }}
    >
      {!isOpen && (
        <Ionicons
          name="musical-notes"
          size={20}
          color={CONSTANTS.colors.typographyLight}
        />
      )}
      {isOpen && (
        <Fontisto
          name="angle-right"
          size={20}
          color={CONSTANTS.colors.typographyLight}
        />
      )}
    </TouchableOpacity>
  );
};
