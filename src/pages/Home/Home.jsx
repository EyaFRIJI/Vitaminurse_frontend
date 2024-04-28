import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { storeData } from "../../utils/async";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Déconnecter"
        onPress={() => {
          storeData("user", null);
          dispatch(userActions.deconnecter());
        }}
      />

      <Button
        title="Rechercher des produits"
        onPress={() => {
          navigation.navigate("ListProducts");
        }}
      />
      <Button
        title="Ouvrir Camera"
        onPress={() => {
          navigation.navigate("CameraScreen");
        }}
      />
    </View>
  );
}
