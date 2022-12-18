import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home';
import { SignUpScreen } from '../screens/common/signup';
import { LoginScreen } from '../screens/common/login';

const Stack = createStackNavigator();

export function SignUpNavigator() {
    return (
        <Stack.Navigator screenOptions={{}}>
             <Stack.Screen options = {{headerShown: false}} name="SignUp" component={SignUpScreen} />
            <Stack.Screen   options = {{ }} name="Home" component={HomeScreen} />
            <Stack.Screen   options = {{headerShown: false }} name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}