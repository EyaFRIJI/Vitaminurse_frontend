import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  key,
  index,
} from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { uiActions } from "../../redux/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Constants from "expo-constants";

const InfoProduct = ({ route }) => {
  const { code } = route.params;
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.uiSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [compatibility, setCompatibility] = useState(null);

  const searchDoc = async () => {
    const docRef = doc(db, "Produits", code);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct({ ...docSnap.data(), id: code });
      axios
        .post(Constants.expoConfig.extra.url + "/check_product_compatibility", {
          product: { ...docSnap.data(), id: code },
          user,
        })
        .then((response) => {
          setCompatibility(response.data);
        });
    }

    dispatch(uiActions.setLoading(false));
  };

  useEffect(() => {
    dispatch(uiActions.setLoading(true));
    searchDoc();
  }, [route]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#47a66c" />
      ) : product !== null && compatibility ? (
        <>
          <View style={styles.header}>
            <Text style={styles.productName}>{product.name}</Text>
            <View
              style={[
                styles.compatibilityContainer,
                {
                  backgroundColor:
                    compatibility.allergies && compatibility.maladies
                      ? "#DFF2BF"
                      : "#FFBABA",
                },
              ]}
            >
              <Text
                style={[
                  styles.compatibilityText,
                  {
                    color:
                      compatibility.allergies && compatibility.maladies
                        ? "#4F8A10"
                        : "#D8000C",
                  },
                ]}
              >
                {compatibility.allergies && compatibility.maladies
                  ? "Compatible"
                  : "Not Compatible"}
              </Text>
            </View>

            <Image
              source={{ uri: product.images[0] }}
              style={styles.productImage}
            />
          </View>
          <View
            style={[
              styles.adviceContainer,
              {
                backgroundColor:
                  compatibility.allergies && compatibility.maladies
                    ? "Transparent"
                    : "#FFBABA",
              },
            ]}
          >
            {compatibility.maladiesAdvices.map((advice, index) => {
              return (
                <Text key={index} style={styles.adviceText}>
                  {advice.message}
                </Text>
              );
            })}

            {compatibility.allergiesAdvices.map((advice, index) => (
              <Text style={styles.adviceText} key={index}>
                {advice.message}
              </Text>
            ))}
          </View>
          {product.description && (
            <>
              <Text style={styles.sectionTitle}>Description :</Text>
              <Text style={styles.description}>{product.description}</Text>
            </>
          )}
          <Text style={styles.sectionTitle}>Ingredients :</Text>
          <Text style={styles.description}>{product.ingredients}</Text>
          <Text style={styles.sectionTitle}>
            Tableau nutritionnelle (OCR) :
          </Text>

          {Object.keys(product.ocr).map((key) => {
            return (
              <Text
                style={styles.description}
              >{`${key} : ${product.ocr[key]}`}</Text>
            );
          })}
        </>
      ) : (
        <Text style={styles.errorMessage}>
          Product not found or error loading data.
        </Text>
      )}
    </ScrollView>
  );
};

export default InfoProduct;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F1F1F1",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF",
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  compatibilityContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  compatibilityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#47a66c",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 24,
  },
  adviceContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 16,
    color: "#D8000C",

    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
