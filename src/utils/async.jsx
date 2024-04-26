import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (item, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(item, jsonValue);
  } catch (e) {
    // saving error
  }
};

export { storeData };
