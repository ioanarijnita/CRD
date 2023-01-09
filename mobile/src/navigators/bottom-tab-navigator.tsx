import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home';
import { MapScreen } from '../screens/map';
import { ProfileScreen } from '../screens/profile';
const Tab = createBottomTabNavigator();

export function BottomNavBar() {

    return (

        <Tab.Navigator initialRouteName="Home"
            screenOptions={{
                tabBarActiveBackgroundColor: "white",
                tabBarInactiveBackgroundColor: "white",
                tabBarActiveTintColor: "darkblue",
                headerTitle: "",
                headerShown: false
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, focused }) => (
                    <Entypo name="home" size={24} color={focused ? "darkblue" : "grey"} />
                ),
            }} />
            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarIcon: ({ color, focused }) => (
                    <Entypo name="location-pin" size={24} color={focused ? "darkblue" : "grey"} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name="account" size={24} color={focused ? "darkblue" : "grey"} />
                ),
            }} />

        </Tab.Navigator>
    );
}
