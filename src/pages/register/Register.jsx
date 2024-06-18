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
import DateTimePicker from "@react-native-community/datetimepicker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import Constants from "expo-constants";
import { storeData } from "../../utils/async";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [listAllergies, setListAllergies] = useState([]);
  const [listMaladies, setListMaladies] = useState([]);

  const schema = yup.object().shape({
    nom: yup.string().required("Nom est requis"),
    prenom: yup.string().required("Prénom est requis"),
    taille: yup
      .number()
      .typeError("Taille doit être un nombre")
      .max(
        299,
        "Saisir taille loqigue qui doit avoir au maximum 3 chiffre et ne depasse pas 299."
      )
      .min(
        19,
        "Saisir taille logique qui doit avoir au minimum 2 chiffre et moins que 20."
      )
      .required("Taille est requise"),
    poids: yup
      .number()
      .typeError("Poids doit être un nombre")
      .max(
        299,
        "Saisir poids loqigue qui doit avoir au maximum 3 chiffre et ne depasse pas 299."
      )
      .min(
        20,
        "Saisir poids logique qui doit avoir au minimum 2 chiffre et moins que 20."
      )
      .required("Poids est requis"),
    tel: yup.string().required("Numéro de téléphone est requis"),
    email: yup.string().email("Email invalide").required("Email est requis"),
    mot_passe: yup
      .string()
      .min(6, "Mot de passe doit avoir au moins 6 caractères")
      .required("Mot de passe est requis"),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nom: "",
      prenom: "",
      poids: "",
      taille: "",
      date_naissance: new Date(),
      maladies: [],
      allergies: [],
      email: "",
      mot_passe: "",
      tel: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios.get(Constants.expoConfig.extra.url + "/maladie").then((response) => {
      setListMaladies(response.data);
    });
    axios.get(Constants.expoConfig.extra.url + "/allergie").then((response) => {
      setListAllergies(response.data);
    });
  }, []);

  const SubmitRegister = () => {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.header}>Vitaminurse</Text>
        <Text style={styles.subtitle}>Créez un compte</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Controller
            control={control}
            name="nom"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Nom :</Text>
                <TextInput
                  style={[styles.inputField, errors.nom && styles.errorInput]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nom"
                  placeholderTextColor="#888"
                />
                {errors.nom && (
                  <Text style={styles.errorText}>{errors.nom.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="prenom"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Prénom :</Text>
                <TextInput
                  style={[
                    styles.inputField,
                    errors.prenom && styles.errorInput,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Prénom"
                  placeholderTextColor="#888"
                />
                {errors.prenom && (
                  <Text style={styles.errorText}>{errors.prenom.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="date_naissance"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Date de naissance :</Text>
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display="default"
                  onChange={(e, selectedDate) => {
                    onChange(selectedDate || value);
                  }}
                  style={styles.datePicker}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="poids"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Poids(kg) :</Text>
                <TextInput
                  style={[styles.inputField, errors.poids && styles.errorInput]}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  placeholder="Poids"
                  placeholderTextColor="#888"
                />
                {errors.poids && (
                  <Text style={styles.errorText}>{errors.poids.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="taille"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Taille(cm) :</Text>
                <TextInput
                  style={[
                    styles.inputField,
                    errors.taille && styles.errorInput,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  placeholder="Taille"
                  placeholderTextColor="#888"
                />
                {errors.taille && (
                  <Text style={styles.errorText}>{errors.taille.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="tel"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Numéro de téléphone :</Text>
                <TextInput
                  style={[styles.inputField, errors.tel && styles.errorInput]}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  placeholder="Numéro de téléphone"
                  placeholderTextColor="#888"
                />
                {errors.tel && (
                  <Text style={styles.errorText}>{errors.tel.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="maladies"
            render={({ field: { value, onChange } }) => (
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
            render={({ field: { value, onChange } }) => (
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
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Email :</Text>
                <TextInput
                  style={[styles.inputField, errors.email && styles.errorInput]}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  placeholder="@gmail.com"
                  placeholderTextColor="#888"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="mot_passe"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Mot de passe :</Text>
                <TextInput
                  style={[
                    styles.inputField,
                    errors.mot_passe && styles.errorInput,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  placeholder="Mot de passe"
                  placeholderTextColor="#888"
                />
                {errors.mot_passe && (
                  <Text style={styles.errorText}>
                    {errors.mot_passe.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.button1}
          onPress={handleSubmit(SubmitRegister)}
        >
          <Text style={styles.buttonText1}>Créer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText2}>Vous avez déjà un compte!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    color: "#1A4D2E",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 120,
  },
  label: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputField: {
    borderColor: "#47a66c",
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    fontSize: 12,
    backgroundColor: "#FFF",
    color: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  datePicker: {
    width: "100%",
    marginBottom: 10,
  },
  selectToggle: {
    marginBottom: 10,
    borderColor: "#47a66c",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    fontSize: 12,
    backgroundColor: "#FFF",
    color: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  section: {
    width: "100%",
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  button1: {
    backgroundColor: "#47a66c",
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginTop: -15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  buttonText1: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  button2: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    fontWeight: "bold",
    marginBottom: 50,
    marginTop: 10,
  },
  buttonText2: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
});
