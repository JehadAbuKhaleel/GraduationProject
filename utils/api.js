import sleep from "../utils/sleep";
import contactList from "./mock/contactlistyyy";
import itemsList from "./mock/itemsList.json";

const mapContact = (contact) => {
  const { id, name, email,phone } = contact;
  let avatar;
  switch (name) {
    case "Alislamya Company":
      {
        avatar = require("../assets/isl.png");
      }
      break;
    case "Saniora Company":
      {
        avatar = require("../assets/san.png");
      }
      break;
    default: {
      avatar = require("../assets/pal.jpg");
    }
  }
  //const img = "'" + "../assets/" + avatar + "'";
  return {
    id,
    name,
    email,
    phone,
    avatar,
    favorite: false, //Math.random() >= 0.5 randomly generate favorite contacts
  };
};

export const fetchContacts = async () => {
  await sleep(500);
  return contactList.results.map(mapContact);
};

const mapItem = (item) => {
  const {qr_id, company_name, product_name, PriceWithMargin } = item;
  let avatar;
  switch (company_name) {
    case "Alislamya Company":
      {
        avatar = require("../assets/isl.png");
      }
      break;
    case "Saniora Company":
      {
        avatar = require("../assets/san.png");
      }
      break;
    default: {
      avatar = require("../assets/pal.jpg");
    }
  }
  return {
    company_name,
    product_name,
    PriceWithMargin,
    avatar,
    qr_id
  };
};
export const fetchItems = async () => {
  await sleep(500);
  return itemsList.results.map(mapItem);
};
