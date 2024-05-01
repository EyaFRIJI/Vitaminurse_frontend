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

  useEffect(() => {
    code !== null && code.error == null && uploadToFireStorage();
    setCode(null);
  }, [code]);

  const uploadToFireStorage = async () => {
    try {
      const fetchResponse = await fetch(code.uri);
      const theBlob = await fetchResponse.blob();
      const storageRef = ref(
        storage,
        dayjs().toISOString() +
          "." +
          code.uri.split(".")[code.uri.split(".").length - 1]
      );
      await uploadBytes(storageRef, theBlob).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          imageURL = downloadURL;
          const product = {
            name: "name",
            price: 155,
            image: imageURL,
            category: "categorcategoryy",
            deletedAt: "",
            ocr: { calcuim: 18, proteine: 1220 },
          };
          const collectionRef = collection(db, "product");
          setDoc(doc(db, "product", code.code), product).then((docRef) => {
            console.log(docRef);
          });
        });
      });
    } catch (error) {
      dispatch(uiActions.setErrorMessage(error.message));
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Déconnecter"
        onPress={() => {
          storeData("user", null);
          dispatch(userActions.deconnecter());
        }}
      />
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
