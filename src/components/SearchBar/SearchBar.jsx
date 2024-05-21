import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    // const citiesRef = collection(db, "Produits");
    // // Create a query against the collection.
    // const q = query(citiesRef, where("nom", ">=", searchText.toLowerCase()));
    // const searchQueryExec = await getDocs(q);
    // if (searchQueryExec.empty) {
    //   console.log("not found");
    // }
    // const search = await Promise.all(
    //   searchQueryExec.docs.map((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     return { id: doc.id, ...doc.data() };
    //   })
    // );
    // console.log(search);
    // dispatch(productActions.searchProduct(search));

    //get all documents
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

    if (exist.includes(true)) {
    } else {
      axios
        .put(Constants.expoConfig.extra.url + "/add_action", {
          action: { products: idTable, type: "Search" },
          id: user._id,
        })
        .then((response) => {
          dispatch(userActions.inscrire(response.data));
        })
        .catch((error) => {});
    }

    dispatch(productActions.searchProduct(searchText !== "" ? t : []));
  };

  return (
    <TextInput
      style={{ borderColor: "#000", borderWidth: 1 }}
      value={searchText}
      placeholder="Rechercher"
      onChangeText={(text) => {
        setSearchText(text);
        text !== null && SearchProduct(text.trim());
      }}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
