import { ConfigContext, ExpoConfig } from 'expo/config';

const ENV = {
  development: {
    GOOGLE_MAPS_API_KEY: 'AIzaSyA0w5GHoMSt37kTG-gWHxpYCTSCEnAUMFA',
    API_BASE_URL: 'https://api.underhood.space',
  },
  production: {
    GOOGLE_MAPS_API_KEY: 'AIzaSyA0w5GHoMSt37kTG-gWHxpYCTSCEnAUMFA',
    API_BASE_URL: 'https://api.underhood.space',
  },
};

const version = 15;

const envs = (ENV as any)[process.env.NODE_ENV || 'development'];

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: 'Travel With Me',
  slug: 'travel-with-me',
  version: `${version}.0.0`,
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
  plugins: [
    ['expo-location'],
    [
      'expo-notifications',
      {
        icon: './assets/notification_logo.png',
      },
    ],
    [
      '@stripe/stripe-react-native',
      {
        merchantIdentifier: 'com.wertyga.travel-with-me',
        enableGooglePay: false,
      },
    ],
  ],
  ios: {
    config: {
      googleMapsApiKey: envs.GOOGLE_MAPS_API_KEY,
    },
    supportsTablet: true,
    bundleIdentifier: 'com.wertyga.travelwithme',
    infoPlist: {
      UIBackgroundModes: ['audio', 'location', 'fetch', 'remote-notification'],
    },
  },
  experiments: {
    tsconfigPaths: true,
  },
  scheme: 'travel-with-me',
  android: {
    versionCode: version,
    config: {
      googleMaps: {
        apiKey: envs.GOOGLE_MAPS_API_KEY,
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
    API_BASE_URL: envs.API_BASE_URL,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    url: 'https://u.expo.dev/a4baaa78-7e41-475d-882f-f9add4d911c3',
  },
});
