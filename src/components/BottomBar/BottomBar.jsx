import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as RootNavigation from "../../../RootNavigation";
import { storeData } from "../../utils/async";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";

const BottomBar = ({}) => {
  const [routeName, setRouteName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setRouteName(RootNavigation.navigationRef.getCurrentRoute().name);
  }, []);

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: 60,
        bottom: 0,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 60,
      }}
    >
      <TouchableOpacity
        style={{ right: 50 }}
        onPress={() => {
          RootNavigation.navigate("Home");
          setRouteName("Home");
        }}
      >
        <Ionicons
          name="home"
          size={routeName === "Home" ? 35 : 25}
          color={routeName === "Home" ? "#5ba5ff" : "grey"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ right: 55 }}
        onPress={() => {
          RootNavigation.navigate("CameraScreen");
          setRouteName("CameraScreen");
        }}
      >
        <Ionicons
          name="camera"
          size={routeName === "Cam" ? 35 : 25}
          color={routeName === "Cam" ? "#5ba5ff" : "grey"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ right: 65 }}
        onPress={() => {
          setRouteName("ListProducts");
          RootNavigation.navigate("ListProducts");
        }}
      >
        <Ionicons
          name="search"
          size={routeName === "ListProducts" ? 35 : 25}
          color={routeName === "ListProducts" ? "#5ba5ff" : "grey"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: "absolute", right: 90 }}
        onPress={() => {
          setRouteName("Profile");
          RootNavigation.navigate("Profile");
        }}
      >
        <Ionicons
          name="person"
          size={routeName === "Profile" ? 35 : 25}
          color={routeName === "Profile" ? "#5ba5ff" : "grey"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: "absolute", right: 20 }}
        onPress={() => {
          storeData("user", null);
          dispatch(userActions.deconnecter());
        }}
      >
        <Ionicons name="log-out" size={35} color={"#F00"} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
