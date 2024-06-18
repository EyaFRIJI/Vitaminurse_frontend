import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Constants from "expo-constants";
import { userActions } from "../../redux/userSlice";
import axios from "axios";
import { storeData } from "../../utils/async";
import { Ionicons } from "@expo/vector-icons";

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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.header}>Vitaminurse</Text>
        <Text style={styles.subtitle}>Connectez-vous</Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#47a66c"
          style={styles.icon}
        />
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInput
              keyboardType="email-address"
              value={value}
              onChangeText={(e) => onChange(e)}
              style={[styles.inputField, error && styles.errorBorder]}
              placeholder="Entrez votre email"
              placeholderTextColor="#888"
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#47a66c"
          style={styles.icon}
        />
        <Text style={styles.label}>Mot de passe</Text>
        <Controller
          control={control}
          name="mot_passe"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInput
              value={value}
              onChangeText={(e) => onChange(e)}
              style={[styles.inputField, error && styles.errorBorder]}
              placeholder="Entrez votre mot de passe"
              placeholderTextColor="#888"
              secureTextEntry
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.button1}
        onPress={handleSubmit(loginAction)}
      >
        <Text style={styles.buttonText1}>Se Connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText2}>Créer un compte</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("FirstView")}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color="#47a66c"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: -170,
    top: 100,
  },
  backButtonText: {
    top: -21,
    left: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    left: 10,
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
  header: {
    fontSize: 32,
    color: "#1A4D2E",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 25,
    position: "relative",
  },
  label: {
    fontSize: 18,
    color: "#1A4D2E",
    marginBottom: 5,
    fontWeight: "bold",
    left: 33,
  },
  inputField: {
    borderColor: "#47a66c",
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
    color: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  errorBorder: {
    borderColor: "red",
  },
  button1: {
    backgroundColor: "#47a66c",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
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
  },
  buttonText2: {
    fontSize: 18,
  },
});
