import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Vitaminurse</Text>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  headerText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#47a66c",
    top: -5,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    left: 1,
    top: -6,
  },
});
