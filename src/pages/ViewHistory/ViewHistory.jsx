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
    <View>
      <Text>My History</Text>
      <ScrollView>
        {user.actions.map((action) => {
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
      </ScrollView>
    </View>
  );
};

export default ViewHistory;

const styles = StyleSheet.create({});
