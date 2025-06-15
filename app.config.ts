import { ConfigContext, ExpoConfig } from 'expo/config';

import * as os from 'os';

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
  return '0.0.0.0';
}

export const version = '32.0.0';
export const PRODUCT_NAME = 'Travel With Me';

const isProd = process.env.NODE_ENV === 'production';

const ENVS = {
  // API_BASE_URL: 'https://api.traveljet.org',
  API_BASE_URL: `http://${getLocalIP()}:6001`,

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
  '@react-native-firebase/app',
  [
    '@rnmapbox/maps',
    {
      RNMapboxMapsImpl: 'mapbox',
      RNMapboxMapsDownloadToken:
        'sk.eyJ1Ijoid2VydHJ5Z2EiLCJhIjoiY21ieHVqMXMxMTh0eTJrczA2eXc0OXNyYiJ9.BIk5OkUF1sWTFj9FaNqLZg',
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
      googleMapsApiKey: ENVS.GOOGLE_MAPS_API_KEY,
    },
    supportsTablet: true,
    bundleIdentifier: 'com.wertyga.travelwithme',
    infoPlist: {
      UIBackgroundModes: ['audio', 'location', 'fetch', 'remote-notification'],
    },
  },
  android: {
    versionCode: parseInt(version),
    googleServicesFile: './ga.json',
    config: {
      googleMaps: {
        apiKey: ENVS.GOOGLE_MAPS_API_KEY,
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
    API_BASE_URL: ENVS.API_BASE_URL,
    PLAY_STORE_URL:
      'https://play.google.com/store/apps/details?id=com.wertyga.travelwithme',
    APP_MARKET_URL: '',
    MAP_BOX_KEY:
      'pk.eyJ1Ijoid2VydHJ5Z2EiLCJhIjoiY20wYjYzZGwwMDR4cTJqc2E0azdlbjNkbyJ9.HaJwv8G5q51tw-pRGLNrLQ',
    VERSION: version,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    url: 'https://u.expo.dev/a4baaa78-7e41-475d-882f-f9add4d911c3',
  },
});
