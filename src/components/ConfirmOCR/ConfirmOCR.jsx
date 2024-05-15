import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/uiSlice";
const ConfirmOCR = ({ ocr }) => {
  const { showConfirmOCRModal } = useSelector((state) => state.uiSlice);
  const dispatch = useDispatch();
  const [text_ocr, setTextOcr] = useState(ocr);
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
            }}
          />
          <Button title="Confirmer" onPress={() => {}} />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmOCR;

const styles = StyleSheet.create({});
