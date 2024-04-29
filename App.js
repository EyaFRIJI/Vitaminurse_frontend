import { Provider } from "react-redux";
import Navigateur from "./Navigateur";
import { StatusBar, View } from "react-native";
import { store } from "./src/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <StatusBar />
        <Navigateur />
      </Provider>
    </RootSiblingParent>
  );
}
