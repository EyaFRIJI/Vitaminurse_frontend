import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// import { listAllergies, listMaladies } from "../../utils/healthissue";

const Profile = ({ navigation }) => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <ScrollView>
      <Text>Personal Informations</Text>
      <Text>Lastname : {user.nom}</Text>
      <Text>Firstname : {user.prenom}</Text>
      <Text>Email : {user.email}</Text>
      <Text>
        Birth Date : {dayjs(user.date_naissance).format("DD-MM-YYYY")}
      </Text>
      <Text>Phone number : {user.tel}</Text>
      <Text>Weight : {user.poids} Kg</Text>
      <Text>Height : {user.taille} cm</Text>
      <Text>Health issues</Text>
      <Text>Allergies</Text>
      {user.allergies.map((allergie, index) => {
        return <Text key={index}>* {allergie.nom}</Text>;
      })}
      <Text>Illnes</Text>
      {user.maladies.map((maladie, index) => {
        return <Text key={index}>* {maladie.nom}</Text>;
      })}
      <Button
        title="Edit Profile"
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      />
      <Text>Last Actions</Text>
      {user.actions
        .slice(Math.max(user.actions.length - 5, 0))
        .map((action) => {
          return (
            <>
              <Text key={action._id}>- {action.type} </Text>
              {action.products.map((item) => {
                return (
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    key={item}
                    onPress={() => {
                      navigation.navigate("InfoProduct", { code: item });
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </>
          );
        })}

      <Button
        title="View all history"
        onPress={() => {
          navigation.navigate("ViewHistory");
        }}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
