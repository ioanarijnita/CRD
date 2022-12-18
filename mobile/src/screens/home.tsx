import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { UpperBox } from '../components/upper-box';

const Stack = createStackNavigator();

export function HomeScreen() {
    return (
       <View>
        <Text>LLLLLLLLLLLL</Text>
        <UpperBox></UpperBox>
       </View>
    );
}