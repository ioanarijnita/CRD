import { Button, FormControl, Input, NativeBaseProvider, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignUpScreen } from './src/screens/common/signup';

export default function App() {

  return <NativeBaseProvider>
    <SafeAreaView style={{ flex: 1 }}>
   
    </SafeAreaView>
  </NativeBaseProvider>


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
