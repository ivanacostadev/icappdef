import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Slider,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavigationStrings from "../../Navigation/NavigationStrings";
import styles from "../../Styles";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Form3 = ({ navigation }) => {
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

  console.log(id_User + "F3");

  const [nombreb, setNombreb] = useState("");
  const [apb, setApb] = useState("");
  const [amb, setAmb] = useState("");
  const [parent, setParent] = useState("");
  const [porcentaje, setPorcentaje] = useState(0);
  const [telfijo, setTelfijo] = useState("");
  const [celularb, setCelularb] = useState("");
  const [calleb, setCalleb] = useState("");
  const [nint, setNint] = useState("");
  const [nextb, setNextb] = useState("");
  const [col, setCol] = useState("");
  const [alcaldia, setAlcaldia] = useState("");
  const [edo, setEdo] = useState("");
  const [cpostal, setCpostal] = useState("");

  const handleValueChange = (newValue) => {
    setPorcentaje(newValue);
  };

  const setFormB = () => {
    const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/beneficiario`;
    const token = tokenAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
      },
    };

    const data = {
      apb: apb,
      amb: amb,
      nombreb: nombreb,
      parent: parent,
      porcentaje: porcentaje,
      telfijo: telfijo,
      celularb: celularb,
      calleb: calleb,
      nint: nint,
      nextb: nextb,
      col: col,
      alcaldia: alcaldia,
      edo: edo,
      cpostal: cpostal,
    };
    const jsonData = JSON.stringify(data);
    axios.post(URI, jsonData, config).then((response) => {
      //console.log(response.data);

      const banderaform = response.data.code;
      if (banderaform == 201) {
        navigation.navigate(NavigationStrings.FORM4);
      }

      alert("Datos guardados :Paso 3 completado");
    });
  };
  return (
    <LinearGradient
      colors={["#fff", "#ffff", "#ffff"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeprofiletxt}>Termina tu registro</Text>

          <Text style={styles.welcomeprofiletxt}>Paso 3 de 5 </Text>
          <Text></Text>
          <Text style={styles.welcomeprofiletxtf3}>Beneficiarios</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombreb}
            name="nombreb"
            onChangeText={(text) => setNombreb(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido paterno"
            value={apb}
            name="apb"
            onChangeText={(text) => setApb(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido materno"
            value={amb}
            name="amb"
            onChangeText={(text) => setAmb(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Parentesco"
            value={parent}
            name="parent"
            onChangeText={(text) => setParent(text)}
          />

          <Text style={styles.welcomeprofiletxtf3}>PORCENTAJE</Text>

          <Slider
            style={{ width: "80%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            value={porcentaje}
            onValueChange={handleValueChange}
          />
          {
            <Text style={styles.welcomeprofiletxtf3}>
              %{parseInt(porcentaje)}
            </Text>
          }

          <TextInput
            style={styles.input}
            placeholder="Telefono Fijo"
            value={telfijo}
            name="telfijo"
            keyboardType="numeric"
            onChangeText={(text) => setTelfijo(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Celular"
            value={celularb}
            name="celularb"
            keyboardType="numeric"
            onChangeText={(text) => setCelularb(text)}
          />

          <Text style={styles.txtlog}>Domicilio</Text>

          <TextInput
            style={styles.input}
            placeholder="Calle"
            value={calleb}
            name="calleb"
            onChangeText={(text) => setCalleb(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="N&uacute;mero interior"
            value={nint}
            name="nint"
            keyboardType="numeric"
            onChangeText={(text) => setNint(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="N&uacute;mero exterior"
            value={nextb}
            name="nextb"
            keyboardType="numeric"
            onChangeText={(text) => setNextb(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Colonia"
            value={col}
            name="col"
            onChangeText={(text) => setCol(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Alcaldia &oacute; municipio"
            value={alcaldia}
            name="alcaldia"
            onChangeText={(text) => setAlcaldia(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="C&oacute;digo postal"
            value={cpostal}
            name="cpostal"
            keyboardType="numeric"
            onChangeText={(text) => setCpostal(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={edo}
            name="edo"
            onChangeText={(text) => setEdo(text)}
          />

          <Pressable onPress={setFormB} style={styles.button}>
            <Text style={styles.txtlogsubmit}>Guardar Datos</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default Form3;
