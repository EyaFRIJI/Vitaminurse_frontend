import { StyleSheet, Text, View } from "react-native";
import React, { Fragment, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home/Home";
import Register from "./src/pages/register/Register";
import { useDispatch, useSelector } from "react-redux";
import actions from "./src/redux/actions";
import Login from "./src/pages/Login/Login";
import { getData } from "./src/utils/async";

const Stack = createNativeStackNavigator();

const Navigateur = () => {
  const state = useSelector((state) => state._j);
  const dispatch = useDispatch();

  const loadUser = async () => {
    const u = { name: "Khaled" };

    dispatch({ type: actions.deconnecter });
    dispatch({ type: actions.login, user: { ...u, loading: true } });
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    console.log(state.user);
  }, [state]);

  return (
    <NavigationContainer>
      {state ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Welcome" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "Register" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigateur;

const styles = StyleSheet.create({});
