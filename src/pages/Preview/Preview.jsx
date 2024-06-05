import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
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
import ConfirmOCR from "../../components/ConfirmOCR/ConfirmOCR";

const Preview = ({ navigation }) => {
  const { images, scannedID, name } = useSelector(
    (state) => state.productSlice
  );
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [imagesPath, setImagesPath] = useState([]);
  const [analyse, setAnalyse] = useState(null);

  const uploadToFireStorage = async () => {
    try {
      dispatch(uiActions.setLoading(true));
      Promise.all(
        images.map(async (image) => {
          const fetchResponse = await fetch(image);
          const theBlob = await fetchResponse.blob();
          const storageRef = ref(
            storage,
            scannedID +
              "_" +
              dayjs().unix() +
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
        const analyse_ocr = {
          images: data,
          user: user._id,
          name: name, // Include product name
        };
        const id = scannedID + "_" + dayjs().unix();
        setDoc(doc(db, "analyse_ocr", id), analyse_ocr)
          .then(async () => {
            const docRef = doc(db, "analyse_ocr", id);
            const docSnap = await getDoc(docRef);
            axios
              .post(Constants.expoConfig.extra.url + "/analyse_ocr", {
                produit: docSnap.data(),
              })
              .then(async (response) => {
                await setDoc(doc(db, "analyse_ocr", id), {
                  ...analyse_ocr,
                  resultat: response.data,
                }).then((res) => {
                  dispatch(uiActions.setLoading(false));
                  dispatch(uiActions.setShowConfirmOCRModal(true));
                  setAnalyse({
                    ...analyse_ocr,
                    id,
                    resultat: response.data,
                  });
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
      <ConfirmOCR analyse={analyse} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {images.length > 0 &&
          images.map((i, index) => (
            <View key={index} style={styles.imageContainer}>
              <Text style={styles.imageLabel}>
                {index === 0 ? "Photo OCR" : `${index + 1}ème photo`}
              </Text>
              <TouchableOpacity
                onLongPress={() => {
                  dispatch(productActions.deleteImage(i));
                }}
              >
                <Image source={{ uri: i }} style={styles.photo} />
              </TouchableOpacity>
            </View>
          ))}
        <Text style={styles.inputLabel}>Nom du produit</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom du produit"
          value={name}
          onChangeText={(e) => {
            dispatch(productActions.setName(e));
          }}
        />
      </ScrollView>

      {images.length < 4 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("Cam");
          }}
        >
          <Text style={styles.buttonText}>Ajouter une autre photo</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (images.length > 0) {
            uploadToFireStorage();
          } else {
            Alert.alert(
              "Erreur",
              "Veuillez ajouter au moins l'image de l'OCR."
            );
          }
        }}
      >
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  scrollView: {
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  imageLabel: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputLabel: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#47a66c",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#FFF",
  },
  addButton: {
    backgroundColor: "#999999",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#47a66c",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    top: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Preview;
