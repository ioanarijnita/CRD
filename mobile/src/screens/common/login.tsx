import { useNavigation } from "@react-navigation/native";
import { Button, FormControl, Input, VStack } from "native-base";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { px } from "../../hooks/utils";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthenticationModal } from "../../components/authentification-modal";

type FormData<T> = {
    phone: T,
    password: T
}

export function LoginScreen() {
    const navigation = useNavigation();
    const [formData, setData] = useState<FormData<string>>({
        phone: "",
        password: ""
    });
    const [errors, setErrors] = useState<FormData<string>>({
        phone: "",
        password: ""
    });
    const validate = () => {
        let errorsFound = 0;
        let validationErrors = {
            phone: "",
            password: "",
        };
        if (formData.phone === "") {
            validationErrors = { ...validationErrors, phone: "Phone is required" }
            errorsFound++;
        }
        console.log(errors)
        if (formData.password === "") {
            validationErrors = {
                ...validationErrors,
                password: "Password is required"
            }
            errorsFound++;
        }
        console.log(validationErrors)
        setErrors(validationErrors);
        if (errorsFound > 0) return false;
        return true;
    };
    const concept = React.useContext(LoginContext);
    const onSubmit = () => {
        if (validate()) {
            fetch('https://chs.herokuapp.com/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phonenumber: formData.phone,
                    password: formData.password
                })
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                if (res) {
                    concept.setValue(res);
                    navigation.navigate("Home" as never);
                    setData({
                        phone: "",
                        password: ""
                    });
                } else {
                    Alert.alert("Internal server error!");
                }
            })
                .catch(e => {
                    Alert.alert("Internal server error!");
                })
        } else {
            console.log('Validation Failed');
        }
    }

    return <AuthenticationModal text={"Login to your account"}>
        <View style={{ borderTopEndRadius: px(70), borderTopStartRadius: px(70), backgroundColor: 'white', flexGrow: 1 }}>
            <View style={{ marginBottom: px(48), alignItems: 'center' }}>
                <View style={{ marginTop: px(20), flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ backgroundColor: "white", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: px(100) }}>
                        <MaterialCommunityIcons name="facebook" size={px(28)} color="#4267B2"></MaterialCommunityIcons>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "white", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: px(100) }}>
                        <MaterialCommunityIcons name="apple" size={px(28)} color="black"></MaterialCommunityIcons>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "white", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: px(100) }}>
                        <AntDesign name="googleplus" size={px(28)} color="#d82c2c"></AntDesign>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: '#808080' }}>or use your email account</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <VStack width="90%" mx="5" maxW="225px">
                    <FormControl isInvalid={errors.phone !== "" || errors.password !== ""}>
                        <Input
                            leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                name="account"
                                size={px(24)}
                                color="#808080" />}
                            height={px(40)}
                            value={formData.phone}
                            borderRadius={px(24)}
                            _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                            placeholder="Phone number"
                            onChangeText={value => setData({
                                ...formData,
                                phone: value
                            })} />
                        {errors.phone.length ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : <></>}
                        {''}
                        <Input
                            leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                name="key-variant"
                                size={px(24)}
                                color="#808080" />}
                            height={px(40)}
                            value={formData.password}
                            borderRadius={px(24)}
                            _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={value => {
                                validate();
                                setData({
                                    ...formData,
                                    password: value
                                });
                            }} />
                        {errors.password.length ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : <></>}
                    </FormControl>
                    <Button onPress={onSubmit} style={{ marginTop: px(40), borderRadius: px(10), backgroundColor: '#FF7276', height: px(50), width: px(250), alignSelf: 'center' }}>
                        <Text style={{ fontSize: px(16), fontWeight: 'bold', color: 'white' }}>Log in</Text>
                    </Button>
                    <TouchableOpacity style={{ marginTop: px(20) }} onPress={() => { navigation.navigate("Home" as never) }}>
                        <Text style={{ textShadowColor: '#F0F0F0', textShadowOffset: { width: 0, height: 16 }, textShadowRadius: 4, shadowOpacity: 0.3, fontSize: px(12), color: 'grey' }}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: px(20) }} onPress={() => { navigation.navigate("SignUp" as never) }}>
                        <Text style={{ textShadowColor: '#F0F0F0', textShadowOffset: { width: 0, height: 16 }, textShadowRadius: 4, shadowOpacity: 0.3, fontSize: px(12), color: 'grey' }}>Don't you have an account? Sign in!</Text>
                    </TouchableOpacity>
                </VStack>
            </View>
        </View>
    </AuthenticationModal>
}

export type Concept = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    birthDate: string,
    bloodType: string
}

export const LoginContext = React.createContext<{ value: Concept, setValue: (value: Concept) => void }>({
    value: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        birthDate: "",
        bloodType: ""
    }, setValue: () => { }
})
