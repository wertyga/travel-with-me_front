import { ExpoConfig, ConfigContext } from 'expo/config';

const isProduction = process.env.NODE_ENV === 'production';

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: 'Travel With Me',
  slug: 'travel-with-me',
  version: '2.0.0',
  orientation: 'portrait',
  icon: './assets/logo2.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-2.png',
    resizeMode: 'cover',
    backgroundColor: '#C7D3C9',
  },
  assetBundlePatterns: ['**/*'],
  notification: {
    icon: './assets/notification_logo.png',
  },
  plugins: [
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow Travel With Me to use your location.',
        isAndroidBackgroundLocationEnabled: true,
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/notification_logo.png',
        // color: '#ffffff',
      },
    ],
  ],
  ios: {
    config: {
      googleMapsApiKey: 'AIzaSyA0w5GHoMSt37kTG-gWHxpYCTSCEnAUMFA',
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
    config: {
      googleMaps: {
        apiKey: 'AIzaSyA0w5GHoMSt37kTG-gWHxpYCTSCEnAUMFA',
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
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_BACKGROUND_LOCATION',
      'android.permission.FOREGROUND_SERVICE_LOCATION',
    ],
  },
  extra: {
    eas: {
      projectId: 'a4baaa78-7e41-475d-882f-f9add4d911c3',
    },
    // API_BASE_URL:
    //   'https://fef9-2a02-a31a-803b-7380-64e2-b303-a178-241e.ngrok-free.app',
    API_BASE_URL: 'https://api.underhood.space',
    PUBLIC_STRIPE_PKs_KEY:
      'pk_test_51NjctuLjIKbGVNPBwCRLtDko6G5xS4Ze7N42K6GsM5IkAnOQZn3skLD5kfzgKxXQuFl3watT7Xgo84A9HTwtWSST00CnF8tcSN',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    url: 'https://u.expo.dev/a4baaa78-7e41-475d-882f-f9add4d911c3',
  },
});
