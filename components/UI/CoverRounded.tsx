import { StyleSheet, View, ViewProps } from 'react-native';

import { CONSTANTS } from '@/styles/constants';

type TCoverRoundedProps = Pick<ViewProps, 'style'> & {
  children: React.ReactNode;
};

export const CoverRounded: React.FC<TCoverRoundedProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: CONSTANTS.colors.bgSemiTransparentDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
