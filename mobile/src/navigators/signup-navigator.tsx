import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen } from '../screens/common/signup';
import { LoginScreen } from '../screens/common/login';
import { BottomNavBar } from './bottom-tab-navigator';

const Stack = createStackNavigator();

export function SignUpNavigator() {
    return (
        <Stack.Navigator screenOptions={{}}>
             <Stack.Screen options = {{headerShown: false}} name="SignUp" component={SignUpScreen} />
            <Stack.Screen   options = {{headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options = {{headerStyle: { backgroundColor: "#f3f9fe" }, headerShown: false}} name = "Home" component = {BottomNavBar} />
        </Stack.Navigator>
    );
}