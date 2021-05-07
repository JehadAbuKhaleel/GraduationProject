import React from "react";
import AppContainer from "../routes";

export default function App() {
  fetch("http://192.168.1.108/contact-list/contactlist.php");
  fetch("http://192.168.1.108/contact-list/products.php");
  return <AppContainer />;
}
