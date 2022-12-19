import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
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
