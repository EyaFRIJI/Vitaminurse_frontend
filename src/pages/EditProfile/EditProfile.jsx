import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import { userActions } from "../../redux/userSlice";
import { uiActions } from "../../redux/uiSlice";
import { storeData } from "../../utils/async";

const EditProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [listAllergies, setListAllergies] = useState([]);
  const [listMaladies, setListMaladies] = useState([]);

  useEffect(() => {
    axios.get(Constants.expoConfig.extra.url + "/maladie").then((response) => {
      setListMaladies(response.data);
    });
    axios.get(Constants.expoConfig.extra.url + "/allergie").then((response) => {
      setListAllergies(response.data);
    });
  }, []);

  const { control, getValues } = useForm({
    defaultValues: {
      nom: user.nom,
      prenom: user.prenom,
      poids: user.poids + "",
      taille: user.taille + "",
      date_naissance: new Date(user.date_naissance),
      maladies: user.maladies.map((m) => m._id),
      allergies: user.allergies.map((a) => a._id),
      email: user.email,
      mot_passe: "",
      tel: user.tel,
    },
  });

  const updateAction = () => {
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
      .put(Constants.expoConfig.extra.url + "/user", {
        id: user._id,
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
        dispatch(uiActions.setSuccessMessage("Mise à jour réussie"));
        navigation.navigate("Profile");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier le profil</Text>
      </View>
      <View style={styles.section}>
        <Controller
          control={control}
          name="nom"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Nom :</Text>
              <TextInput
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                placeholder="Nom"
                placeholderTextColor="#888"
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="prenom"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Prénom :</Text>
              <TextInput
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                placeholder="Prénom"
                placeholderTextColor="#888"
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="date_naissance"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Date de naissance :</Text>
              <DateTimePicker
                value={value}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  onChange(selectedDate || value);
                }}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="poids"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Poids(kg) :</Text>
              <TextInput
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="Poids"
                placeholderTextColor="#888"
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="taille"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Taille(cm) :</Text>
              <TextInput
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="Taille"
                placeholderTextColor="#888"
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="tel"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Numéro de téléphone :</Text>
              <TextInput
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                placeholder="Numéro de téléphone"
                placeholderTextColor="#888"
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="maladies"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Maladies :</Text>
              <SectionedMultiSelect
                selectText="Maladies"
                items={listMaladies}
                IconRenderer={Icon}
                uniqueKey="_id"
                onSelectedItemsChange={onChange}
                selectedItems={value}
                styles={{ selectToggle: styles.selectToggle }}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="allergies"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Allergies :</Text>
              <SectionedMultiSelect
                selectText="Allergies"
                items={listAllergies}
                IconRenderer={Icon}
                uniqueKey="_id"
                onSelectedItemsChange={onChange}
                selectedItems={value}
                styles={{ selectToggle: styles.selectToggle }}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Email :</Text>
              <TextInput
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                placeholder="@gmail.com"
                placeholderTextColor="#888"
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="mot_passe"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Text style={styles.label}>Mot de passe :</Text>
              <TextInput
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholder="Mot de passe"
                placeholderTextColor="#888"
              />
            </>
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateAction}>
        <Text style={styles.buttonText}>Modifier</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F1F1F1",
  },
  header: {
    marginBottom: 20,
    padding: 10,
  },
  headerText: {
    color: "#1A4D2E",
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputField: {
    borderColor: "#47a66c",
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    fontSize: 13,
    color: "#000",
  },
  selectToggle: {
    borderColor: "#47a66c",
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    fontSize: 10,
    color: "#000",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#47a66c",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
