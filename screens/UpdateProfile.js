import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { passwordValidator, nameValidator } from "../core/utils";
const UpdateScreen = ({ navigation }) => {
  async () => {
    try {
      global.ph = (await AsyncStorage.getItem("pkey")) || "none";
      UserUpdateFunction(ph);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return ph;
  };

  const handleUserInfo = (ph) => {
    fetch("http://192.168.1.108/contact-list/userInfo.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ph: `${ph}`,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        global.uname = responseJson["name"];
        global.upass = responseJson["password"];
        global.uia = responseJson["ia"];
        setrefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        alert("User Not Found");
      });
  };
  handleUserInfo(ph);
  const [refreshing, setrefreshing] = useState({ value: true, error: "" });
  const [name, setName] = useState({ value: global.uname, error: "" });
  const [password, setPassword] = useState({ value: global.upass, error: "" });
  const [ia, setia] = useState({ value: global.uia, error: "" });

  const UserUpdateFunction = (ph) => {
    fetch("http://192.168.1.108/contact-list/user_update.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value.trim(),
        phone: `${ph}`,
        password: password.value,
        ia: ia.value || "",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        if (responseJson == "User Updated Successfully") {
          Alert.alert(responseJson);
          navigation.navigate("Dashboard");
        } else Alert.alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const _onUpdatepPressed = () => {
    const nameError = nameValidator(name.value);
    const passwordError = passwordValidator(password.value);

    if (passwordError || nameError) {
      setName({ ...name, error: nameError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    UserUpdateFunction(global.ph);
  };

  if (refreshing) {
    return (
      //loading view while data is loading
      <View style={{ flex: 1, paddingTop: 50 }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView>
      <Background>
        <Header>Update Account</Header>
        <TextInput
          label="New Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="New Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
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
          onPress={_onUpdatepPressed}
          style={styles.button}
        >
          Update
        </Button>
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
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(UpdateScreen);
