import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapboxGL from "@rnmapbox/maps";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { px } from "../hooks/utils";
import { LoginContext } from "./common/login";

export function MapScreen() {
  const nav = useNavigation();
  const concept = useContext(LoginContext);

  const coordinates = [28.04, 45.44];

  return <View style={{ marginLeft: px(12), marginRight: px(12), }}>
    <View style={{ height: px(90), flexDirection: "column", justifyContent: "center", backgroundColor: "#f2f2f2", marginTop: px(16), borderRadius: px(24), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "68 %" }}>
        <TouchableOpacity onPress={() => nav.navigate("Home" as never)} style={{ marginLeft: px(16) }}>
          <MaterialCommunityIcons name="arrow-left" size={px(28)} color="#808080" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "600", fontSize: px(18), color: "#808080" }}>Emergency place</Text>
      </View>
    </View>
    <Text style={{ marginTop: px(32), fontSize: px(20), color: "#FF7276", fontWeight: "600", textAlign: "center", shadowColor: "black", shadowOpacity: 0.3, shadowOffset: { width: 1, height: 1 } }}>Ambulance and response teams are on their way to you</Text>
    <Text style={{ marginTop: px(16), marginBottom: px(16), fontSize: px(16), color: "#808080", fontWeight: "400", shadowColor: "black", shadowOpacity: 0.3, shadowOffset: { width: 1, height: 1 }, textAlign: "center" }}>Try to reach the safest spot until we get to you</Text>
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView style={{ height: px(275) }} zoomEnabled onPress={e => console.log(e)} >
        <MapboxGL.UserLocation
          visible={true}
          onUpdate={(location) => { console.log("location: ", location) }}
          showsUserHeadingIndicator={true}
        />
        <MapboxGL.Camera centerCoordinate={coordinates} zoomLevel={12} />
      </MapboxGL.MapView>
    </View>
    <View style={{ height: px(121), flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#f2f2f2", marginTop: px(275), borderRadius: px(24), shadowColor: "black", shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginLeft: px(8), width: px(55), height: px(55), borderRadius: px(30), borderWidth: 2, borderColor: "#FF7276", marginRight: px(20) }}></View>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: px(16), fontWeight: "600" }}>{concept.value.firstName} {concept.value.lastName}</Text>
          <Text style={{ fontSize: px(12), color: "#808080", marginTop: px(8) }}>Bulevardul Vasile Pârvan 2, Timișoara 300223
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() => { }}
      >
        <Text style={styles.textStyle}>Change location</Text>
      </TouchableOpacity>
    </View>
  </View>
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: px(140),
    // marginTop: px(12)
  },
  buttonClose: {
    backgroundColor: "#FF7276",
  },
  textStyle: {
    position: "relative",
    top: px(8),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  }
});
