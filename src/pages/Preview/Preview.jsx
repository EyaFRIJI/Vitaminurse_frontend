// Importations nécessaires
import React from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/productSlice";

const Preview = ({ route, navigation }) => {
  const { images } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Text>{images.length}</Text>
      <ScrollView>
        {images.map((i) => (
          <TouchableOpacity
            onLongPress={() => {
              dispatch(productActions.deleteImage(i));
            }}
          >
            <Image source={{ uri: i }} style={styles.photo} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button
        title="OK"
        onPress={() => {
          dispatch(productActions.addImage(photo));
        }}
      />
      <Button
        title="Annuler"
        onPress={() => {
          navigation.navigate("Cam");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default Preview;
