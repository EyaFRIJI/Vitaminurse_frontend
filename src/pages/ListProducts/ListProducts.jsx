import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";

const ListProducts = () => {
  const { searchedProduct } = useSelector((state) => state.productSlice);

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Text>ListProducts</Text>
      <SearchBar />
      <ScrollView>
        {searchedProduct.map((product) => {
          return (
            <View
              style={{ height: "20%", backgroundColor: "#558866", margin: 50 }}
              key={product.id}
            >
              <Text>{product.name}</Text>
              <Image
                source={{ uri: product.images[0] }}
                height={100}
                width={300}
                alt="Llllll"
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListProducts;

const styles = StyleSheet.create({});
