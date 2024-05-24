import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInputField from "../../components/TextInputField/TextInputField";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
// import { listAllergies, listMaladies } from "../../utils/healthissue";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import { storeData } from "../../utils/async";
import { userActions } from "../../redux/userSlice";
import { uiActions } from "../../redux/uiSlice";

const EditProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [listAllergies, setListAllergies] = useState([]);
  const [listMaladies, setListMaladies] = useState([]);

  useEffect(() => {
    axios.get(Constants.expoConfig.extra.url + "/maladie").then((response) => {
      setListMaladies(response.data);
    });
    axios.get(Constants.expoConfig.extra.url + "/allergie").then((response) => {
      setListAllergies(response.data);
    });
  }, []);

  const { control, getValues } = useForm({
    defaultValues: {
      nom: user.nom,
      prenom: user.prenom,
      poids: user.poids + "",
      taille: user.taille + "",
      date_naissance: new Date(user.date_naissance),
      maladies: user.maladies,
      allergies: user.allergies,
      email: user.email,
      mot_passe: "",
      tel: user.tel,
    },
  });

  const updateAction = () => {
    const {
      nom,
      prenom,
      allergies,
      date_naissance,
      email,
      maladies,
      mot_passe,
      poids,
      taille,
      tel,
    } = getValues();
    axios
      .put(Constants.expoConfig.extra.url + "/user", {
        id: user._id,
        nom,
        prenom,
        allergies,
        date_naissance,
        email,
        maladies,
        mot_passe,
        poids,
        taille,
        tel,
      })
      .then((response) => {
        storeData("user", response.data);
        dispatch(userActions.inscrire(response.data));
        dispatch(uiActions.setSuccessMessage("Update successfuly"));
        navigation.navigate("Profile");
      });
  };
  return (
    <View>
      <Text>EditProfile</Text>

      <Controller
        control={control}
        name="nom"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              value={value}
              onChange={onChange}
              placeholder="Nom"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="prenom"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              value={value}
              onChange={onChange}
              placeholder="Prénom"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="date_naissance"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <DateTimePicker
              value={value}
              onChange={(e) => {
                onChange(new Date(e.nativeEvent.timestamp));
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="poids"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              value={value}
              onChange={onChange}
              type={"numeric"}
              placeholder={"Poids"}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="taille"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              type="numeric"
              value={value}
              onChange={onChange}
              placeholder="Taille"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="tel"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              type="name-phone-pad"
              value={value}
              onChange={onChange}
              placeholder="Numéro du téléphone"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="maladies"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <SectionedMultiSelect
              selectText="Maladies"
              items={listMaladies}
              IconRenderer={Icon}
              uniqueKey="id"
              onSelectedItemsChange={(e) => {
                onChange(e);
              }}
              selectedItems={value}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="allergies"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <SectionedMultiSelect
              selectText="Allergies"
              items={listAllergies}
              IconRenderer={Icon}
              uniqueKey="id"
              onSelectedItemsChange={(e) => {
                onChange(e);
              }}
              selectedItems={value}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              type="email-address"
              value={value}
              onChange={onChange}
              placeholder="Email"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="mot_passe"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextInputField
              type={"password"}
              value={value}
              onChange={onChange}
              placeholder="Mot de passe"
            />
          );
        }}
      />

      <Button
        title="Submit"
        onPress={() => {
          updateAction();
        }}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
