import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
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
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e9e9e9dd",
          height: "100%",
          width: "100%",
        }}
      >
        <View>
          <TextInput
            value={text_ocr}
            onChangeText={(text) => {
              setTextOcr(text);
            }}
          />
          <Button
            title="Annuler"
            onPress={() => {
              dispatch(uiActions.setShowConfirmOCRModal(false));
              actionSubmit("annuler");
            }}
          />
          <Button
            title="Confirmer"
            onPress={() => {
              dispatch(uiActions.setShowConfirmOCRModal(false));
              actionSubmit("confirmer");
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmOCR;

const styles = StyleSheet.create({});
