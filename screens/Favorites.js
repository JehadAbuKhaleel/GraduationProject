import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import { fetchRandomContact } from "../utils/api";
import store from "../store";
import { Notifications } from "expo";

const keyExtractor = ({ phone }) => phone;

export default class Favorites extends React.Component {
  static navigationOptions = {
    title: "Favorites",
  };

  state = {
    refreshing: true,
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  async componentDidMount() {
    const { contacts } = this.state;

    this.unsubscribe = store.onChange(() =>
      this.setState({
        refreshing:true,
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
      })
    );
  }

 /* componentWillUnmount() {
    this.unsubscribe();
  }*/

  renderFavoriteThumbnail = ({ item }) => {
    const {
      navigation: { navigate },
    } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate("Profile", { id: item.id })}
      />
    );
  };
  
  render() {
    const { contacts, loading, error } = this.state;
    const favorites = contacts.filter((contact) => contact.favorite);
    
    const notify = (t) => {
      const localNotification = {
        title: "New Product !",
        body: t + " Added A New Product",
      };
      const schedulingOptions = {
        time: new Date().getTime() + 1000,
      };
      Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      );
    };

    if(favorites.length>0){
    this.state.refreshing=false;
    fetch("http://192.168.1.108/contact-list/newitem.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (JSON.stringify(responseJson)){
          if(JSON.stringify(favorites).includes(JSON.stringify(responseJson['comp_name']))){
          notify(JSON.stringify(responseJson['comp_name']));
        }
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
    else {
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <Text style={{textAlign:'center',color:'red'}}>There Is No Favorites</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading && !error && (
          <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={this.renderFavoriteThumbnail}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  list: {
    alignItems: "center",
  },
});
