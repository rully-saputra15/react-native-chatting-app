import React, {useEffect, useState} from "react";
import {extendTheme, NativeBaseProvider} from "native-base";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold, useFonts
} from "@expo-google-fonts/inter";
import Main from "./src/Main";

// Define the config
const config = {
  useSystemColorMode: false,
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient
  }
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {
  }
}
const App = () => {
  //const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Keep the splash screen visible while we fetch resources
  //       await SplashScreen.preventAutoHideAsync();
  //       // Pre-load fonts, make any API calls you need to do here
  //       await Font.loadAsync({
  //         Inter_100Thin,
  //         Inter_300Light,
  //         Inter_400Regular,
  //         Inter_500Medium,
  //         Inter_700Bold
  //       });
  //
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       await SplashScreen.hideAsync();
  //       setAppIsReady(true);
  //
  //     }
  //   }
  //
  //   prepare();
  // }, []);
  if (fontsLoaded) {
    return (
      <NativeBaseProvider config={config}>
        <Main/>
      </NativeBaseProvider>
    );
  } else {
    return <AppLoading />;
  }

};
export default App;
