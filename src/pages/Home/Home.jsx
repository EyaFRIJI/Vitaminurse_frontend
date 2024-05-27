import { Button, Image, Text, Alert, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../../utils/async";
import SearchBar from "../../components/SearchBar/SearchBar";
import pickImage from "../../utils/uploadImage";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { uiActions } from "../../redux/uiSlice";
import { db, storage } from "../../../firebaseConfig";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { productActions } from "../../redux/productSlice";
import ConfirmOCR from "../../components/ConfirmOCR/ConfirmOCR";
import axios from "axios";
import Constants from "expo-constants";
import { userActions } from "../../redux/userSlice";

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
      docSnap.data().ocr.map((donnee) => {
        // console.log(donnee);
      });
    } else {
      dispatch(productActions.setScannedId(code.code));
      dispatch(uiActions.clearAll());
      dispatch(uiActions.setErrorMessage("Nonexistent product"));
      setNewP(true);
    }
  };

  useEffect(() => {
    code !== null && code !== undefined && code.error == null && searchDoc();
    //uploadToFireStorage();
  }, [code]);

  useEffect(() => {
    if (newP) {
      Alert.alert(
        "Title",
        `Le produit avec le code ${code.code} est inexistant.`,
        [
          {
            text: "Cancel",
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
    <View>
      <Button
        title="Rechercher des produits"
        onPress={() => {
          navigation.navigate("ListProducts");
        }}
      />
      <Button
        title="Ouvrir Camera"
        onPress={() => {
          navigation.navigate("CameraScreen");
        }}
      />
      <Button
        title="Importer Image"
        onPress={async () => {
          const s = await pickImage(dispatch);
          setCode(s);
        }}
      />
      {/* <Button
        title="Importer Image"
        onPress={async () => {
          navigation.navigate("Cam");
        }}
      /> */}
    </View>
  );
}
