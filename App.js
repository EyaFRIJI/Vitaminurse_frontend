import { Provider } from "react-redux";
import Navigateur from "./Navigateur";
import { StatusBar, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { store } from "./src/redux/store";
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
