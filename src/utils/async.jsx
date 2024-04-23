import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (item) => {
  try {
    const jsonValue = await AsyncStorage.getItem(item);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const storeData = async (item, value) => {
  try {
    const jsonValue = value ? JSON.stringify(value) : null;
    await AsyncStorage.setItem(item, jsonValue);
  } catch (e) {
    // saving error
  }
};

export { storeData, getData };
