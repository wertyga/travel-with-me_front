import { View } from 'react-native';

import Constants from 'expo-constants';

import { CText } from '@/components/CText';

export const Version = () => {
  if (!Constants.expoConfig?.extra?.VERSION) return null;

  return (
    <View style={{ alignItems: 'flex-end', marginVertical: 5 }}>
      <CText style={{ fontSize: 12 }} light>
        {`v ${Constants.expoConfig?.extra?.VERSION}`}
      </CText>
    </View>
  );
};
