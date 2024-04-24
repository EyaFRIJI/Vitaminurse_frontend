import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (item, value) => {
  try {
    const jsonValue = value ? JSON.stringify(value) : null;
    await AsyncStorage.setItem(item, jsonValue);
  } catch (e) {
    // saving error
  }
};

export { storeData };
