import AsyncStorage from "@react-native-async-storage/async-storage";
import actions from "./actions";

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
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(item, jsonValue);
  } catch (e) {
    // saving error
  }
};

const valeurInitial = {
  user: getData("user") || null,
  loading: false,
};

const reducer = async (state = valeurInitial, action) => {
  switch (action.type) {
    case actions.login:
      storeData("user", action.user);
      return { ...state, user: action.user };
    case actions.register:
      storeData("user", action.user);
      return { ...state, user: action.user };
    case actions.deconnecter:
      storeData("user", null);
      return { ...state, user: null };
    case actions.loading:
      return { ...state, loading: action.loading };

    default:
      return state;
  }
};

export default reducer;
