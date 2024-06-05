import {
  Button,
  Image,
  Text,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import pickImage from "../../utils/uploadImage";
import { useEffect, useState } from "react";
import { uiActions } from "../../redux/uiSlice";
import { db } from "../../../firebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import Constants from "expo-constants";
import { userActions } from "../../redux/userSlice";
import { productActions } from "../../redux/productSlice";
import { doc, getDoc } from "firebase/firestore";

export default function Home({ navigation }) {
  const [code, setCode] = useState(null);
  const [newP, setNewP] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  const searchDoc = async () => {
    const docRef = doc(db, "Produits", code.code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      axios
        .put(Constants.expoConfig.extra.url + "/add_action", {
          action: { products: [code.code], type: "Scann" },
          id: user._id,
        })
        .then((response) => {
          dispatch(userActions.inscrire(response.data));
          navigation.navigate("InfoProduct", { code: code.code });
        })
        .catch((error) => {});
    } else {
      dispatch(productActions.setScannedId(code.code));
      dispatch(uiActions.clearAll());
      dispatch(uiActions.setErrorMessage("Produit introuvable"));
      setNewP(true);
    }
  };

  useEffect(() => {
    code !== null && code !== undefined && code.error == null && searchDoc();
  }, [code]);

  useEffect(() => {
    if (newP) {
      Alert.alert(
        "Produit introuvable",
        `Le produit avec le code ${code.code} est inexistant. Voulez-vous l'ajouter ?`,
        [
          {
            text: "Annuler",
            onPress: () => {
              navigation.navigate("Home");
              setCode(null);
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Cam");
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
      setNewP(false);
    }
  }, [newP]);

  return (
    <ImageBackground
      source={require("../../assets/logo.png")}
      style={styles.background}
      imageStyle={styles.logoBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Bienvenue </Text>
            <Text style={styles.description}>
              Vitaminurse, l'application mobile qui vous aide à connaître le
              contenu OCR et les ingrédients des produits alimentaires.
              Découvrez également la compatibilité entre votre profil et les
              produits scannés grâce à notre test de compatibilité basé sur le
              code-barres.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ListProducts")}
            >
              <Icon name="search" size={30} color="#fff" />
              <Text style={styles.buttonText1}>Rechercher des produits</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CameraScreen")}
            >
              <Icon
                style={styles.Icon}
                name="camera-alt"
                size={30}
                color="#fff"
              />
              <Text style={styles.buttonText}>Ouvrir Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const s = await pickImage(dispatch);
                setCode(s);
              }}
            >
              <Icon style={styles.Icon} name="photo" size={30} color="#fff" />
              <Text style={styles.buttonText}>Importer Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Icon: {
    left: -30,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
  },
  logoBackground: {
    opacity: 0.1,
    resizeMode: "contain",
    position: "absolute",
    width: 280,
    height: 300,
    left: 60,
    top: 200,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#47a66c",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#47a66c",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText1: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    right: 25,
  },
});
