import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image, Text, Pressable ,ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

const Simulador = () => {
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [resultado,setResultado]=useState("");

  const plazocat = ["Un año", "Dos años", "Tres años"];

  const handlePlazoSelect = (selectedItem, index) => {
    setPlazo(selectedItem);
  };

  const handleCalculo=()=>{
 

    const URI = "https://inmobicapital.com:9589/test/rendimiento";
    const config = {
      headers: {
        key: "497eb7602213ecc9f64bd9630cd9e829",
      },
    };

    const data = {
        monto: monto,
        plazo: plazo,
   
      };
      const jsonData = JSON.stringify(data);

      axios.post(URI, jsonData, config)
      .then((response)=>{
        const respp=response.data
        const resultadocal=respp.Rendimiento
        const resjson = JSON.stringify(resultadocal);
        console.log(respp.code)
        setResultado(resjson)
      })
      .catch((error)=>{
        const error1=error
        const resjsone = JSON.stringify(error1);
     alert("EL MONTO DEBE SER SUPERIOR A $20,000")
        
      })


  }

  return (
    <LinearGradient
      colors={["#000000", "#000000"]}
      style={styles.linearGradient}
    >
           <ScrollView>
      <View style={styles.container}>
        <Text style={styles.txtsim}>SIMULADOR DE INVERSI&Oacute;N</Text>

        <TextInput
          style={styles.input}
          placeholder="MONTO"
          value={monto}
          keyboardType="number-pad"
          placeholderTextColor="#000000"
          onChangeText={(text) => setMonto(text)}
        />

        <SelectDropdown
          style={styles.selectDropdown}
          dropdownStyle={styles.dropdown}
          buttonStyle={styles.dropdownButton}
          textStyle={styles.dropdownText}
          data={plazocat}
          defaultButtonText="PLAZO"
          placeholderTextColor="#fff"
          onSelect={(selectedItem) => {
            if (selectedItem == "Un año") {
              setPlazo(12);
          
            } else if (selectedItem == "Dos años") {
                setPlazo(24);
            } else if (
              selectedItem == "Tres años" ) {
                setPlazo(36);
            }

            //setTipop(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        <Pressable onPress={handleCalculo} style={styles.inputsim}>
            <Text style={styles.txtsim1}>CALCULAR</Text>
        </Pressable>
{resultado ?
(

  <View style={styles.cardresult}>
  
  <Text style={styles.resulttxt}>${resultado}</Text>
  <Text style={styles.resultnote}>*rendimiento bruto</Text>
</View>
)
:
(null)


}



      </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  txtsim: {
    color: "#fff",
    marginTop: 10,
    marginBottom: 30,
    fontSize: 30,
  },
  resultnote:{
    textAlign:"center"
  },
  resulttxt: {
    color: "#000000",
    marginTop: 40,
    marginBottom: 10,
    fontSize: 50,
    textAlign:"center",
    fontWeight:"bold"
  },
  input: {
    width: 370,
    height: 60,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#ffff",
  },
  inputsim: {
    width: 370,
    height: 70,
    borderWidth: 1,
    borderColor: "#FF6800",
    marginBottom: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop:30,

  
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#000000",
  },
  txtsim1:{
    color:"#FF6800",
    textAlign:"center",
    marginTop:20,
    fontSize:20,
    fontWeight:"bold"

  },
  selectDropdown: {
    width: "100%",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  dropdownButton: {
    marginTop: 20,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ffff",
    width:370,
  },
  dropdownText: {
    fontSize: 16,
  },
  imgtitle12: {
    alignSelf: "center",
    height: 150,
    width: 155,
    marginBottom: 5,
    marginTop: 10,
  },
  cardresult:{
    marginTop:20,
    backgroundColor:"#fff",
    height:150,
    width:"100%",
    borderRadius:10,
    borderWidth:2,
    borderColor:"#0000"

  },
});

export default Simulador;
