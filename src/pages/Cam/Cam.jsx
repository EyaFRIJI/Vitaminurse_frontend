import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera/legacy";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/productSlice";

export default function Cam({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const dispatch = useDispatch();
  // if (!permission) {
  //   // Camera permissions are still loading
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: "center" }}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      dispatch(productActions.addImage(photo.uri));
      navigation.navigate("Preview");
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>OK</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
