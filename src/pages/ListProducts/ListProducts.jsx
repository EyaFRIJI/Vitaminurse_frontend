import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";

const ListProducts = ({ navigation }) => {
  const { searchedProduct } = useSelector((state) => state.productSlice);

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Text>ListProducts</Text>
      <SearchBar />
      <ScrollView>
        {searchedProduct.map((product) => {
          return (
            <TouchableOpacity
              key={product.id}
              onPress={() => {
                navigation.navigate("InfoProduct", { code: product.id });
              }}
            >
              <View
                style={{
                  height: "20%",
                  backgroundColor: "#558866",
                  margin: 50,
                }}
              >
                <Text>{product.name}</Text>
                <Image
                  source={{ uri: product.images[0] }}
                  height={100}
                  width={300}
                  alt="Llllll"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListProducts;

const styles = StyleSheet.create({});
