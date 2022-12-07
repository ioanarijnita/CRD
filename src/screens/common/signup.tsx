import { useNavigation } from "@react-navigation/native";
import { Box, Button, FormControl, Input, ScrollView, VStack } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AuthenticationModal } from "../../components/authentification-modal";
import { px } from "../../hooks/utils";
import Collapsible from "react-native-collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNDateTimePicker from '@react-native-community/datetimepicker';

type FormData<T> = {
    firstName: T,
    lastName: T,
    email: T,
    phone: T,
    password: T,
    birthDate: T,
    bloodType: T
}

export function SignUpScreen() {
    const navigation = useNavigation();
    const [isCollapsedAboutYou, setIsCollapsedAboutYou] = useState(true);
    const [isCollapsedAccountDetails, setIsCollapsedAccountDetails] = useState(true);
    const [date, setDate] = useState(new Date());
    const [formData, setData] = useState<FormData<string>>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        birthDate: "",
        bloodType: ""
    });
    const [errors, setErrors] = useState<FormData<string>>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        birthDate: "",
        bloodType: ""
    });
    const validate = () => {
        let errorsFound = 0;
        let validationErrors = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            birthDate: "",
            bloodType: ""
        };
        if (formData.firstName === "") {
            validationErrors = { ...validationErrors, firstName: "First name is required" }
            errorsFound++;
        }
        console.log(errors)
        if (formData.lastName === "") {
            validationErrors = {
                ...validationErrors,
                lastName: "Last name is required"
            }
            errorsFound++;
        }
        if (formData.email === "") {
            validationErrors = {
                ...validationErrors,
                email: "Email is required"
            }
            errorsFound++;
        }
        if (formData.phone === "") {
            validationErrors = {
                ...validationErrors,
                phone: "Phone is required"
            }
            errorsFound++;
        }
        if (formData.phone === "") {
            validationErrors = {
                ...validationErrors,
                phone: "Phone is required"
            }
            errorsFound++;
        }
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
    };
    return (
        <AuthenticationModal>
            <View style={{ flex: 1, borderTopEndRadius: px(70), borderTopStartRadius: px(70), backgroundColor: 'white', height: "100%" }}>
                <Text style={{ textAlign: 'center', marginBottom: px(24), marginTop: px(50), fontSize: px(24), fontWeight: 'bold' }}>Sign up here</Text>
                <VStack width="100%" mx="4" maxW="225px" alignSelf={"center"}>
                    <FormControl isInvalid={errors.email !== "" || errors.firstName !== "" || errors.lastName !== "" || errors.phone !== ""}>
                        <TouchableOpacity onPress={() => setIsCollapsedAboutYou(!isCollapsedAboutYou)}>
                            <Box bg={{
                                linearGradient: {
                                    colors: ['#FF7276', '#FFB6C1'],
                                    start: [0, 0],
                                    end: [1, 1]
                                }
                            }} p="8" rounded="3xl" _text={{
                                fontSize: 'md',
                                fontWeight: 'medium',
                                color: 'warmGray.50',
                                textAlign: 'center'
                            }} alignSelf="center" width={300}>
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialCommunityIcons name="information" size={px(36)} color="white" />
                                    <Text style={{ marginLeft: px(10), fontSize: px(24), fontWeight: 'bold', color: 'white', textAlign: 'left', marginBottom: px(12) }}>About you</Text>
                                </View>
                                <Collapsible collapsed={isCollapsedAboutYou}>
                                    <FormControl.Label isRequired _text={{
                                        bold: true,
                                        color: "white"
                                    }}>First name</FormControl.Label>
                                    <Input _focus={{ focusOutlineColor: 'white' }} color={"white"} placeholderTextColor={"white"} fontWeight={'bold'} placeholder="Enter first name" onChangeText={value => setData({
                                        ...formData,
                                        firstName: value
                                    })} />
                                    {errors.firstName.length ? <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage> : <></>}
                                    <FormControl.Label isRequired _text={{
                                        bold: true,
                                        color: "white"
                                    }}>Last name</FormControl.Label>
                                    <Input _focus={{ focusOutlineColor: 'white' }} color={"white"} placeholderTextColor={"white"} fontWeight={'bold'} placeholder="Enter last name" onChangeText={value => {
                                        validate();
                                        setData({
                                            ...formData,
                                            lastName: value
                                        });
                                    }} />
                                    {errors.lastName.length ? <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage> : <></>}
                                    <FormControl.Label _text={{
                                        bold: true,
                                        color: "white"
                                    }}>Date of birth</FormControl.Label>
                                    <View style={{ flexDirection: 'row', borderColor: 'white', borderWidth: px(1), backgroundColor: 'none' }}>
                                        <MaterialCommunityIcons style={{ marginTop: px(4) }} name="calendar-multiselect" size={px(28)} color="white" />
                                        <RNDateTimePicker
                                            mode="date"
                                            value={date}
                                            maximumDate={new Date()}
                                            minimumDate={new Date(1950, 1, 1)}
                                            onChange={(event, value) => {
                                                setDate(value!);
                                            }}
                                            style={{ backgroundColor: 'transparent', opacity: 0.2 }}
                                            textColor={"white"}
                                            themeVariant={"light"}
                                        />
                                    </View>
                                    {errors.birthDate.length ? <FormControl.ErrorMessage>Date is invalid</FormControl.ErrorMessage> : <></>}
                                    <FormControl.Label _text={{
                                        bold: true,
                                        color: "white"
                                    }}>Blood type</FormControl.Label>
                                    <RNPickerSelect
                                        onValueChange={(value) => setData({
                                            ...formData,
                                            birthDate: value
                                        })}
                                        items={[
                                            { label: "O+", value: "O+" },
                                            { label: "A2+", value: "A2+" },
                                            { label: "B3+", value: "B3+" },
                                            { label: "AB4+", value: "AB4+" },
                                            { label: "O-", value: "O-" },
                                            { label: "A2-", value: "A2-" },
                                            { label: "B3-", value: "B3-" },
                                            { label: "AB4-", value: "AB4-" },
                                        ]}
                                        style={{ placeholder: { color: "white" }, inputIOS: { color: "white", fontWeight: 'bold', padding: px(5), fontSize: px(12) }, inputAndroid: { color: "white", fontWeight: 'bold', padding: px(5), fontSize: px(12) }, viewContainer: { borderWidth: px(1), borderColor: 'white', borderRadius: px(4), height: px(28) } }}
                                    />
                                </Collapsible>
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: px(36) }} onPress={() => setIsCollapsedAccountDetails(!isCollapsedAccountDetails)}>
                            <Box bg={{
                                linearGradient: {
                                    colors: ['#FF7276', '#FFB6C1'],
                                    start: [0, 0],
                                    end: [1, 1]
                                }
                            }} p="8" rounded="3xl" _text={{
                                fontSize: 'md',
                                fontWeight: 'medium',
                                color: 'warmGray.50',
                                textAlign: 'center'
                            }} alignSelf="center" width={300}>
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialCommunityIcons name="account" size={px(36)} color="white" />
                                    <Text style={{ marginLeft: px(10), fontSize: px(24), fontWeight: 'bold', color: 'white', textAlign: 'left', marginBottom: px(12) }}>Account details</Text>
                                </View>
                                <Collapsible collapsed={isCollapsedAccountDetails}>
                                    <FormControl.Label isRequired _text={{
                                        bold: true,
                                        color: "white"
                                    }}>Email</FormControl.Label>
                                    <Input _focus={{ focusOutlineColor: 'white' }} color={"white"} placeholderTextColor={"white"} fontWeight={'bold'} placeholder="Enter your email" onChangeText={value => setData({
                                        ...formData,
                                        email: value
                                    })} />
                                    {errors.email.length ? <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : <></>}
                                    <FormControl.Label isRequired _text={{
                                        bold: true,
                                        color: "white"
                                    }}>Phone number</FormControl.Label>
                                    <Input _focus={{ focusOutlineColor: 'white' }} color={"white"} placeholderTextColor={"white"} fontWeight={'bold'} placeholder="Enter your phone number" onChangeText={value => setData({
                                        ...formData,
                                        phone: value
                                    })} />
                                    {errors.phone.length ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : <></>}
                                    <FormControl.Label isRequired _text={{
                                        bold: true,
                                        color: "white"
                                    }}>Password</FormControl.Label>
                                    <Input _focus={{ focusOutlineColor: 'white' }} secureTextEntry={true} placeholderTextColor={"white"} fontWeight={'bold'} color={'white'} placeholder="Enter your password" onChangeText={value => setData({
                                        ...formData,
                                        password: value
                                    })} />
                                    {errors.password.length ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : <></>}
                                </Collapsible>
                            </Box>
                        </TouchableOpacity>
                    </FormControl>
                    <Button onPress={onSubmit} style={{ marginTop: px(40), borderRadius: px(10), backgroundColor: '#FF7276', height: px(50), width: px(250), alignSelf: 'center' }}>
                        <Text style={{ fontSize: px(16), fontWeight: 'bold', color: 'white' }}>Sign up</Text>
                    </Button>
                    <View style={{ marginTop: px(15), flexDirection: 'row' }}>
                        <Text style={{ color: "#808080" }}>OR</Text>
                        <View style={{ width: px(90), borderWidth: px(0.5), borderColor: 'black', margin: px(10) }}></View>
                        <Text style={{ color: "#808080" }}>CONNECT WITH</Text>
                    </View>
                    <View style={{ marginTop: px(20), flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ backgroundColor: "black", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: px(100) }}>
                            <MaterialCommunityIcons name="apple" size={px(28)} color="white"></MaterialCommunityIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#a9d5a9", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: px(100) }}>
                            <MaterialCommunityIcons name="google" size={px(28)} color="white"></MaterialCommunityIcons>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: px(20) }} onPress={() => { navigation.navigate("Login" as never) }}>
                        <Text style={{ textShadowColor: '#F0F0F0', textShadowOffset: { width: 0, height: 16 }, textShadowRadius: 4, shadowOpacity: 0.3, fontSize: px(12), color: 'grey' }}>Already have an account?</Text>
                    </TouchableOpacity>
                </VStack>
            </View>
        </AuthenticationModal >

    );
}
const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: "bold"
    }
});
