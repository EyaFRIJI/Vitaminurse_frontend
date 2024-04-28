import { Provider } from "react-redux";
import Navigateur from "./Navigateur";
import { StatusBar, View } from "react-native";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <Navigateur />
    </Provider>
  );
}
