import { useNavigation } from "@react-navigation/native";
import { Button, FormControl, Input, VStack } from "native-base";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AuthenticationModal } from "../../components/authentification-modal";
import { px } from "../../hooks/utils";

import { AntDesign, Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Carousel from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type CarouselCardType = {
    Input1: JSX.Element,
    Input2: JSX.Element,
    Input3: JSX.Element,
    Input4: JSX.Element,
    Input5: JSX.Element
}
type FormData<T> = {
    firstName: T,
    lastName: T,
    email: T,
    phone: T,
    password: T,
    gender: T,
    birthDate: T,
    bloodType: T
}

export function SignUpScreen() {
    const navigation = useNavigation();
    const [isCollapsedAboutYou, setIsCollapsedAboutYou] = useState(true);
    const [isCollapsedAccountDetails, setIsCollapsedAccountDetails] = useState(true);
    const [date, setDate] = useState(new Date());
    const initialData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        birthDate: "",
        bloodType: ""
    }
    const [formData, setData] = useState<FormData<string>>(initialData);
    const [errors, setErrors] = useState<FormData<string>>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        birthDate: "",
        bloodType: ""
    });
    const [swipeLeft, setSwipeLeft] = useState(false);
    const [swipeRight, setSwipeRight] = useState(false);
    const [carouselIdx, setCarouselIdx] = useState(0);

    const validate = () => {
        let errorsFound = 0;
        let validationErrors = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            gender: "",
            birthDate: "",
            bloodType: ""
        };
        if (formData.firstName === "") {
            validationErrors = { ...validationErrors, firstName: "First name is required" }
            errorsFound++;
        }
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
        if (formData.gender === "") {
            validationErrors = {
                ...validationErrors,
                gender: "Gender is required"
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
        setErrors(validationErrors);
        if (errorsFound > 0) return false;
        return true;
    };

    const onSubmit = () => {
        if (validate()) {
            fetch('https://chs.herokuapp.com/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: parseInt(String((Date.now() / 1000)) + (Math.random() * 100)),
                    email: formData.email, firstname: formData.firstName, lastname: formData.lastName, phonenumber: formData.phone,
                    password: formData.password, birthdate: moment(date).format("DD-MM-YYYY"), bloodtype: formData.bloodType
                })
            }).then((response) => {
                if (response.ok) {
                    navigation.navigate("Home" as never);
                    setData(initialData);
                    return response.json();
                }
                Alert.alert("Internal server error!");
            })
                .catch(e => {
                    Alert.alert("Network error!");
                })
        } else {
            console.log('Validation Failed');

        }
    };

    const Input1 = <View style={{ marginTop: 16 }}>
        <Input
            leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                name="email"
                size={px(24)}
                color="#808080" />}
            height={px(40)}
            value={formData.email}
            borderRadius={px(24)}
            _focus={{ style: { backgroundColor: "#F8F8F8" } }}
            placeholder="Email"
            onChangeText={value => setData({
                ...formData,
                email: value
            })} />
        {errors.email.length ? <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : <></>}
        {''}
    </View>
    const firstCarouselData = {
        Input1: Input1,
        Input2: <View style={{ marginTop: 16 }}>
            <Input
                leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                    name="phone"
                    size={px(24)}
                    color="#808080" />}
                height={px(40)}
                value={formData.phone}
                borderRadius={px(24)}
                _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                placeholder="Phone number"
                onChangeText={value => {
                    validate();
                    setData({
                        ...formData,
                        phone: value
                    });
                }} />
            {errors.phone.length ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : <></>}
            {''}
        </View>,
        Input3: <View style={{ marginTop: 16 }}>
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
        </View>,
        Input4: <View style={{ marginTop: px(16), flexDirection: "row", justifyContent: "space-around", width: px(250) }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => setData({ ...formData, gender: "1" })} style={{ borderWidth: px(1.5), borderColor: "#808080", borderRadius: px(20), width: px(40), height: px(40), backgroundColor: formData.gender === "1" ? "#808080" : "white" }}>
                    <Fontisto name="male" color={formData.gender === "1" ? "white" : "#808080"} size={24} style={{ paddingTop: px(3), paddingLeft: px(7) }}></Fontisto>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#808080", marginLeft: px(14) }}>Male</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => setData({ ...formData, gender: "0" })} style={{ borderWidth: px(1.5), borderColor: "#808080", borderRadius: px(20), width: px(40), height: px(40), backgroundColor: formData.gender === "0" ? "#808080" : "white" }}>
                    <Fontisto name="female" color={formData.gender === "0" ? "white" : "#808080"} size={24} style={{ paddingTop: px(3), paddingLeft: px(7) }}></Fontisto>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#808080", marginLeft: px(14) }}>Female</Text>
            </View>
            {errors.gender.length ? <FormControl.ErrorMessage>{errors.gender}</FormControl.ErrorMessage> : <></>}
        </View>,
        Input5: <></>
    };

    const secondCarouselData = {
        Input1: <View style={{ marginTop: 16 }}>
            <Input
                leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                    name="account"
                    size={px(24)}
                    color="#808080" />}
                height={px(40)}
                value={formData.firstName}
                borderRadius={px(24)}
                _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                placeholder="First name"
                onChangeText={value => setData({
                    ...formData,
                    firstName: value
                })} />
            {errors.firstName.length ? <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage> : <></>}
            {''}
        </View>,
        Input2: <View style={{ marginTop: 16 }}>
            <Input
                leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                    name="account"
                    size={px(24)}
                    color="#808080" />}
                height={px(40)}
                value={formData.lastName}
                borderRadius={px(24)}
                _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                placeholder="Last name"
                onChangeText={value => setData({
                    ...formData,
                    lastName: value
                })} />
            {errors.lastName.length ? <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage> : <></>}
        </View>,
        Input3: <View style={{ marginTop: 16 }}>
            <View style={{ flexDirection: 'row', borderColor: 'lightgray', borderWidth: px(1), backgroundColor: 'none', borderRadius: px(20) }}>
                <MaterialCommunityIcons style={{ marginTop: px(6), marginLeft: px(10) }} name="calendar-multiselect" size={px(28)} color="#808080" />
                <RNDateTimePicker
                    mode="date"
                    value={date}
                    maximumDate={new Date()}
                    minimumDate={new Date(1950, 1, 1)}
                    onChange={(event, value) => {
                        setDate(value!);
                    }}
                    style={{ backgroundColor: 'transparent', opacity: 0.2 }}
                    textColor={"#808080"}
                    themeVariant={"light"}
                />
            </View>
            {errors.birthDate.length ? <FormControl.ErrorMessage>Date is invalid</FormControl.ErrorMessage> : <></>}
        </View>,
        Input4: <View style={{ marginTop: 16 }}>
            <View style={{ flexDirection: 'row', borderColor: 'lightgray', borderWidth: px(1), backgroundColor: 'none', borderRadius: px(20) }}>
                <Fontisto name="blood-drop" color={formData.gender === "1" ? "white" : "#808080"} size={24} style={{ paddingTop: px(6), paddingLeft: px(12) }}></Fontisto>
                <RNPickerSelect
                    // placeholder={"Blood Type"}

                    onValueChange={(value) => setData({
                        ...formData,
                        bloodType: value
                    })}
                    value={formData.bloodType}
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
                    style={{ placeholder: { color: "#808080" }, inputIOS: { padding: px(12), fontSize: px(12) }, inputAndroid: { color: "#808080", fontWeight: 'bold', padding: px(5), fontSize: px(12) }, viewContainer: { height: px(40) } }}
                />
            </View>
        </View>,
        Input5: <View style={{ marginTop: 24, }}>
            <Button onPress={onSubmit} style={{ borderRadius: px(10), backgroundColor: '#FF7276', height: px(50), width: px(250), alignSelf: 'center' }}>
                <Text style={{ fontSize: px(16), fontWeight: 'bold', color: 'white' }}>Sign up</Text>
            </Button>
        </View>
    };

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return (
        <AuthenticationModal text={"Create New Account"}>
            <View style={{ flex: 1, borderTopEndRadius: px(70), borderTopStartRadius: px(70), backgroundColor: 'white', height: "100%" }}>
                <View style={{ marginTop: px(20), flexDirection: 'row', justifyContent: 'center' }}>
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
                <Text style={{ color: '#808080', textAlign: 'center' }}>or use your email account</Text>
                <VStack width="100%" maxWidth={300} mx="4" alignSelf={"center"} style={{}}>
                    <FormControl isInvalid={errors.email !== "" || errors.firstName !== "" || errors.lastName !== "" || errors.phone !== ""}>
                        <GestureHandlerRootView>
                            <Carousel
                                width={300}
                                height={height / (carouselIdx === 0 ? 3.4 : 2.3)}
                                enabled={swipeLeft || swipeRight}
                                autoPlayInterval={0}
                                autoPlay={swipeLeft}
                                autoPlayReverse={swipeRight}
                                loop={false}
                                data={[firstCarouselData, secondCarouselData]}
                                // scrollAnimationDuration={1000}
                                onSnapToItem={(index) => {
                                    setSwipeLeft(false);
                                    setSwipeRight(false);
                                    setCarouselIdx(index);
                                }}
                                renderItem={({ item, index }) => (
                                    <View key={index}>
                                        {item.Input1}
                                        {item.Input2}
                                        {item.Input3}
                                        {item.Input4}
                                        {item.Input5}
                                    </View>
                                )}
                            />
                        </GestureHandlerRootView>
                        <TouchableOpacity onPress={() => {
                            if (carouselIdx === 0) {
                                setSwipeLeft(true);
                            } else {
                                setSwipeRight(true);
                            }
                        }} style={{}}>
                            <Ionicons name={`arrow-${carouselIdx === 0 ? "forward" : "back"}-circle-sharp`} size={px(64)} color="red"></Ionicons>
                        </TouchableOpacity>
                    </FormControl>
                    <TouchableOpacity style={{ marginTop: px(10) }} onPress={() => {
                        navigation.navigate("Login" as never)
                    }}>
                        <Text style={{ textShadowColor: '#F0F0F0', textShadowOffset: { width: 0, height: 16 }, textShadowRadius: 4, shadowOpacity: 0.3, fontSize: px(12), color: 'grey' }}>Already have an account?</Text>
                    </TouchableOpacity>
                </VStack>
            </View>
        </AuthenticationModal >

    );
}
