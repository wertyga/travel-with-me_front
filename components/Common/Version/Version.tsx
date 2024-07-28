import { View } from 'react-native';

import Constants from 'expo-constants';

import { CText } from '@/components/CText';

export const Version = () => {
  if (!Constants.manifest2?.runtimeVersion) return null;

  return (
    <View style={{ alignItems: 'flex-end', marginVertical: 5 }}>
      <CText style={{ fontSize: 12 }}>
        {`v ${Constants.manifest2?.runtimeVersion}`}
      </CText>
    </View>
  );
};
