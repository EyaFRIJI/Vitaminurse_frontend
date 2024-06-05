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

const ViewHistory = ({ navigation }) => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Historique</Text>
        {user.actions.map((action) => {
          return (
            <View key={action._id} style={styles.actionContainer}>
              <Text style={styles.actionText}> {action.type}</Text>
              {action.products.map((item) => {
                return (
                  <TouchableOpacity
                    style={styles.productButton}
                    key={item}
                    onPress={() => {
                      navigation.navigate("InfoProduct", { code: item });
                    }}
                  >
                    <Text style={styles.productText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ViewHistory;

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
    marginBottom: 20,
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
    marginBottom: 10,
    color: "#444", // Medium green for action text
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
    color: "white", // White for product text
    textAlign: "center",
  },
});
