import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import { productActions } from "../../redux/productSlice";
import { db } from "../../../firebaseConfig";

const ListProducts = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.searchProduct([]));
  }, [navigation]);
  const { searchedProduct } = useSelector((state) => state.productSlice);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recherche</Text>
      </View>
      <SearchBar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {searchedProduct.map((product) => {
          return (
            <TouchableOpacity
              key={product.id}
              onPress={() => {
                navigation.navigate("InfoProduct", { code: product.id });
              }}
              style={styles.productContainer}
            >
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                {product.images[0] && (
                  <Image
                    source={{ uri: product.images[0] }}
                    style={styles.productImage}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListProducts;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F1F1F1",
  },
  header: {
    marginBottom: 20,
    padding: 10,
  },
  headerText: {
    color: "#1A4D2E",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    alignItems: "center",
  },
  productContainer: {
    width: "90%",
    backgroundColor: "#47a66c",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    opacity: 0.8,
  },
  productDetails: {
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
