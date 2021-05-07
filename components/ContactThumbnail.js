import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ColorPropType,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";

export default function ContactThumbnail({
  name,
  phone,
  avatar,
  desc,
  textColor,
  onPress,
}) {
  const colorStyle = {
    color: textColor,
  };
  switch (name) {
    case "Alislamya Company":
      {
        avatar = require('../assets/isl.png');
      }
      break;
    case "Saniora Company":
      {
        avatar = require('../assets/san.png');
      }
      break;
  }
  const ImageComponent = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageComponent onPress={onPress}>
        <Image source={avatar} style={styles.avatar} />
      </ImageComponent>
      {name !== "" && <Text style={[styles.name, colorStyle]}>{name}</Text>}

      {phone !== "" && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{ color: textColor }} />
          <Text style={[styles.phone, colorStyle]}>{phone}</Text>
        </View>
      )}

      {desc !== "" && (
        <View>
          <Text style={{ fontWeight: "bold", color: "#4C84FF" }}>
            {"\n"}illnesses or allergies:
          </Text>
          <Text style={{ color: "red" }}>{desc}</Text>
        </View>
      )}
    </View>
  );
}

ContactThumbnail.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  desc: PropTypes.string,
  textColor: ColorPropType,
  onPress: PropTypes.func,
};

ContactThumbnail.defaultProps = {
  name: "",
  phone: "",
  desc: "",
  textColor: "white",
  onPress: null,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "white",
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: "bold",
  },
  phoneSection: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
});
