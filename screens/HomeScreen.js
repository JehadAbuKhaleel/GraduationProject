import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Muntaji</Header>

    <Paragraph>
      The application helps you to guarantee the details and contents of the
      product
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
      Login
    </Button>
    <Button
      mode="outlined" onPress={() => navigation.navigate("RegisterScreen")}>
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
