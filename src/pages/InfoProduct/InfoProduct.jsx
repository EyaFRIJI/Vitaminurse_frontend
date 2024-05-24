import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { uiActions } from "../../redux/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const InfoProduct = ({ route }) => {
  const { code } = route.params;
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.uiSlice);

  const searchDoc = async () => {
    const docRef = doc(db, "Produits", code);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct({ ...docSnap.data(), id: code });
      console.log({ ...docSnap.data(), id: code });
    }

    dispatch(uiActions.setLoading(false));
  };

  useEffect(() => {
    dispatch(uiActions.setLoading(true));
    searchDoc();
  }, []);

  return (
    <View>
      {loading === false && product !== null && (
        <>
          <Text>Nom: {product.name} </Text>
          <Text>Description: {product.description} </Text>
          <Image
            source={{ uri: product.images[0] }}
            height={100}
            width={300}
            alt="Llllll"
          />
          <Text>{product.ingredients}</Text>
          <Text>Tableau nutrition:{product.ocr}</Text>
        </>
      )}
    </View>
  );
};

export default InfoProduct;

const styles = StyleSheet.create({});
