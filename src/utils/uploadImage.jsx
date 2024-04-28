import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";

const pickImage = async () => {
  // No permissions request is necessary for launching the image library

  // pick an image from gallery
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  // if the user successfully picks an image then we check if the image has a QR code
  if (result && result.assets[0].uri) {
    try {
      const scannedResults = await BarCodeScanner.scanFromURLAsync(
        result.assets[0].uri
      );

      const dataNeeded = scannedResults[0].data;
      // setDisplayText(dataNeeded);
      return { error: null, code: dataNeeded };
    } catch (error) {
      // if there this no QR code
      // setDisplayText("No QR Code Found");
      return { error: "No QR Code Found", code: null };
    }
  }
};

export default pickImage;
