import actions from "./actions";
import { storeData } from "../utils/async";

const valeurInitial = {
  user: {},
  loading: true,
};

const reducer = async (state = valeurInitial, action) => {
  switch (action.type) {
    case actions.login:
      return { ...state, user: action.user };
    case actions.register:
      return { ...state, user: action.user };
    case actions.deconnecter:
      return { ...state, user: { name: "khaled" } };

    default:
      return state;
  }
};

export default reducer;
