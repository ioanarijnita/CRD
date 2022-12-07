import { useNavigation } from "@react-navigation/native";
import { Button, FormControl, Input, VStack } from "native-base";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { px } from "../../hooks/utils";
import { MaterialCommunityIcons } from '@expo/vector-icons'
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

    const onSubmit = () => {
        if (validate()) {
            console.log('Submitted');
            navigation.navigate("Home" as never);
        } else {
            console.log('Validation Failed');
        }
    }

    return <AuthenticationModal>
        <View style={{ marginTop: px(18), borderTopEndRadius: px(70), borderTopStartRadius: px(70), backgroundColor: 'white', flexGrow: 1 }}>
            <View style={{ marginBottom: px(48), alignItems: 'center' }}>
                <Text style={{ marginTop: px(48), fontSize: px(36), fontWeight: 'bold', color: 'black' }}>Welcome!</Text>
                <Text style={{ color: '#808080' }} >Sign in to continue</Text>
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
                            borderRadius={px(24)}
                            _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                            placeholder="Password"
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
