import { Button, Image, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
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
export default function Home({ navigation }) {
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();

  const searchDoc = async () => {
    const docRef = doc(db, "Produits", code.code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      docSnap.data().ocr.map((donnee) => {
        console.log(donnee);
      });
    } else {
      dispatch(uiActions.clearAll());
      dispatch(uiActions.setErrorMessage("Produit inexistant"));
      navigation.navigate("Cam");
    }
  };

  useEffect(() => {
    code !== null && code !== undefined && code.error == null && searchDoc();
    // uploadToFireStorage();
    setCode(null);
  }, [code]);

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
      <Button
        title="Importer Image"
        onPress={async () => {
          navigation.navigate("Cam");
        }}
      />
    </View>
  );
}
