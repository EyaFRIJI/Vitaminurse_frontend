import {
  ActivityIndicator,
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home/Home";
import Register from "./src/pages/register/Register";
import { useDispatch, useSelector } from "react-redux";
import Login from "./src/pages/Login/Login";
import Loading from "./src/pages/Loading/Loading";
import ListProducts from "./src/pages/ListProducts/ListProducts";
import CameraScreen from "./src/pages/CameraScreen/CameraScreen";
import Toast from "react-native-root-toast";
import { uiActions } from "./src/redux/uiSlice";
import Cam from "./src/pages/Cam/Cam";
import Preview from "./src/pages/Preview/Preview";
import BottomBar from "./src/components/BottomBar/BottomBar";
import { navigationRef } from "./RootNavigation";
import Profile from "./src/pages/Profile/Profile";
import EditProfile from "./src/pages/EditProfile/EditProfile";
import InfoProduct from "./src/pages/InfoProduct/InfoProduct";
import ViewHistory from "./src/pages/ViewHistory/ViewHistory";

const Stack = createNativeStackNavigator();

const Navigateur = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const { loading } = useSelector((state) => state.uiSlice);
  const { successMessage, errorMessage } = useSelector(
    (state) => state.uiSlice
  );

  useEffect(() => {
    (successMessage || errorMessage) &&
      setTimeout(() => dispatch(uiActions.clearAll()), 3000);
  }, [successMessage, errorMessage]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Modal
        onTouchCancel={() => {
          dispatch(uiActions.setLoading(false));
        }}
        animationType={"slide"}
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          dispatch(uiActions.setLoading(false));
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.childStyle}>
            <ActivityIndicator color={"#f0f"} size={50} />
          </View>
        </View>
      </Modal>

      {errorMessage && (
        <Toast
          backgroundColor="red"
          visible={errorMessage !== ""}
          shadow={false}
          animation={false}
          hideOnPress={true}
          duration={1000}
        >
          {errorMessage}
        </Toast>
      )}
      {successMessage && (
        <Toast
          backgroundColor="green"
          visible={successMessage !== ""}
          shadow={false}
          animation={false}
          hideOnPress={true}
        >
          {successMessage}
        </Toast>
      )}
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
            name="InfoProduct"
            component={InfoProduct}
            options={{ title: "Info Product" }}
          />
          <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{ title: "Camera" }}
          />
          <Stack.Screen
            name="Preview"
            component={Preview}
            options={{ title: "Camera" }}
          />
          <Stack.Screen name="Cam" component={Cam} options={{ title: "Cam" }} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ title: "EditProfile" }}
          />
          <Stack.Screen
            name="ViewHistory"
            component={ViewHistory}
            options={{ title: "ViewHistory" }}
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

      {user !== null && <BottomBar />}
    </NavigationContainer>
  );
};

export default Navigateur;

const styles = StyleSheet.create({});
