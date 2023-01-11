import { Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Box, FormControl, Input, ScrollView, TextArea } from "native-base";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, StyleSheet, Image } from "react-native";
import { px } from "../hooks/utils";
import { LoginContext } from "./common/login";
// @ts-ignore
import call from 'react-native-phone-call'
import * as ImagePicker from 'expo-image-picker';
import CircularProgress from 'react-native-circular-progress-indicator';

type PersonalInfo = {
    firstName: string;
    lastName: string;
    phone: string;
    birthDate: string;
}

export function ProfileScreen() {
    function subtractWeeks(numOfWeeks: number, date = new Date()) {
        date.setDate(date.getDate() - numOfWeeks * 7);

        return date;
    }

    const concept = useContext(LoginContext);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [bloodTypeModalVisible, setBloodTypeModalVisible] = useState(false);
    const [alergiesModalVisible, setAlergiesModalVisible] = useState(false);
    const [contactsModalVisible, setContactsModalVisible] = useState(false);
    const [contactModalVisible, setContactModalVisible] = useState(false);
    const [contactPhotoModalVisible, setContactPhotoModalVisible] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: concept.value.firstName ?? "",
        lastName: concept.value.lastName ?? "",
        phone: concept.value.phone ?? "",
        birthDate: concept.value.birthDate ?? "",
    });
    const [errors, setErrors] = useState<PersonalInfo>({
        firstName: "",
        lastName: "",
        phone: "",
        birthDate: "",
    });
    const [personalInfoPhoto, setPersonalInfoPhoto] = useState<null | string>(null);
    const [bloodType, setBloodType] = useState<"O1" | "A2" | "B3" | "AB4" | undefined>(
        concept.value.bloodType.startsWith("O1") ? "O1" : concept.value.bloodType.startsWith("A2") ? "A2" : concept.value.bloodType.startsWith("B3") ? "B3" :
            concept.value.bloodType.startsWith("AB4") ? "AB4" : undefined
    );
    const [contactDetails, setContactDetails] = useState({
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [rh, setRh] = useState<"+" | "-" | undefined>(
        concept.value.bloodType.endsWith("+") ? "+" : concept.value.bloodType.endsWith("-") ? "-" : undefined
    );
    const [foodAllergies, setFoodAllergies] = useState(false);
    const [medicationAllergies, setMedicationAllergies] = useState(false);

    const onSubmit = () => {
        let errorsFound = 0;
        // let validationErrors = {
        //     firstName: "",
        //     lastName: "",
        //     phone: "",
        //     birthDate: "",
        // };
        // if (personalInfo.firstName === "") {
        //     validationErrors = { ...validationErrors, firstName: "First name is required" }
        //     errorsFound++;
        // }
        // if (personalInfo.lastName === "") {
        //     validationErrors = {
        //         ...validationErrors,
        //         lastName: "Last name is required"
        //     }
        //     errorsFound++;
        // }
        // console.log(personalInfo.phone)
        // if (personalInfo.phone !== undefined && personalInfo.phone === "") {
        //     validationErrors = {
        //         ...validationErrors,
        //         phone: "Phone is required"
        //     }
        //     errorsFound++;
        // }
        // setErrors(validationErrors);
        if (errorsFound > 0) {
            return;
        } else {
            Alert.alert("Profile saved!")
        }
    }

    return <View style={{ backgroundColor: "white", }}>
        <ScrollView style={{}}>
            <View style={{ height: px(90), flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f2f2f2", marginTop: px(16), borderRadius: px(24), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
                <View style={{ marginLeft: px(8), width: px(55), height: px(55), borderRadius: px(30), borderWidth: 2, borderColor: "#FF7276", marginRight: px(20) }}></View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600", fontSize: px(16) }}>{concept.value.firstName} {concept.value.lastName}</Text>
                    <Text style={{ fontSize: px(12), color: '#808080' }}>{concept.value.birthDate}</Text>
                </View>
                <View style={{ marginRight: px(20) }}>
                    <CircularProgress value={75}
                        valueSuffix="%"
                        progressValueStyle={{ fontSize: px(14) }}
                        radius={30}
                        duration={0}
                        progressValueColor={'#808080'}
                        activeStrokeColor="#FF0000"
                        inActiveStrokeColor="#FF7276"
                        maxValue={100}
                    />
                    <Text style={{ fontSize: px(12), color: '#808080' }}>Completed</Text>
                </View>
            </View>
            <RNDateTimePicker
                display="inline"
                style={{ width: "100%", marginTop: px(16) }}
                mode="date"
                value={new Date()}
                maximumDate={new Date()}
                minimumDate={subtractWeeks(1, new Date())}
            // onChange={(event, value) => {
            //     setDate(value!);
            // }}
            // style={{ backgroundColor: 'transparent', opacity: 0.2 }}
            // textColor={"#808080"}
            // themeVariant={"light"}
            />
            <View style={{ height: px(150), flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f2f2f2", marginTop: px(12), borderRadius: px(24), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
                <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={{ marginLeft: px(12), borderRadius: px(12), borderWidth: px(0.5), borderColor: 'black', width: px(110), height: px(120), justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons color="#FF7276" size={px(48)} name="information-outline" />
                    <Text style={{ marginTop: px(18), color: "#808080" }}>Personal info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setBloodTypeModalVisible(true)} style={{ borderRadius: px(12), borderWidth: px(0.5), borderColor: 'black', width: px(110), height: px(120), justifyContent: 'center', alignItems: 'center' }}>
                    <Fontisto color="#FF7276" size={px(48)} name="blood-drop" />
                    <Text style={{ marginTop: px(18), color: "#808080" }}>Blood Group</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAlergiesModalVisible(true)} style={{ marginRight: px(12), borderRadius: px(12), borderWidth: px(0.5), borderColor: 'black', width: px(110), height: px(120), justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons color="#FF7276" size={px(48)} name="hospital-box-outline" />
                    <Text style={{ marginTop: px(18), color: "#808080" }}>Allergies</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={infoModalVisible}
                onRequestClose={() => {
                    setInfoModalVisible(!infoModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{}}>
                            <Image source={require("../../assets/personal-information.jpg")} style={{ width: px(150), height: px(150) }} />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: px(30), borderTopLeftRadius: px(32), borderTopRightRadius: px(32), backgroundColor: "#f2f2f2", shadowColor: "black", shadowOpacity: 0.8, shadowOffset: { width: 2, height: 2 } }}>
                            <Text style={{ fontSize: px(32), fontWeight: "bold" }}>Personal Information</Text>
                            <View style={{ marginTop: px(24) }} />
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: px(24) }}>
                                {personalInfoPhoto ?
                                    <Image source={{ uri: personalInfoPhoto }} style={{ width: px(100), height: px(100), borderWidth: px(2), borderRadius: px(50), borderColor: "#FF7276" }} />
                                    :
                                    <View style={{ marginLeft: px(-24), justifyContent: 'center', borderWidth: px(2), borderColor: "#808080", borderRadius: px(100), width: px(100), height: px(100) }}>
                                        <MaterialCommunityIcons style={{ alignSelf: "center", marginBottom: px(7) }}
                                            name="account"
                                            size={px(72)}
                                            color="#808080" />
                                    </View>}
                                <Text style={{ fontSize: px(14), color: "#808080", fontWeight: "600", width: px(160), marginLeft: px(10), marginRight: px(10) }}>Capture or select your own image</Text>
                                <TouchableOpacity style={{ height: px(48), width: px(48) }} onPress={async () => {
                                    let result = await ImagePicker.launchImageLibraryAsync({
                                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                                        allowsEditing: true,
                                        aspect: [4, 3],
                                        quality: 1,
                                    });
                                    if (!result.canceled) {
                                        setPersonalInfoPhoto(result.assets[0].uri);
                                    }
                                }}>
                                    <MaterialIcons style={{ alignSelf: 'center', color: '#808080' }} color="#808080" size={px(48)} name="add-a-photo" />
                                </TouchableOpacity>
                            </View>
                            <Input
                                leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                    name="account"
                                    size={px(24)}
                                    color="#808080" />}
                                height={px(40)}
                                value={personalInfo.firstName}
                                borderRadius={px(24)}
                                _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                                placeholder="First name"
                                onChangeText={value => setPersonalInfo({
                                    ...personalInfo,
                                    firstName: value
                                })}
                            />
                            {errors.firstName.length ? <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage> : <></>}
                            {''}
                            <View style={{ marginTop: px(24) }} />
                            <Input
                                leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                    name="account"
                                    size={px(24)}
                                    color="#808080" />}
                                height={px(40)}
                                value={personalInfo.lastName}
                                borderRadius={px(24)}
                                _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                                placeholder="Last name"
                                onChangeText={value => setPersonalInfo({
                                    ...personalInfo,
                                    lastName: value
                                })} />
                            {''}
                            {errors.lastName.length ? <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage> : <></>}
                            <View style={{ marginTop: px(24) }} />
                            <Input
                                leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                    name="phone"
                                    size={px(24)}
                                    color="#808080" />}
                                height={px(40)}
                                value={personalInfo.phone}
                                borderRadius={px(24)}
                                _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                                placeholder="Phone number"
                                onChangeText={value => {
                                    setPersonalInfo({
                                        ...personalInfo,
                                        phone: value
                                    });
                                }} />
                            {errors.phone.length ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : <></>}
                            <View style={{ marginTop: px(24) }} />
                            <View style={{ flexDirection: 'row', borderColor: 'lightgray', borderWidth: px(1), width: 300, borderRadius: px(20) }}>
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
                            <View style={{ marginTop: px(24) }} />
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => onSubmit()}
                                >
                                    <Text style={styles.textStyle}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setInfoModalVisible(!infoModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={bloodTypeModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setBloodTypeModalVisible(!bloodTypeModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { width: "92%", flexDirection: "column" }]}>
                        <Image source={require("../../assets/blood-type.jpg")} style={{ marginBottom: px(20), width: px(180), height: px(180) }} />

                        <View style={{ marginTop: px(-50), borderRadius: px(24), backgroundColor: "#f2f2f2", width: "100%", flexGrow: 1 }}>
                            <Text style={{ fontSize: px(24), marginTop: px(16), fontWeight: "bold", textAlign: "center" }}>Pick your blood group</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                                <TouchableOpacity onPress={() => setBloodType("O1")} style={{ marginTop: px(24), alignItems: "center", justifyContent: "center", width: px(140), height: px(110), borderRadius: px(12), backgroundColor: bloodType === "O1" ? "#FF7276" : "#FFB6C1" }}>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: px(42) }}>O1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setBloodType("A2")} style={{ marginTop: px(24), alignItems: "center", justifyContent: "center", width: px(140), height: px(110), borderRadius: px(12), backgroundColor: bloodType === "A2" ? "#FF7276" : "#FFB6C1" }}>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: px(42) }}>A2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setBloodType("B3")} style={{ marginTop: px(24), alignItems: "center", justifyContent: "center", width: px(140), height: px(110), borderRadius: px(12), backgroundColor: bloodType === "B3" ? "#FF7276" : "#FFB6C1" }}>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: px(42) }}>B3</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setBloodType("AB4")} style={{ marginTop: px(24), alignItems: "center", justifyContent: "center", width: px(140), height: px(110), borderRadius: px(12), backgroundColor: bloodType === "AB4" ? "#FF7276" : "#FFB6C1" }}>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: px(42) }}>AB4</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => setRh("+")} style={{ marginTop: px(24), alignItems: "center", justifyContent: "center", width: px(50), height: px(50), borderRadius: px(8), backgroundColor: rh === "+" ? "#FF7276" : "#FFB6C1" }}>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: px(24) }}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setRh("-")} style={{ marginLeft: px(16), marginTop: px(24), alignItems: "center", justifyContent: "center", width: px(50), height: px(50), borderRadius: px(8), backgroundColor: rh === "-" ? "#FF7276" : "#FFB6C1" }}>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: px(24) }}>-</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ justifyContent: "space-around", flexDirection: "row", marginTop: px(24) }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setBloodTypeModalVisible(!bloodTypeModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, {}]}
                                    onPress={() => setBloodTypeModalVisible(!bloodTypeModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={alergiesModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setAlergiesModalVisible(!alergiesModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <View style={{ marginLeft: px(20), marginRight: px(20), flexGrow: 1 }}>
                            <Text style={{ fontWeight: "600", fontSize: px(24), textAlign: "center", marginTop: px(24), color: "#808080" }}>Do you have any food allergies?</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: px(24) }}>
                                {!foodAllergies && <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, { borderRadius: px(8), width: px(80) }]}
                                    onPress={() => setFoodAllergies(true)}
                                >
                                    <Text style={styles.textStyle}>YES</Text>
                                </TouchableOpacity>}
                                {!foodAllergies && <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, { borderRadius: px(8), width: px(80) }]}
                                    onPress={() => setFoodAllergies(false)}
                                >
                                    <Text style={styles.textStyle}>NO</Text>
                                </TouchableOpacity>}
                            </View>
                            {foodAllergies ? <Box alignItems="center" w="100%" style={{ marginTop: px(24), }}>
                                <TextArea autoCompleteType={null} placeholder="Your food allergies" maxW="315" />
                            </Box> : <Box alignItems="center" w="100%" style={{ marginTop: px(24) }}>

                            </Box>}
                            <Text style={{ fontWeight: "600", fontSize: px(24), textAlign: "center", marginTop: px(24), color: "#808080" }}>Do you have any medication allergies?</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: px(24) }}>
                                {!medicationAllergies && <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, { borderRadius: px(8), width: px(80) }]}
                                    onPress={() => setMedicationAllergies(true)}
                                >
                                    <Text style={styles.textStyle}>YES</Text>
                                </TouchableOpacity>}
                                {!medicationAllergies && <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, { borderRadius: px(8), width: px(80) }]}
                                    onPress={() => setMedicationAllergies(false)}
                                >
                                    <Text style={styles.textStyle}>NO</Text>
                                </TouchableOpacity>}
                            </View>
                            {medicationAllergies && <Box alignItems="center" w="100%" style={{ marginTop: px(24) }}>
                                <TextArea autoCompleteType={null} placeholder="Your medication allergies" maxW="315" />
                            </Box>}
                            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: px(24) }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setAlergiesModalVisible(!alergiesModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setAlergiesModalVisible(!alergiesModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: px(32), marginBottom: px(16) }}>
                <Text style={{ color: 'black', marginLeft: px(16), fontSize: px(16), fontWeight: "600" }}>Quick contacts</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => {
                        const args = {
                            number: '+40722260058',
                            prompt: true,
                            skipCanOpen: true
                        }
                        call(args).catch(console.error)
                    }} onLongPress={() => setContactsModalVisible(true)} style={{ backgroundColor: "#f6f6f6", marginLeft: px(12), marginTop: px(12), borderRadius: px(12), borderWidth: px(0.5), borderColor: 'black', width: px(160), height: px(160), justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginTop: px(12), width: px(65), height: px(65), borderRadius: px(35), borderWidth: 2, borderColor: "#FF7276" }}></View>
                        <Text style={{ marginTop: px(8), color: "#808080" }}>{concept.value.firstName} {concept.value.lastName}</Text>
                        <Text style={{ marginTop: px(8), color: "#808080" }}>0393737</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#f6f6f6", marginLeft: px(24), marginTop: px(12), borderRadius: px(12), borderWidth: px(0.5), borderColor: 'black', width: px(160), height: px(160), justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginTop: px(12), width: px(65), height: px(65), borderRadius: px(35), borderWidth: 2, borderColor: "#FF7276" }}></View>
                        <Text style={{ marginTop: px(8), color: "#808080" }}>{concept.value.firstName} {concept.value.lastName}</Text>
                        <Text style={{ marginTop: px(8), color: "#808080" }}>{concept.value.phone}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#f6f6f6", marginLeft: px(24), marginTop: px(12), borderRadius: px(12), borderWidth: px(0.5), borderColor: 'black', width: px(160), height: px(160), justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginTop: px(12), width: px(65), height: px(65), borderRadius: px(35), borderWidth: 2, borderColor: "#FF7276" }}></View>
                        <Text style={{ marginTop: px(8), color: "#808080" }}>{concept.value.firstName} {concept.value.lastName}</Text>
                        <Text style={{ marginTop: px(8), color: "#808080" }}>{concept.value.phone}</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={contactsModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setContactsModalVisible(!contactsModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => setContactPhotoModalVisible(true)} style={{ marginLeft: px(8) }}>
                                {image ?
                                    <Image source={{ uri: image }} style={{ marginTop: px(24), width: px(148), height: px(148), borderRadius: px(75), borderWidth: 2, borderColor: "#FF7276", marginRight: px(20) }}></Image>
                                    :
                                    <View style={{ marginTop: px(24), width: px(150), height: px(150), borderRadius: px(75), borderWidth: 2, borderColor: "#FF7276", marginRight: px(20) }}></View>}
                            </TouchableOpacity>
                            <Text style={{ marginTop: px(24), color: '#808080', fontSize: px(24), fontWeight: '400' }}>{concept.value.firstName} {concept.value.lastName}</Text>
                            <Text style={{ marginTop: px(24), color: '#808080', fontSize: px(18), fontWeight: '400' }}>0393837373737</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: px(350) }}>
                                <View>
                                    <TouchableOpacity onPress={() => setContactModalVisible(true)} style={{ marginTop: px(24), borderWidth: px(0.5), borderColor: "#808080", padding: px(12), borderRadius: px(12) }}>
                                        <Text>Change contact details</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        const args = {
                                            number: '+40722260058',
                                            prompt: true,
                                            skipCanOpen: true
                                        }
                                        call(args).catch(console.error)
                                    }} style={{ flex: 0.31, justifyContent: 'center', marginTop: px(12), borderWidth: px(1), borderColor: "#808080", borderRadius: px(50), width: px(80), height: px(80) }}>
                                        <MaterialCommunityIcons style={{ alignSelf: 'center', color: '#FF7276' }} name="phone" size={px(48)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={contactModalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setContactModalVisible(!contactModalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={[styles.modalView1, { paddingTop: 0, paddingBottom: 0, flexGrow: 1 }]}>
                                        <View style={{}}>
                                            <Image source={require("../../assets/personal-information.jpg")} style={{ width: px(150), height: px(150) }} />
                                        </View>
                                        <Input
                                            leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                                name="account"
                                                size={px(24)}
                                                color="#808080" />}
                                            height={px(40)}
                                            value={contactDetails.firstName}
                                            borderRadius={px(24)}
                                            _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                                            placeholder="First name"
                                            onChangeText={value => setContactDetails({
                                                ...contactDetails,
                                                firstName: value
                                            })}
                                        />
                                        {/* {errors.firstName.length ? <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage> : <></>} */}
                                        {''}
                                        <View style={{ marginTop: px(24) }} />
                                        <Input
                                            leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                                name="account"
                                                size={px(24)}
                                                color="#808080" />}
                                            height={px(40)}
                                            value={contactDetails.lastName}
                                            borderRadius={px(24)}
                                            _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                                            placeholder="Last name"
                                            onChangeText={value => setContactDetails({
                                                ...contactDetails,
                                                lastName: value
                                            })} />
                                        {''}
                                        {/* {errors.lastName.length ? <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage> : <></>} */}
                                        <View style={{ marginTop: px(24) }} />
                                        <Input
                                            leftElement={<MaterialCommunityIcons style={{ marginLeft: px(10) }}
                                                name="phone"
                                                size={px(24)}
                                                color="#808080" />}
                                            height={px(40)}
                                            value={contactDetails.phone}
                                            borderRadius={px(24)}
                                            _focus={{ style: { backgroundColor: "#F8F8F8" } }}
                                            placeholder="Phone number"
                                            onChangeText={value => {
                                                setContactDetails({
                                                    ...contactDetails,
                                                    phone: value
                                                });
                                            }} />
                                        {errors.phone.length ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : <></>}
                                        <View style={{ marginTop: px(24) }} />
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: px(250) }}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setContactModalVisible(!contactModalVisible)}
                                            >
                                                <Text style={styles.textStyle}>Save</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setContactModalVisible(!contactModalVisible)}
                                            >
                                                <Text style={styles.textStyle}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={contactPhotoModalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setContactPhotoModalVisible(!contactPhotoModalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView1}>
                                        <Text>Choose photo from library</Text>
                                        <TouchableOpacity onPress={async () => {
                                            let result = await ImagePicker.launchImageLibraryAsync({
                                                mediaTypes: ImagePicker.MediaTypeOptions.All,
                                                allowsEditing: true,
                                                aspect: [4, 3],
                                                quality: 1,
                                            });
                                            if (!result.canceled) {
                                                setImage(result.assets[0].uri);
                                            }
                                        }} style={{ flex: 1, justifyContent: 'center', marginTop: px(24), borderWidth: px(2), borderColor: "#808080", borderRadius: px(100), width: px(100), height: px(100) }}>
                                            <MaterialIcons style={{ alignSelf: 'center', color: '#808080' }} color="#808080" size={px(64)} name="add-a-photo" />
                                        </TouchableOpacity>
                                        <View style={{ width: px(300), marginTop: px(24), flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setContactPhotoModalVisible(!contactPhotoModalVisible)}
                                            >
                                                <Text style={styles.textStyle}>Save</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setContactPhotoModalVisible(!contactPhotoModalVisible)}
                                            >
                                                <Text style={styles.textStyle}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose, { marginBottom: px(100) }]}
                                onPress={() => setContactsModalVisible(!contactsModalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            {/* <View style={{ flex: 1, backgroundColor: 'red' }}> */}
        </ScrollView>

        {/* </View> */}
    </View>
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginTop: px(150),
        // flex: 1,
        flexDirection: "column",
        // width: "92%",
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5
    },
    modalView1: {
        marginTop: px(375),
        backgroundColor: "white",
        borderRadius: 20,
        padding: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 20,
        elevation: 2,
        width: px(100)
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#FF7276",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});