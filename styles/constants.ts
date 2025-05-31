import { StyleSheet } from 'react-native';

export const CONSTANTS = {
  colors: {
    typography: '#000000',
    typographyLight: '#ffffff',
    accent: '#ed522e',
    dark: '#101010',
    text: '#969797',
    textDisabled: '#737373',
    disabled: '#c2c2c2',
    blue: '#19b9dd',
    ultramarine: '#30D5C8',
    ultramarine1: '#28a99f',
    bgDarkest: '#152e31',
    bgLight: '#036068',
    bgMiddle: '#00353B',
    footerColor: '#00353B',
    bgDark: '#17282E',
    bgDark2: '#182E2F',
    bgSemiTransparent: 'rgba(67,67,67,0.4)',
    bgSemiTransparentDark: 'rgba(0, 0, 0, 0.5)',
  },
  spaces: {
    paddingTop: 60,
    paddingHorizontal: 15,
    footerHeight: 60,
    pullTriggerHeight: 6,
    iosAdditionalSpaceBottom: 30,
  },
  indexes: {
    footerZIndex: 200,
  },
  shadow: {
    default: {
      // Android
      shadowColor: 'black',
      elevation: 7,
      // IOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  },
};

export const CUSTOM_VIEW_STYLES = {
  metaView: StyleSheet.create({
    backBtn: {
      backgroundColor: CONSTANTS.colors.bgDark2,
      ...CONSTANTS.shadow.default,
      borderRadius: 40,
      marginRight: 10,
    },
    cityPill: {
      backgroundColor: CONSTANTS.colors.bgDark2,
      height: 35,
      ...CONSTANTS.shadow.default,
    },
    likeBtn: {
      ...CONSTANTS.shadow.default,
      backgroundColor: CONSTANTS.colors.bgDark2,
    },
  }),
};
