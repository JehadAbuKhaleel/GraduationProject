import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";
import store from "../store";

export default class User extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: "Me",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerRight: () => (
      <MaterialIcons
        name="settings"
        size={24}
        style={{ color: "white", marginRight: 10 }}
        onPress={() => navigate("Options")}
      />
    ),
  });

  state = {
    loading: store.getState().isFetchingUser,
    refreshing: true,
  };
  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        loading: store.getState().isFetchingUser,
      })
    );
  }
  render() {
    const getUserPhone = async () => {
      try {
        global.ph = (await AsyncStorage.getItem("pkey")) || "none";
        handleUserInfo(ph);
      } catch (error) {
        console.log(error.message);
      }
      return ph;
    };
    getUserPhone();
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
          global.uphone = responseJson["phone"];
          global.udesc = responseJson["ia"];
          const saveUserUdesc = async (udesc) => {
            try {
              await AsyncStorage.setItem("udesckey", udesc);
            } catch (error) {
              // Error retrieving data
              console.log(error.message);
            }
          };
          saveUserUdesc(global.udesc);
          this.setState({
            refreshing: false,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("User Not Found");
        });
      global.loading = this.state.loading = false;
    };
    if (this.state.refreshing) {
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {global.loading && <ActivityIndicator size="large" />}
        {!global.loading && (
          <ContactThumbnail
            name={global.uname}
            phone={global.uphone}
            desc={global.udesc}
            avatar = {require('../assets/u1.png')}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:-100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
});
