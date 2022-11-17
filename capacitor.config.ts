import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: false,
      androidScaleType: "CENTER_INSIDE",
      splashFullScreen: false,
      splashImmersive: false,
      backgroundColor: "#1C3461",
      androidSplashResourceName: "splash"
    }
  },
  android: {
    allowMixedContent: true
  },
  appId: 'com.kasstechweb.gtax',
  appName: 'Global Tax',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
