import React, { memo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { phoneValidator, passwordValidator } from "../core/utils";
import { Icon } from "native-base";

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [eye, seteye] = useState('eye');
  const [vis, setvis] = useState(true);

  const _changeIcon=()=>{
    eye=='eye-off'?seteye('eye'):seteye('eye-off')
    vis?setvis(false):setvis(true)
  }
  const UserLoginFunction = () => {
    fetch("http://192.168.1.108/contact-list/user_login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        if (responseJson == "signed in successfully") {
          const saveUserPhone = async (phone) => {
            try {
              await AsyncStorage.setItem("pkey", phone);
            } catch (error) {
              // Error retrieving data
              console.log(error.message);
            }
          };
          saveUserPhone(phone.value);
          navigation.navigate("Dashboard");
        } else Alert.alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const _onLoginPressed = () => {
    const phoneError = phoneValidator(phone.value);
    const passwordError = passwordValidator(password.value);

    if (phoneError || passwordError) {
      setPhone({ ...phone, error: phoneError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    UserLoginFunction();
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HomeScreen")} />
      <Logo />
      <Header>Welcome back</Header>

      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: "" })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={vis}
      />
    <Icon style={{color:theme.colors.primary}} name={eye} onPress={_changeIcon} />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
