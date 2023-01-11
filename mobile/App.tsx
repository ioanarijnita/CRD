import { NavigationContainer } from '@react-navigation/native';
import MapboxGL from '@rnmapbox/maps';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignUpNavigator } from './src/navigators/signup-navigator';
import { Concept, LoginContext } from './src/screens/common/login';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

export default function App() {
  const [proofOfConceptData, setProofOfConceptData] = useState<Concept>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    birthDate: "",
    bloodType: ""
  })

  useEffect(() => {
    MapboxGL.setWellKnownTileServer('mapbox');
    MapboxGL.setAccessToken("sk.eyJ1IjoiaW9hbmFyaWpuaXRhIiwiYSI6ImNsY3F5ZXNyazA1Z2Qzb3FpM3RjdGs0aW4ifQ.7ju2l6d7pKIW3_U456_Szg");
    // MapboxGL.setConnected(true);
  }, [])

  return <NativeBaseProvider config={config}>
    <SafeAreaView style={{ flex: 1 }}>
      <LoginContext.Provider value={{ value: proofOfConceptData, setValue: setProofOfConceptData }}>
        <NavigationContainer>
          <SignUpNavigator />
        </NavigationContainer>
      </LoginContext.Provider>
    </SafeAreaView>
  </NativeBaseProvider>


}

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};
