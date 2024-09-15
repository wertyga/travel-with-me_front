import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';

import { CText } from '@/components/CText';

import { CONSTANTS } from '@/styles/constants';

export type UploadTypes = 'camera' | 'folder';

export type UploadChoiceProps = {
  onChoose: (type: UploadTypes) => void;
};

export const UploadChoice = ({ onChoose }: UploadChoiceProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={1}
          onPress={() => onChoose('camera')}
        >
          <Entypo name="camera" size={35} color="white" />
          <CText>Open camera</CText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={1}
          onPress={() => onChoose('folder')}
        >
          <Entypo name="folder" size={35} color="white" />
          <CText>Open inner storage</CText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 6,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: CONSTANTS.colors.bg3,
    width: '45%',
    aspectRatio: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
});
