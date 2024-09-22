import { ReactNode } from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import { View } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { useNavigation } from '@/hooks';

import { CONSTANTS } from '@/styles/constants';

type Props = Pick<CustomButtonProps, 'transparent'> & {
  children?: ReactNode;
  style?: ViewStyle;
};

export const BackButton = ({ transparent, children, style }: Props) => {
  const navigation = useNavigation();

  return (
    <Button
      transparent
      free
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
      style={[styles.container, style]}
    >
      <View style={[styles.icon, transparent && styles.iconTransparent]}>
        <FontAwesome5
          name="angle-left"
          size={24}
          color={CONSTANTS.colors.typographyLight}
        />
      </View>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: {
    backgroundColor: 'rgba(246, 245, 242, 0.40)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  iconTransparent: {
    backgroundColor: 'transparent',
  },
});
