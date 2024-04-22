import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home/Home";
import Register from "./src/pages/register/Register";
import { useDispatch, useSelector } from "react-redux";
import actions from "./src/redux/actions";

const Stack = createNativeStackNavigator();

const Navigateur = () => {
  const user = useSelector((state) => state["_j"].user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actions.deconnecter });
    console.log(user);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome" }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigateur;

const styles = StyleSheet.create({});
