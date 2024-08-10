import React from 'react';

import { TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export const CloseIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="close-circle-outline" size={40} color="white" />
    </TouchableOpacity>
  );
};
