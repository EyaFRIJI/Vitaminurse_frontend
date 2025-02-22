import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, Alert, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera/legacy";
import pickImage from "../../utils/uploadImage";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/productSlice";
import { uiActions } from "../../redux/uiSlice";
import axios from "axios";
import { userActions } from "../../redux/userSlice";
import Constants from "expo-constants";

export default function CameraScreen({ navigation }) {
  const [displayText, setDisplayText] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [code, setCode] = useState(null);
  const { user } = useSelector((state) => state.userSlice);
  const [canScan, setCanScan] = useState(true);
  const [newP, setNewP] = useState(false);
  const dispatch = useDispatch();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //use..... ==> hook

  const searchDoc = async () => {
    const docRef = doc(db, "Produits", code.code);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      axios
        .put(Constants.expoConfig.extra.url + "/add_action", {
          action: { products: [code.code], type: "Scann" },
          id: user._id,
        })
        .then((response) => {
          dispatch(userActions.inscrire(response.data));

          navigation.navigate("InfoProduct", { code: code.code });
        })
        .catch((error) => {
          dispatch(uiActions.setErrorMessage("Erreur" + error.message));
        });
    } else {
      dispatch(productActions.setScannedId(code.code));
      dispatch(uiActions.clearAll());
      dispatch(uiActions.setErrorMessage("Produit introuvable"));
      setNewP(true);
    }
  };

  useEffect(() => {
    code !== null &&
      code !== undefined &&
      code.error == null &&
      setTimeout(() => {
        searchDoc();
      }, 300);
  }, [code]);

  useEffect(() => {
    if (newP) {
      Alert.alert(
        "Produit introuvable",
        `Le produit avec le code ${code.code} est inexistant. Voulez-vous l'ajouter ?`,
        [
          {
            text: "Cancel",
            onPress: () => {
              navigation.navigate("Home");
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              Alert.alert(
                "Attention",
                "la 1ére photo doit étre la photo de l'OCR."
              );
              navigation.navigate("Cam");
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
      setNewP(true);
    }
  }, [newP]);

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.codabar,
            BarCodeScanner.Constants.BarCodeType.code39,
            BarCodeScanner.Constants.BarCodeType.code93,
            BarCodeScanner.Constants.BarCodeType.code128,
            BarCodeScanner.Constants.BarCodeType.maxicode,
            BarCodeScanner.Constants.BarCodeType.datamatrix,
            BarCodeScanner.Constants.BarCodeType.aztec,
            BarCodeScanner.Constants.BarCodeType.qr,
            BarCodeScanner.Constants.BarCodeType.interleaved2of5,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.upcA,
            BarCodeScanner.Constants.BarCodeType.upcE,
            BarCodeScanner.Constants.BarCodeType.pdf417,
            BarCodeScanner.Constants.BarCodeType.rss14,
            BarCodeScanner.Constants.BarCodeType.rssExpanded,
          ],
        }}
        onBarCodeScanned={(...args) => {
          const data = args[0].data;
          if (canScan && code == null) setCode({ code: data, error: null });
        }}
      />
      <View style={styles.boxContainer}>
        <View style={{ marginBottom: 50 }}>
          <Button
            onPress={async () => {
              const s = await pickImage(dispatch);
              setCode(s);
            }}
            title="Importer depuis gallerie"
          />
        </View>
      </View>

      <View style={styles.scanBoxContainer}>
        <View
          style={{
            width: 300,
            height: 300,
            borderWidth: code ? 5 : 1,
            borderColor: code ? "green" : "white",
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  scanBoxContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
});
