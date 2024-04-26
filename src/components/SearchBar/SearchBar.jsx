import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/productSlice";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

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
      return product.nom.includes(searchText.toLowerCase());
    });

    dispatch(productActions.searchProduct(searchText !== "" ? t : []));
  };

  return (
    <TextInput
      style={{ borderColor: "#000", borderWidth: 1 }}
      value={searchText}
      placeholder="Rechercher"
      onChangeText={(text) => {
        setSearchText(text);
        text !== null && SearchProduct(text);
      }}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
