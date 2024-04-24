import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
      mot_passe: "",
    },
  });
  return (
    <View>
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

      <Button title="Submit" onPress={() => {}} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
