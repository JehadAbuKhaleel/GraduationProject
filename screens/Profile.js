import React from "react";
import { StyleSheet, View, Linking, FlatList, ScrollView,TextInput} from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import DetailListItem from "../components/DetailListItem";
import { fetchItems } from "../utils/api";
import ContactListItem from "../components/ContactListItem";
import colors from "../utils/colors";
import store from "../store";
import {SearchBar} from 'react-native-elements';
import filter from 'lodash.filter';

const keyExtractor = ({ qr_id }) => qr_id;

export default class Profile extends React.Component {
  static navigationOptions = ({
    navigation: {
      state: { params },
    },
  }) => {
    const { id } = params;
    const { name } = store
      .getState()
      .contacts.find((contact) => contact.id === id);

    return {
      title: name.split(" ")[0],
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.blue,
      },
    };
  };

  state = store.getState();

  ////////////////////////////////////////////////////
  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        its: store.getState().its,
        itsFilterd: store.getState().itsFilterd,
      })
    );
    const its = await fetchItems();
    const itsFilterd = await fetchItems();
    store.setState({its});
    store.setState({itsFilterd});
  }
  
  renderItem = ({ item }) => {
    const { company_name, product_name, avatar, PriceWithMargin } = item;
    if (company_name == global.thisname)
      return (
        <ContactListItem
          name={product_name}
          avatar={avatar}
          phone={PriceWithMargin}
        />
      );
  };
  ////////////////////////////////////////////////////
  handleSearch = (text) => {
    this.setState({
      itsFilterd:store.getState().itsFilterd
    })
    const formattedQuery = text.toLowerCase();
    const itsFilterd = filter(this.state.its, itm => {
      return this.contains(itm, formattedQuery);
    });
    store.setState({itsFilterd});
    this.state.search=text;
  };

  contains = ({ product_name }, query) => {
    if (product_name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  renderHeader=()=>{
    return (
      <SearchBar
      placeholder="Search Here"
      lightTheme        
      round 
      onChangeText={queryText => this.handleSearch(queryText)}
      autoCorrect={false}
      value={this.state.search}
     />
    );
  }

  render() {
    const {
      navigation: {
        state: { params },
      },
    } = this.props;
    const { id } = params;
    const { avatar, name, email, phone } = this.state.contacts.find(
      (contact) => contact.id === id
    );
    global.thisname = name;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.avatarSection}>
            <ContactThumbnail avatar = {require('../assets/pal.jpg')} name={name} phone={phone} />
          </View>
          <View style={styles.detailsSection}>
            <DetailListItem
              icon="mail"
              title="Email"
              subtitle={email}
              onPress={() => Linking.openURL(`mailto:${email}`)}
            />
            <DetailListItem
              icon="phone"
              title="Work"
              subtitle={phone}
              onPress={() => Linking.openURL(`tel:${phone}`)}
            />
            <DetailListItem title="Products" />
            <FlatList
              ListHeaderComponent={this.renderHeader}
              data={this.state.itsFilterd}
              keyExtractor={keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: "white",
  },
});
