import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const TextInputField = ({ value, onChange, placeholder, type }) => {
  return (
    <TextInput
      keyboardType={type}
      value={value}
      onChangeText={(e) => {
        onChange(e);
      }}
      style={{ borderColor: "#000", borderWidth: 5 }}
      placeholder={placeholder}
    />
  );
};

export default TextInputField;

const styles = StyleSheet.create({});
