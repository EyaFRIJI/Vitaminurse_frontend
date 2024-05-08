// Importations nécessaires
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/productSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";
import dayjs from "dayjs";
import { uiActions } from "../../redux/uiSlice";
import Constants from "expo-constants";

import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";

const Preview = ({ navigation }) => {
  const { images } = useSelector((state) => state.productSlice);
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [imagesPath, setImagesPath] = useState([]);

  const uploadToFireStorage = async () => {
    try {
      dispatch(uiActions.setLoading(true));
      Promise.all(
        images.map(async (image) => {
          const fetchResponse = await fetch(image);
          const theBlob = await fetchResponse.blob();
          const storageRef = ref(
            storage,
            dayjs().toISOString() +
              "." +
              image.split(".")[image.split(".").length - 1]
          );
          const t = await uploadBytes(storageRef, theBlob).then(
            async (snapshot) => {
              return await getDownloadURL(snapshot.ref).then(
                async (downloadURL) => {
                  setImagesPath([...imagesPath, downloadURL]);
                  return downloadURL;
                }
              );
            }
          );
          return t;
        })
      ).then(async (data) => {
        const produitAAnalyser = {
          images: data,
          user: user._id,
        };
        const id = dayjs().toISOString();
        const a = await setDoc(
          doc(db, "produit_à_analyser", id),
          produitAAnalyser
        )
          .then(async () => {
            const docRef = doc(db, "produit_à_analyser", id);
            const docSnap = await getDoc(docRef);
            axios
              .post(Constants.expoConfig.extra.url + "/analyse_ocr", {
                produit: docSnap.data(),
              })
              .then(async (response) => {
                await setDoc(doc(db, "produit_à_analyser", id), {
                  ...produitAAnalyser,
                  resultat: response.data,
                }).then((res) => {
                  dispatch(uiActions.setLoading(false));
                  console.log(response.data);
                  alert("Demande enregistrée, veillez valider l'OCR svp.");
                });
              })
              .catch((err) => {
                dispatch(uiActions.setLoading(false));
                console.log(err);
              });
          })
          .catch((err) => {
            dispatch(uiActions.setLoading(false));
            console.log(err);
          });
      });
    } catch (error) {
      dispatch(uiActions.setErrorMessage(error.message));
    }
  };

  useEffect(() => {}, [imagesPath]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {images.map((i, index) => (
          <TouchableOpacity
            key={index}
            onLongPress={() => {
              dispatch(productActions.deleteImage(i));
            }}
          >
            <Image source={{ uri: i }} style={styles.photo} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Button
        title="Ajouter une autre image"
        onPress={() => {
          navigation.navigate("Cam");
        }}
      />
      <Button
        title="Enregistrer"
        onPress={() => {
          uploadToFireStorage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default Preview;
