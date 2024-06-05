import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/productSlice";
import axios from "axios";
import Constants from "expo-constants";
import { userActions } from "../../redux/userSlice";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

  const SearchProduct = async (searchText) => {
    // get all documents
    const querySnapshot = await getDocs(collection(db, "Produits"));
    const x = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        return { id: doc.id, ...doc.data() };
      })
    );

    const t = x.filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    });

    const idTable = t.map((p) => p.id);
    const exist = user.actions.map((a) => {
      return arraysEqual(a.products, idTable) && a.type === "Search";
    });

    if (!exist.includes(true)) {
      axios
        .put(Constants.expoConfig.extra.url + "/add_action", {
          action: { products: idTable, type: "Search" },
          id: user._id,
        })
        .then((response) => {
          dispatch(userActions.inscrire(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    dispatch(productActions.searchProduct(searchText !== "" ? t : []));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        placeholder="Rechercher"
        placeholderTextColor="#aaa"
        onChangeText={(text) => {
          setSearchText(text);
          text !== null && SearchProduct(text.trim());
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F1F1F1",
  },
  input: {
    borderColor: "#155f32",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "white",
    color: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});
