import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,ScrollView,Image
} from "react-native";
import colors from "../utils/colors";

const Moda = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ScrollView>
          <Text style={styles.modalText}>Product Details ✔</Text>
          <Image style={{ width: 50, height: 50,marginLeft:60,marginBottom:10}} source={require('../assets/defaultqr.png')} />
          <Text style={styles.modalTextchild1}>{props.text[0].split(',')[2].split(':')[0].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild2}>{props.text[0].split(',')[2].split(':')[1].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild1}>{props.text[0].split(',')[3].split(':')[0].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild2}>{props.text[0].split(',')[3].split(':')[1].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild1}>{props.text[0].split(',')[4].split(':')[0].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild2}>{props.text[0].split(',')[4].split(':')[1].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild1}>{props.text[0].split(',')[5].split(':')[0].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild2}>{props.text[0].split(',')[5].split(':')[1].replace(/\\r\\n/g, ', ')}</Text>
          <Text style={styles.modalTextchild1}>{props.text[0].split(',')[6].split(':')[0].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild2}>{props.text[0].split(',')[6].split(':')[1].replace(/\\r\\n/g, ', ')}</Text>
          <Text style={styles.modalTextchild1}>{props.text[0].split(',')[7].split(':')[0].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild2}>{props.text[0].split(',')[7].split(':')[1].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild1}>{props.text[0].split(',')[8].split(':')[0].replace(/"/g, '')}</Text>
          <Text style={styles.modalTextchild2}>{props.text[0].split(',')[8].split(':')[1].replace(/"/g, '')}</Text>
            </ScrollView>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginBottom:30
  },
  modalView: {
    borderWidth:1,
    borderStyle:'dashed',
    borderColor:'blue',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textShadowColor:'#585858',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:20,
    fontSize:20,
    color:'blue',
    marginBottom: 15,
    textAlign: "center"
  },
  modalTextchild1: {
    borderWidth:1,
    borderColor:colors.blue,
    fontWeight:'bold',
    fontSize:15,
    color:colors.black,
    marginBottom: 15,
    textAlign: "center"
  },
  modalTextchild2: {
    fontSize:15,
    color:'blue',
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Moda;