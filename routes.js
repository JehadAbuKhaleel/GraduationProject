import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Favorites from "./screens/Favorites";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import User from "./screens/User";
import Options from "./screens/Options";
import Scan from "./screens/Scan";
import colors from "./utils/colors";
import UpdateProfile from "./screens/UpdateProfile";
import HomeScreen from "./screens/HomeScreen";

const getTabBarIcon = (icon) => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreens = createStackNavigator(
  {
    Contacts,
    Profile,
  },
  {
    initialRouteName: "Contacts",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("list"),
    },
  }
);

const ScanScreen = createStackNavigator(
  {
    Scan,
  },
  {
    initialRouteName: "Scan",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("camera"),
    },
  }
);

const FavoritesScreens = createStackNavigator(
  {
    Favorites,
    Profile,
  },
  {
    initialRouteName: "Favorites",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("star"),
    },
  }
);

const UserScreens = createStackNavigator(
  {
    User,
    Options,
  },
  {
    mode: "modal",
    initialRouteName: "User",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("person"),
    },
  }
);

const UpdateProfileScreens = createStackNavigator(
  {
    UpdateProfile,
  },
  {
    mode: "modal",
    initialRouteName: "UpdateProfile",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("settings"),
    },
  }
);
const signout = createSwitchNavigator(
  {
    Options,
    HomeScreen,
  },
  {
    mode: "modal",
    initialRouteName: "Options",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("login"),
    },
  }
);

signout.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName === "HomeScreen") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Producers: ContactsScreens,
    ScanQR: ScanScreen,
    Favorites: FavoritesScreens,
    User: UserScreens,
    Update: UpdateProfileScreens,
    SignOut: signout,
  },
  {
    initialRouteName: "User",
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: true,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
    },
  }
);

export default createAppContainer(TabNavigator);
