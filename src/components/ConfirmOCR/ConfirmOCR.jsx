import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/uiSlice";
import { db, storage } from "../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { productActions } from "../../redux/productSlice";

const ConfirmOCR = ({ analyse, navigation }) => {
  const { showConfirmOCRModal } = useSelector((state) => state.uiSlice);
  const { analyse_ocr } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();
  const [text_ocr, setTextOcr] = useState(
    analyse !== null ? analyse.resultat : ""
  );

  useEffect(() => {
    analyse && setTextOcr(analyse.resultat);
  }, [analyse]);

  const actionSubmit = (action) => {
    analyse
      ? setDoc(doc(db, "analyse_ocr", analyse.id), {
          ...analyse,
          resultat_by_user: text_ocr,
          validate_by_user: action === "confirmer" ? true : false,
        }).then(() => {
          dispatch(
            action === "confirmer"
              ? uiActions.setSuccessMessage("Demande enregistreé avec succés")
              : uiActions.setErrorMessage("Validation annulée")
          );
          dispatch(productActions.clearImages());
          dispatch(productActions.setName(""));
          navigation.navigate("Home");
        })
      : alert("null");
  };

  return (
    <Modal
      onTouchCancel={() => {
        dispatch(uiActions.setShowConfirmOCRModal(false));
      }}
      animationType={"slide"}
      transparent={true}
      visible={showConfirmOCRModal}
      onRequestClose={() => {
        dispatch(uiActions.setShowConfirmOCRModal(false));
      }}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.text}
              value={text_ocr}
              onChangeText={(text) => {
                setTextOcr(text);
              }}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Confirmer"
                onPress={() => {
                  dispatch(uiActions.setShowConfirmOCRModal(false));
                  actionSubmit("confirmer");
                }}
              />
              <Button
                title="Annuler"
                onPress={() => {
                  dispatch(uiActions.setShowConfirmOCRModal(false));
                  actionSubmit("annuler");
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ConfirmOCR;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9e9e9dd",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    left: 40,
  },
});
