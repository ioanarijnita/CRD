import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, FormControl, Input, NativeBaseProvider, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignUpNavigator } from './src/navigators/signup-navigator';
import { SignUpScreen } from './src/screens/common/signup';
const LinearGradient = require('expo-linear-gradient').LinearGradient;

const Stack = createStackNavigator(); 

export default function App() {

  return <NativeBaseProvider config={config}>
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <SignUpNavigator/>
    </NavigationContainer>
    </SafeAreaView>
  </NativeBaseProvider>


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

