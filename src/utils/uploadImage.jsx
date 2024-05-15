import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import { uiActions } from "../redux/uiSlice";

const pickImage = async (dispatch) => {
  // No permissions request is necessary for launching the image library

  // pick an image from gallery
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  // if the user successfully picks an image then we check if the image has a QR code

  if (!result.canceled && result.assets[0].uri) {
    try {
      const scannedResults = await BarCodeScanner.scanFromURLAsync(
        result.assets[0].uri
      );

      if (scannedResults.length > 0) {
        const dataNeeded = scannedResults[0].data;
        dispatch(uiActions.setSuccessMessage("Uploaded successfully"));
        return { error: null, code: dataNeeded, uri: result.assets[0].uri };
      } else {
        dispatch(
          uiActions.setErrorMessage(
            "Image invalide. aucun code à barre détecté"
          )
        );
        return {
          error: "Image invalide. aucun code à barre détecté",
          code: null,
        };
      }
    } catch (error) {
      dispatch(uiActions.setErrorMessage(error.message));
      return { error: error.message, code: null };
    }
  }
};

export default pickImage;
