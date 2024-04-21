import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Register = () => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      nom: "",
      prenom: "",
      poids: 0,
      taille: 0,
      date_naissance: null,
      maladies: [],
      allergies: [],
      email: "",
      mot_passe: "",
      tel: "",
    },
  });

  function SubmitRegister() {
    const {
      nom,
      prenom,
      allergies,
      date_naissance,
      email,
      maladies,
      mot_passe,
      poids,
      taille,
      tel,
    } = getValues();
    alert(nom);
  }
  return (
    <View>
      <Text>Register</Text>
      <Controller
        control={control}
        name="nom"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              value={value}
              onChangeText={(e) => {
                onChange(e);
              }}
              style={{ borderColor: "#000", borderWidth: 1 }}
              placeholder="Nom"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="prenom"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              value={value}
              onChangeText={(e) => {
                onChange(e);
              }}
              style={{ borderColor: "#000", borderWidth: 1 }}
              placeholder="Prénom"
            />
          );
        }}
      />
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
        name="poids"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              keyboardType="numeric"
              value={value}
              onChangeText={(e) => {
                onChange(e);
              }}
              style={{ borderColor: "#000", borderWidth: 1 }}
              placeholder="Poids"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="taille"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              keyboardType="numeric"
              value={value}
              onChangeText={(e) => {
                onChange(e);
              }}
              style={{ borderColor: "#000", borderWidth: 1 }}
              placeholder="Taille"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="tel"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInput
              keyboardType="name-phone-pad"
              value={value}
              onChangeText={(e) => {
                onChange(e);
              }}
              style={{ borderColor: "#000", borderWidth: 1 }}
              placeholder="Numéro du téléphone"
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
          SubmitRegister();
        }}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
