import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Notifications } from "expo";
import Moda from "../components/Modal";

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [jd, setjd] = useState();

  const getUserUdesc = async () => {
    try {
      global.udesc = (await AsyncStorage.getItem("udesckey")) || "none";
    } catch (error) {
      console.log(error.message);
    }
    return udesc;
  };
  getUserUdesc();
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const notify = (t) => {
    const localNotification = {
      title: "Warning",
      body: "This product contains harmful ingredients:-\n" + t.replace(/\\r\\n/g, ', '),
    };
    const schedulingOptions = {
      time: new Date().getTime() + 1000,
    };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };
  
  const handleBarCodeScanned = ({ type, data }) => {
    fetch("http://192.168.1.108/contact-list/item.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: `${data}`,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setjd([JSON.stringify(responseJson)])
        //global.srs=[JSON.stringify(responseJson)]
        /*Alert.alert('Product Details ✔',
        '------------------------'
        +'\n.............'+JSON.stringify(responseJson).split(',')[2].split(':')[0].replace(/"/g, '')+'.............\n'
        +'\n-> '+JSON.stringify(responseJson).split(',')[2].split(':')[1].replace(/"/g, '')+'\n'
        +'------------------------'
        +'\n.............'+JSON.stringify(responseJson).split(',')[3].split(':')[0].replace(/"/g, '')+'...............\n'
        +'\n-> '+JSON.stringify(responseJson).split(',')[3].split(':')[1].replace(/"/g, '')+'\n'
        +'------------------------'
        +'\n.............'+JSON.stringify(responseJson).split(',')[4].split(':')[0].replace(/"/g, '')+'...........\n'
        +'\n-> '+JSON.stringify(responseJson).split(',')[4].split(':')[1].replace(/"/g, '')+'\n'
        +'------------------------'
        +'\n.............'+JSON.stringify(responseJson).split(',')[5].split(':')[0].replace(/"/g, '')+'........................\n'
        +'\n-> '+JSON.stringify(responseJson).split(',')[5].split(':')[1].replace(/\\r\\n/g, ', ')+'\n'
        +'------------------------'
        +'\n.............'+JSON.stringify(responseJson).split(',')[6].split(':')[0].replace(/"/g, '')+'.............................\n'
        +'\n-> '+JSON.stringify(responseJson).split(',')[6].split(':')[1].replace(/\\r\\n/g, ', ')+'\n'
        +'------------------------'
        +'\n.............'+JSON.stringify(responseJson).split(',')[7].split(':')[0].replace(/"/g, '')+'......................\n'
        +'\n-> '+JSON.stringify(responseJson).split(',')[7].split(':')[1].replace(/"/g, '')+'\n'
        +'------------------------'
        +'\n.............'+JSON.stringify(responseJson).split(',')[8].split(':')[0].replace(/"/g, '')+'.......................\n'
        +'\n-> '+JSON.stringify(responseJson).split(',')[8].split(':')[1].replace(/"/g, '')+'\n'
        +'------------------------\n'
        +'Produced by: \n<< '+JSON.stringify(responseJson).split(',')[2].split(':')[1].replace(/"/g, '')+' >>'
        +'\n------------------------'
        ,          [
          {
            text: 'Cancel',
          },
          { text: 'OK' }
        ],
        )*/
        if (JSON.stringify(responseJson).split(",")[5].includes(global.udesc))
          notify(JSON.stringify(responseJson).split(",")[5]);
      })
      .catch((error) => {
        alert("QR ID Not Exist !!!");
        setjd(null)
      });
      setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (jd) &&(
        <Moda text={jd}/>
      )}
      {scanned && (
        <Button
          style={{ color: "red" }}
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}

    </View>
  );
}
