import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home/Home";
import Register from "./src/pages/register/Register";
import { useSelector } from "react-redux";
import Login from "./src/pages/Login/Login";
import Loading from "./src/pages/Loading/Loading";
import ListProducts from "./src/pages/ListProducts/ListProducts";
import CameraScreen from "./src/pages/CameraScreen/CameraScreen";

const Stack = createNativeStackNavigator();

const Navigateur = () => {
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return (
    <NavigationContainer>
      {user === undefined ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : user !== null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen
            name="ListProducts"
            component={ListProducts}
            options={{ title: "List Products" }}
          />
          <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{ title: "Camera" }}
          />
        </Stack.Navigator>
      ) : (
        user === null && (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )
      )}
    </NavigationContainer>
  );
};

export default Navigateur;

const styles = StyleSheet.create({});
