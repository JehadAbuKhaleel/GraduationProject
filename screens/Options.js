import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DetailListItem from "../components/DetailListItem";
import colors from "../utils/colors";

export default class Options extends React.Component {
  static navigationOptions = ({ navigation: { goBack } }) => ({
    title: "Options",
    headerLeft: () => (
      <MaterialIcons
        name="close"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => goBack()}
      />
    ),
  });
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("HomeScreen");
  };
  render() {
    return (
      <View style={styles.container}>
        <DetailListItem
          title="Update Profile"
          onPress={() => this.props.navigation.navigate("UpdateProfile")}
        />
        <DetailListItem
          title="Change Language"
          onPress={() => alert("You can't change the language now")}
        />
        <DetailListItem title="Sign Out" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
