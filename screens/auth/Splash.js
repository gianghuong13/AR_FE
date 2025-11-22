import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import logo from "../../assets/logo/logo_white.png";
import { colors } from "../../constants";

import * as SecureStore from "expo-secure-store";

const Splash = ({ navigation }) => {

  // sửa thành const _retrieveData
  const _retrieveData = async () => {
    try {
      const value = await SecureStore.getItemAsync("authUser");
      if (value !== null) {
        let user = JSON.parse(value); // convert authUser to json
        if (user.userType === "ADMIN") {
          setTimeout(() => {
            navigation.replace("dashboard", { authUser: user }); // Admin dashboard
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.replace("tab", { user: user }); // User Home
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigation.replace("login"); // navigate to login screen
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // call on initial render
  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
});
