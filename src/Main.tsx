import React from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {MainStackNavigator} from "./stackNavigators/MainStackNavigator";
import {StatusBar} from "native-base";

const Main = () => {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white"
    }
  };
  return (
    <NavigationContainer theme={mainTheme}>
      <StatusBar />
      <MainStackNavigator />
    </NavigationContainer>
  )
};

export default Main;
