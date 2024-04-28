import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import pickImage from "../../utils/uploadImage";
export default function CameraScreen() {
  const [displayText, setDisplayText] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      alert("permission granted");
    })();
  }, []);

  //use..... ==> hook

  return (
    <View style={styles.container}>
      <Camera
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
          ],
        }}
        onBarCodeScanned={(...args) => {
          const data = args[0].data;
          let result = JSON.stringify(data);
          setDisplayText(result);
        }}
      />
      <View style={styles.boxContainer}>
        <View style={{ marginBottom: 50 }}>
          <Text
            style={{
              height: 40,
              width: 300,
              backgroundColor: "white",
              marginBottom: 20,
            }}
          >
            {displayText}
          </Text>
          <Button
            onPress={() => console.log(pickImage())}
            title="Pick from gallery"
          />
        </View>
      </View>

      <View style={styles.scanBoxContainer}>
        <View style={styles.scanBox}></View>
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
  scanBox: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "white",
  },
});
