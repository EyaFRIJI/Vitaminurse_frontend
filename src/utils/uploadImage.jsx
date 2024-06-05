import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";

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
          uiActions.setErrorMessage("Invalid image. No barcode detected")
        );
        return {
          error: "Invalid image. No barcode detected",
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
