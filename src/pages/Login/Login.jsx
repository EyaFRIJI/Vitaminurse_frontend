import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Constants from "expo-constants";
import { userActions } from "../../redux/userSlice";
import axios from "axios";
import { storeData } from "../../utils/async";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const loginAction = () => {
    const { email, mot_passe } = getValues();
    axios
      .post(Constants.expoConfig.extra.url + "/login", { email, mot_passe })
      .then((response) => {
        storeData("user", response.data);
        dispatch(userActions.connecter(response.data));
      })
      .catch((erreur) => {
        alert(erreur.response.data);
      });
  };

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
      mot_passe: "",
    },
  });
  return (
    <View style={{ paddingTop: 50 }}>
      <Text>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              keyboardType="email-address"
              value={value}
              onChangeText={(e) => {
                onChange(e);
              }}
              style={{ borderColor: "#000", borderWidth: 1 }}
              placeholder="Email"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="mot_passe"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              value={value}
              onChangeText={(e) => {
                onChange(e);
              }}
              style={{ borderColor: "#000", borderWidth: 1 }}
              placeholder="Mot de passe"
            />
          );
        }}
      />

      <Button
        title="Submit"
        onPress={() => {
          loginAction();
        }}
      />
      <Button
        title="J'ai pas un compte ! inscrire"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
