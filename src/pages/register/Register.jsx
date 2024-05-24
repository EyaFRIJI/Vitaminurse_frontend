import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import Constants from "expo-constants";
import { storeData } from "../../utils/async";
import TextInputField from "../../components/TextInputField/TextInputField";
// import { listAllergies, listMaladies } from "../../utils/healthissue";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [listAllergies, setListAllergies] = useState([]);
  const [listMaladies, setListMaladies] = useState([]);
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      nom: "",
      prenom: "",
      poids: "0",
      taille: "0",
      date_naissance: new Date(),
      maladies: [],
      allergies: [],
      email: "",
      mot_passe: "",
      tel: "",
    },
  });

  useEffect(() => {
    axios.get(Constants.expoConfig.extra.url + "/maladie").then((response) => {
      console.log(response.data);
      setListMaladies(response.data);
    });
    axios.get(Constants.expoConfig.extra.url + "/allergie").then((response) => {
      setListAllergies(response.data);
    });
  }, []);

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

    axios
      .post(Constants.expoConfig.extra.url + "/register", {
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
      })
      .then((response) => {
        storeData("user", response.data);
        dispatch(userActions.inscrire(response.data));
      })
      .catch((error) => {});
  }
  return (
    <View>
      <Text>Register</Text>
      <Controller
        control={control}
        name="nom"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              value={value}
              onChange={onChange}
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
            <TextInputField
              value={value}
              onChange={onChange}
              placeholder="Prénom"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="date_naissance"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <DateTimePicker
              value={value}
              onChange={(e) => {
                onChange(new Date(e.nativeEvent.timestamp));
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="poids"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              value={value}
              onChange={onChange}
              type={"numeric"}
              placeholder={"Poids"}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="taille"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              type="numeric"
              value={value}
              onChange={onChange}
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
            <TextInputField
              type="name-phone-pad"
              value={value}
              onChange={onChange}
              placeholder="Numéro du téléphone"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="maladies"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <SectionedMultiSelect
              selectText="Maladies"
              items={listMaladies}
              IconRenderer={Icon}
              uniqueKey="nom"
              onSelectedItemsChange={(e) => {
                onChange(e);
              }}
              selectedItems={value}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="allergies"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <SectionedMultiSelect
              selectText="Allergies"
              items={listAllergies}
              IconRenderer={Icon}
              uniqueKey="_id"
              onSelectedItemsChange={(e) => {
                onChange(e);
              }}
              selectedItems={value}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              type="email-address"
              value={value}
              onChange={onChange}
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
            <TextInputField
              value={value}
              onChange={onChange}
              type={"password"}
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
      <Button
        title="J'ai un compte ! connecter"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
