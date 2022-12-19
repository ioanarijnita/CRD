import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native';
import { LoginContext } from './common/login';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
    const concept = useContext(LoginContext);
    const nav = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>Proof of concept auth</Text>
            <Text>Phone: {concept.value.phone}</Text>
            <Text>E-mail: {concept.value.email}</Text>
            <Text>First name: {concept.value.firstName}</Text>
            <Text>Last name: {concept.value.lastName}</Text>
            <Text>Birth date: {concept.value.birthDate}</Text>
            <Text>Blood type: {concept.value.bloodType}</Text>
            <Text>Id: {concept.value.id}</Text>
            <Button title="LOGOUT" onPress={() => {
                nav.navigate("Login" as never);
                concept.setValue({
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: "",
                    birthDate: "",
                    bloodType: ""
                })
            }}></Button>
        </View>
    );
}
