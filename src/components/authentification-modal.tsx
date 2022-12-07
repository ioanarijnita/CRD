import React from "react";
import { View, TouchableWithoutFeedback, Keyboard, Image, KeyboardAvoidingView, Text } from "react-native";
import { px } from "../hooks/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function AuthenticationModal(props: { children: JSX.Element }) {
    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        <View style={{ backgroundColor: '#FF7276', flex: 1 }}>
            <View style={{ backgroundColor: '#FF7276', height: "35%" }}>
                <Image style={{ marginTop: px(8), alignSelf: 'center', height: 200, borderRadius: px(120) }} source={require('../../assets/em2.jpg')} />
            </View>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {props.children}
            </KeyboardAwareScrollView>
        </View>
    </TouchableWithoutFeedback>
}
