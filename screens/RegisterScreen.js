import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import {
  emailValidator,
  phoneValidator,
  passwordValidator,
  nameValidator,
} from "../core/utils";
import { ScrollView } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [ia, setia] = useState({ value: "", error: "" });

  const UserRegistrationFunction = () => {
    fetch("http://192.168.1.108/contact-list/user_registration.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        phone: phone.value,
        password: password.value,
        email: email.value,
        ia: ia.value,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        if (responseJson == "User Registered Successfully") {
          const saveUserPhone = async (phone) => {
            try {
              await AsyncStorage.setItem("pkey", phone);
            } catch (error) {
              // Error retrieving data
              console.log(error.message);
            }
          };
          saveUserPhone(phone.value);

          Alert.alert(responseJson);
          navigation.navigate("Dashboard");
        } else Alert.alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const phoneError = phoneValidator(phone.value);
    const passwordError = passwordValidator(password.value);
    const emailError = emailValidator(email.value);

    if (emailError || phoneError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setPhone({ ...phone, error: phoneError });
      setPassword({ ...password, error: passwordError });
      setEmail({ ...email, error: emailError });
      return;
    }
    UserRegistrationFunction();
  };

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => navigation.navigate("HomeScreen")} />
        <Logo />
        <Header>Create Account</Header>

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />

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
          secureTextEntry
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <Text>
          Insert the contents that you do not want in the products or if you
          suffer from diseases or allergies.
        </Text>
        <TextInput
          label="illnesses or allergies"
          returnKeyType="done"
          value={ia.value}
          onChangeText={(text) => setia({ value: text, error: "" })}
          error={!!ia.error}
          errorText={ia.error}
          multiline={true}
        />

        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 10,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
