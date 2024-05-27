import { Image, StyleSheet, Text, View } from "react-native";
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
    <View>
      {loading === false && product !== null && compatibility && (
        <>
          <Text
            style={{
              color:
                compatibility.allergies == true &&
                compatibility.maladies == true
                  ? "green"
                  : "red",
            }}
          >
            {compatibility.allergies == true && compatibility.maladies == true
              ? "Compatible"
              : "Not Compatible"}
          </Text>
          <View style={{ backgroundColor: "#ff3737a6" }}>
            {compatibility.maladiesAdvices.map((advice) => {
              return <Text style={{ color: "white" }}>{advice.message}</Text>;
            })}

            {compatibility.allergiesAdvices.map((advice) => {
              return <Text style={{ color: "white" }}>{advice.message}</Text>;
            })}
          </View>
          <Text>Nom: {product.name} </Text>
          <Text>Description: {product.description} </Text>
          <Image
            source={{ uri: product.images[0] }}
            height={100}
            width={300}
            alt="Llllll"
          />
          <Text>{product.ingredients}</Text>
          {/* <Text>Tableau nutrition:{product.ocr}</Text> */}
        </>
      )}
    </View>
  );
};

export default InfoProduct;

const styles = StyleSheet.create({});
