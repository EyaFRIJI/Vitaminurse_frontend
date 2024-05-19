import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { listAllergies, listMaladies } from "../../utils/healthissue";

const Profile = ({ navigation }) => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <View>
      <Text>Personal Informations</Text>
      <Text>Lastname : {user.nom}</Text>
      <Text>Firstname : {user.prenom}</Text>
      <Text>Email : {user.email}</Text>
      <Text>
        Birth Date : {dayjs(user.date_naissance).format("DD-MM-YYYY")}
      </Text>
      <Text>Weight : {user.poids} Kg</Text>
      <Text>Height : {user.taille} cm</Text>

      <Text>Health issues</Text>
      <Text>Allergies</Text>
      {user.allergies.map((allergie, index) => {
        return (
          <Text key={index}>
            * {listAllergies.find((a) => a.id === allergie).name}
          </Text>
        );
      })}
      <Text>Illnes</Text>
      {user.maladies.map((maladie, index) => {
        return (
          <Text key={index}>
            * {listMaladies.find((m) => m.id === maladie).name}
          </Text>
        );
      })}

      <Button
        title="Edit Profile"
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      />

      <Text>Last Actions</Text>
      {user.actions.slice(0, 3).map((action) => {
        return <Text>- {action}</Text>;
      })}
      <Button title="View all history" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
