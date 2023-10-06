import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "../../Styles";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationStrings from "../../Navigation/NavigationStrings";

const Form2 = ({ navigation }) => {
  const [tokenAuth, setTokenAuth] = useState("");
  const [id_User, setIdUser] = useState("");

  const [Historico, setHistorico] = useState(0);

  const getDataFromStorage = async () => {
    try {
      const tokenAuthValue = await AsyncStorage.getItem("TokenAuth");
      const userValue = await AsyncStorage.getItem("UserId");

      const Historico = await AsyncStorage.getItem("HistoricoID");

      if (tokenAuthValue !== null) {
        setTokenAuth(tokenAuthValue);
      }
      if (userValue !== null) {
        setIdUser(userValue);
      }

      if (Historico !== null) {
        setHistorico(Historico);
      }
    } catch (error) {
      console.log("Error reading data from AsyncStorage:", error);
    }
  };

  getDataFromStorage();
  console.log(id_User + "F2");

  const tipopersona = [
    "FISICA",
    "MORAL",
    "PERSONA FISICA CON ACTIVIDAD EMPRESARIAL",
  ];

  const [tipop, setTipop] = useState("");
  const [rfc, setRfc] = useState("");
  const [curp, setCurp] = useState("");
  const [telfijo, setTelfijo] = useState("");

  const [celular, setCelular] = useState("");

  //VALIDACIONES
  const validaRFC = (rfc) => {
    if (rfc.length == 10 || rfc.length == 13) {
      console.log("RFC CORRECTO");
      setFlagrfc(true);
    } else if (rfc.length < 10) {
      alert("RFC no debe ser menor a 10 caracteres");
      setFlagrfc(false);
    } else if (rfc.length > 14) {
      alert("RFC exede 13 caracteres");
      setFlagrfc(false);
    }
  };

  const validaCurp = (curp) => {
    if (curp.length == 18) {
      console.log("CURP CORRECTO");
      setFlagCurp(true);
    } else if (curp.length > 18) {
      alert("CURP INVALIDO");
      setFlagCurp(false);
    } else if (curp.length < 18) {
      alert("CURP INVALIDO");
      setFlagCurp(false);
    }
  };

  const validaNacional = (curp) => {
    const curpval = curp[11] + curp[12];
    const Nacidoext = "NE";

    if (curpval == Nacidoext) {
      alert("ERROR: Este CURP no corresponde a cuidadanos nacionales");
    }
  };

  const validacionFinal = (tipop, rfc, curp, celular) => {
    if (!tipop || !rfc || !curp || !celular) {
      alert("Hay campos vacíos");
      setLlenado(false);
    } else {
      setLlenado(true);
    }
  };

  //FLAGS
  const [llenado, setLlenado] = useState(false);
  const [flagrfc, setFlagrfc] = useState(false);
  const [flagcel, setFlagcel] = useState(false);
  const [flagcurp, setFlagCurp] = useState(false);

  ///HANDLE SUBMIT
  const handleForm = () => {
    validaRFC(rfc);

    validaCurp(curp);
    validaNacional(curp);

    const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/fiscales`;

    const token = tokenAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
      },
    };

    const data = {
      curp: curp,
      rfc: rfc,
      tipop: tipop,
      telfijo: telfijo,
      celular: celular,
    };
    const jsonData = JSON.stringify(data);

    axios
      .post(URI, jsonData, config)
      .then((response) => {
        //console.log(response.data);
        alert("Paso 2 completado");
        navigation.navigate(NavigationStrings.FORM3);
      })
      .catch((error) => {
        console.log(error);
        alert("Hubo un error");
      });
  };

  return (
    <LinearGradient
      colors={["#fff", "#ffff", "#ffff"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeprofiletxtf3}>Datos Fiscales</Text>

          <SelectDropdown
            dropdownStyle={styles.dropdown1DropdownStyle}
            buttonStyle={styles.dropdown1BtnStyle}
            defaultButtonText={"Tipo de Persona"}
            data={tipopersona}
            onSelect={(selectedItem) => {
              if (selectedItem == "FISICA") {
                setTipop("PF");
                console.log(tipop);
              } else if (selectedItem == "MORAL") {
                setTipop("PM");
              } else if (
                selectedItem == "PERSONA FISICA CON ACTIVIDAD EMPRESARIAL"
              ) {
                setTipop("PFAE");
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

          <TextInput
            style={styles.input}
            placeholder="RFC"
            value={rfc}
            name="rfc"
            autoCapitalize="characters"
            onChangeText={(text) => setRfc(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="CURP"
            value={curp}
            name="curp"
            autoCapitalize="characters"
            onChangeText={(text) => setCurp(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefono fijo"
            value={telfijo}
            name="telfijo"
            keyboardType="numeric"
            onChangeText={(text) => setTelfijo(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Celular"
            value={celular}
            name="celular"
            keyboardType="numeric"
            onChangeText={(text) => setCelular(text)}
          />

          <Pressable onPress={handleForm} style={styles.button}>
            <Text style={styles.txtlogsubmit}>Guardar Datos</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Form2;
