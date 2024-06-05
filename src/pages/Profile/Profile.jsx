import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const Profile = ({ navigation }) => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Personnelles</Text>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.value}>{user.nom}</Text>

        <Text style={styles.label}>Prénom :</Text>
        <Text style={styles.value}>{user.prenom}</Text>

        <Text style={styles.label}>Email :</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Date de naissance :</Text>
        <Text style={styles.value}>
          {dayjs(user.date_naissance).format("DD-MM-YYYY")}
        </Text>

        <Text style={styles.label}>Numéro de téléphone :</Text>
        <Text style={styles.value}>{user.tel}</Text>

        <Text style={styles.label}>Poids :</Text>
        <Text style={styles.value}>{user.poids} Kg</Text>

        <Text style={styles.label}>Taille :</Text>
        <Text style={styles.value}>{user.taille} cm</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Problèmes de santé</Text>

        <Text style={styles.label}>Allergies :</Text>
        {user.allergies.map((allergie, index) => (
          <Text key={index} style={styles.value}>
            {allergie.name}
          </Text>
        ))}

        <Text style={styles.label}>Maladies :</Text>
        {user.maladies.map((maladie, index) => (
          <Text key={index} style={styles.value}>
            {maladie.name}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        <Text style={styles.buttonText}>Modifier le profil</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dernières actions</Text>
        {user.actions
          .slice(Math.max(user.actions.length - 5, 0))
          .map((action, i) => {
            console.log(action);
            return (
              <View key={i} style={styles.actionContainer}>
                <Text style={styles.actionText}> {action.type}</Text>
                {action.products.map((item, index) => (
                  <TouchableOpacity
                    style={styles.productButton}
                    key={index}
                    onPress={() => {
                      navigation.navigate("InfoProduct", { code: item });
                    }}
                  >
                    <Text style={styles.productText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ViewHistory");
        }}
      >
        <Text style={styles.buttonText}>Tout l'historique</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F1F1F1",
  },
  header: {
    marginBottom: 20,
    padding: 10,
  },
  headerText: {
    color: "#1A4D2E",
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#47a66c",
    opacity: 0.7,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#47a66c",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  actionContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  actionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  productButton: {
    marginVertical: 2,
    opacity: 0.7,
    padding: 10,
    backgroundColor: "#47a66c",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
