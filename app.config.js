export default {
  "expo": {
    "name": "كاشف",
    "slug": "kashef",
    "version": "0.1.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "backgroundColor": "#0f2a1d",
    "primaryColor": "#f5a623",
    "splash": {
      "backgroundColor": "#0f2a1d",
      "resizeMode": "contain"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.kashef.app"
    },
    "android": {
      "package": "com.kashef.app",
      "adaptiveIcon": {
        "backgroundColor": "#0f2a1d"
      },
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    "extra": {
      "eas": {
        "projectId": ""
      }
    },
    "locales": {
      "ar": "./ar.json"
    }
  }
};
