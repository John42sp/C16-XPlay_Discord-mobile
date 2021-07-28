import React from 'react';
import { StatusBar, LogBox } from 'react-native';

import { Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { Routes } from './src/routes';
import { Background } from './src/components/Background'; //all screens will have same 50top/50bottom colors 
import { AuthProvider } from './src/hooks/auth'
//APP STARTING POINT  = everyting starts here, where loading of libs happen, ex: fonts

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine']);

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded){     //while fonts did not load, AppLoading will hold rendering Signin screen
    return <AppLoading/> 
  }
//Background: component for standard screen, to be rendered on every page

//StatusBar to be used in every screen, brought here from Signin component
  return (
    <Background> 
      <StatusBar barStyle="light-content" /> 
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </Background>
  );
}


