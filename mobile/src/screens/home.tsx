import React, { useContext, useState } from 'react'
import { View, Text, Animated } from 'react-native';
import { LoginContext } from './common/login';
import { useNavigation } from '@react-navigation/native';
import { px } from '../hooks/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function HomeScreen() {
    const concept = useContext(LoginContext);
    const nav = useNavigation();
    const [buttonPressed, setButtonPressed] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [optionsSelected, setOptionsSelected] = useState<("accident" | "injury" | "following")[]>([]);

    const animatedPadding = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (buttonPressed) {
            Animated.timing(
                animatedPadding,
                {
                    toValue: 20,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start(({ finished }) => {
                Animated.timing(
                    animatedPadding,
                    {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false
                    }

                ).start(({ finished }) => {
                    Animated.timing(
                        animatedPadding,
                        {
                            toValue: 20,
                            duration: 1000,
                            useNativeDriver: false
                        }
                    ).start(({ finished }) => {
                        Animated.timing(
                            animatedPadding,
                            {
                                toValue: 0,
                                duration: 1000,
                                useNativeDriver: false
                            }

                        ).start(({ finished }) => {
                            Animated.timing(
                                animatedPadding,
                                {
                                    toValue: 20,
                                    duration: 1000,
                                    useNativeDriver: false
                                }
                            ).start(({ finished }) => {
                                setButtonPressed(false);
                                Animated.timing(
                                    animatedPadding,
                                    {
                                        toValue: 0,
                                        duration: 1000,
                                        useNativeDriver: false
                                    }
                                ).start()
                            })
                        })
                    })
                })
            });
        }

    }, [buttonPressed])

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
            <View style={{ flex: 0.135, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f2f2f2", width: "92%", marginTop: px(16), borderRadius: px(24), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
                <TouchableOpacity style={{ marginLeft: px(8), marginBottom: px(32) }}>
                    <MaterialCommunityIcons name="menu" color="#808080" size={32} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: px(16), }}>Home</Text>
                <View style={{ width: px(55), height: px(55), borderRadius: px(30), borderWidth: 2, borderColor: "#FF7276", marginRight: px(20) }}></View>
            </View>
            <View style={{ flex: 0.11, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f2f2f2", width: "92%", marginTop: px(32), borderRadius: px(24), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
                <View style={{ marginLeft: px(16) }}>
                    <Text>Hello, {concept.value.firstName}</Text>
                    <TouchableOpacity onPress={() => nav.navigate("Profile" as never)} style={{ marginTop: px(8) }}>
                        <Text style={{ color: "#ff7276" }}>Complete your profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginRight: px(16) }}>
                    <Text>Your location</Text>
                    <TouchableOpacity onPress={() => nav.navigate("Map" as never)} style={{ marginTop: px(8) }}>
                        <Text style={{ color: "#ff7276" }}>Current location</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>
                <Text style={{ fontWeight: "bold", fontSize: px(32) }}>Are you in danger?</Text>
                <Text style={{ fontSize: px(12), color: "#808080", shadowColor: "black", shadowOpacity: 0.4, shadowOffset: { height: 2, width: 2 } }}>Press the button below to let us help you shortly</Text>
                <View style={{ height: px(300), position: "relative", top: px(20) }}>
                    <Animated.View style={{ backgroundColor: "#FFE7E9", padding: animatedPadding, borderRadius: px(150) }}>
                        <Animated.View style={{ backgroundColor: "#FFC6C4", padding: animatedPadding, borderRadius: px(150) }}>
                            <TouchableOpacity onPress={() => {
                                setButtonPressed(true);
                                setShowOptions(true);
                                setOptionsSelected([]);
                            }} style={{
                                alignItems: "center", justifyContent: "center", width: px(220), height: px(220), borderRadius: px(180), backgroundColor: "#FF7276"
                            }}>
                                <Text style={{ fontWeight: "bold", fontSize: px(32), color: "white" }}>SOS</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </View>
                <Text style={{ fontSize: px(14), color: "#808080", shadowColor: "black", shadowOpacity: 0.4, shadowOffset: { height: 2, width: 2 } }}>Tell us what happened to you</Text>
                {showOptions && <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    {!optionsSelected.includes("accident") && <TouchableOpacity onPress={() => {
                        optionsSelected.push("accident");
                        setOptionsSelected([...optionsSelected]);
                    }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#f2f2f2", width: px(101), height: px(56), marginTop: px(16), borderRadius: px(12), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
                        <Text style={{ fontSize: px(10), color: "black" }}>I had an accident</Text>
                    </TouchableOpacity>}
                    {!optionsSelected.includes("injury") && <TouchableOpacity onPress={() => {
                        optionsSelected.push("injury");
                        setOptionsSelected([...optionsSelected]);
                    }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#f2f2f2", width: px(101), height: px(56), marginTop: px(16), borderRadius: px(12), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
                        <Text style={{ fontSize: px(10), color: "black" }}>I had an injury</Text>
                    </TouchableOpacity>}
                    {!optionsSelected.includes("following") && <TouchableOpacity onPress={() => {
                        optionsSelected.push("following");
                        setOptionsSelected([...optionsSelected]);
                    }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#f2f2f2", width: px(101), height: px(56), marginTop: px(16), borderRadius: px(12), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
                        <Text style={{ fontSize: px(10), color: "black", textAlign: "center" }}>I am followed by someone</Text>
                    </TouchableOpacity>}
                </View>}
            </View>
        </View>
    );
}
