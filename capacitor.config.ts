import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 5000,
      launchAutoHide: true,
      androidScaleType: "CENTER_CROP",
      androidSplashResourceName: "splash",
      splashFullScreen: false,
      splashImmersive: false
    }
  },
  android: {
    allowMixedContent: true
  },
  appId: 'io.ionic.starter',
  appName: 'Global Tax',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
