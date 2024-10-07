import { ConfigContext, ExpoConfig } from 'expo/config';

export const version = '31.0.0';
export const PRODUCT_NAME = 'Travel With Me';

const ENV = {
  // API_BASE_URL:
  //   'https://de19-2a02-a31a-80c7-8300-4cdd-e430-169d-8db6.ngrok-free.app',
  API_BASE_URL: 'https://api.traveljet.org',
  GOOGLE_MAPS_API_KEY: 'AIzaSyA0w5GHoMSt37kTG-gWHxpYCTSCEnAUMFA',
};

const appPlugins: ExpoConfig['plugins'] = [
  ['expo-location'],
  [
    'expo-notifications',
    {
      icon: './assets/notification_logo.png',
    },
  ],
  // [
  //   '@stripe/stripe-react-native',
  //   {
  //     merchantIdentifier: 'com.wertyga.travelwithme',
  //     enableGooglePay: false,
  //   },
  // ],
  [
    'expo-updates',
    {
      username: 'wertyga13',
    },
  ],
  [
    '@react-native-google-signin/google-signin',
    {
      iosUrlScheme:
        'com.googleusercontent.apps.277624245533-hmaoaah21er9j4b7le8rhgeu9tvpogcr',
    },
  ],
  [
    'expo-image-picker',
    {
      photosPermission:
        'The app accesses your photos to let you share them with your friends.',
      cameraPermission:
        'The app accesses your photos to let you share them with your friends.',
    },
  ],
];

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: 'Travel With Me',
  slug: 'travel-with-me',
  version: version,
  orientation: 'portrait',
  icon: './assets/logo2.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#C7D3C9',
  },
  assetBundlePatterns: ['**/*'],
  notification: {
    icon: './assets/notification_logo.png',
  },
  plugins: appPlugins,
  experiments: {
    tsconfigPaths: true,
  },
  scheme: 'travel-with-me',
  ios: {
    config: {
      googleMapsApiKey: ENV.GOOGLE_MAPS_API_KEY,
    },
    supportsTablet: true,
    bundleIdentifier: 'com.wertyga.travelwithme',
    infoPlist: {
      UIBackgroundModes: ['audio', 'location', 'fetch', 'remote-notification'],
    },
  },
  android: {
    versionCode: parseInt(version),
    config: {
      googleMaps: {
        apiKey: ENV.GOOGLE_MAPS_API_KEY,
      },
    },
    adaptiveIcon: {
      foregroundImage: './assets/logo2.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.wertyga.travelwithme',
    permissions: [
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.FOREGROUND_SERVICE',
    ],
  },
  extra: {
    eas: {
      projectId: 'a4baaa78-7e41-475d-882f-f9add4d911c3',
    },
    API_BASE_URL: ENV.API_BASE_URL,
    PLAY_STORE_URL:
      'https://play.google.com/store/apps/details?id=com.wertyga.travelwithme',
    APP_MARKET_URL: '',
    VERSION: version,
  },
  runtimeVersion: version,
  updates: {
    url: 'https://u.expo.dev/a4baaa78-7e41-475d-882f-f9add4d911c3',
  },
});
