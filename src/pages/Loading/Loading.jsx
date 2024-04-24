import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userActions } from "../../redux/userSlice";

const Loading = () => {
  const [storedData, setStoredData] = useState(undefined);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value) {
        dispatch(userActions.connecter(JSON.parse(value)));
        setStoredData(value);
      } else {
        dispatch(userActions.deconnecter());
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../assets/loading.gif")}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
