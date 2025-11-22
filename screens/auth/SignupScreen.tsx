import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import header_logo from "../../assets/logo/logo.png";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { colors, network } from "../../constants";

interface SignupScreenProps {
  navigation: any; // nếu dùng React Navigation, bạn có thể thay bằng NativeStackNavigationProp
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // Lắng nghe trạng thái mạng
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  // const raw = JSON.stringify({
  //   email: email,
  //   password: password,
  //   name: name,
  //   userType: "USER",
  // });


  // const requestOptions: RequestInit = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: "follow",
  // };

  //method to post the user data to server for user signup using API call
  const signUpHandle = () => {
    if (!isConnected) {
      return setError("No internet connection");
    }

    if (email == "") {
      return setError("Please enter your email");
    }
    if (name == "") {
      return setError("Please enter your name");
    }
    if (password == "") {
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      return setError("Email is not valid");
    }
    if (email.length < 6) {
      return setError("Email is too short");
    }
    if (password.length < 6) {
      return setError("Password must be 6 characters long");
    }
    if (password != confirmPassword) {
      return setError("password does not match");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email,
      password,
      name,
      userType: "USER",
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    
    fetch(network.serverip + "/register", requestOptions) // API call
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.data?.email === email) {
          navigation.navigate("login");
        }
      })
      .catch((error) => console.log("error", setError(error.message)));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      {!isConnected && (
        <View style={styles.noConnectionBanner}>
          <Text style={styles.noConnectionText}>No internet connection</Text>
        </View>
      )}
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.welconeContainer}>
          <Image style={styles.logo} source={header_logo} />
        </View>
        <View style={styles.screenNameContainer}>
          <View>
            <Text style={styles.screenNameText}>Sign up</Text>
          </View>
          <View>
            <Text style={styles.screenNameParagraph}>
              Create your account on EasyBuy to get an access to millions of
              products
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <CustomAlert message={error} type={"error"} />
          <CustomInput
            value={name}
            setValue={setName}
            placeholder={"Name"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder={"Email"}
            placeholderTextColor={colors.muted}
            radius={5} 
          />
          <CustomInput
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            placeholder={"Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={confirmPassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
            placeholder={"Confirm Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Sign up"} onPress={signUpHandle} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate("login")}
          style={styles.signupText}
        >
          Login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 2,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },

  noConnectionBanner: { backgroundColor: "red", padding: 10, alignItems: "center" },
  noConnectionText: { color: "white", fontWeight: "bold" },
});
