import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import NavigationStrings from "../../Navigation/NavigationStrings";
import styles from "../../Styles";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import imagePath from "../../Components/imagePath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { stringMd5 } from "react-native-quick-md5";

const LoginPage = ({ navigation }) => {
  const [location, setLocation] = useState({});
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");
  const [accuracys, setAccuracys] = useState("");
  const [dispositivo, setDispositivo] = useState("");
  const [sysop, setSysop] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        console.log("Permisos aceptados");
      } else {
        console.log("Permisos Rechazados");
      }
      const loc = await Location.getCurrentPositionAsync();
      //console.log(loc.coords.accuracy)
      setLocation(loc);
      setLatitud(loc.coords.latitude);
      setLongitud(loc.coords.longitude);
      setAccuracys(loc.coords.accuracy);
      setSysop(Device.osName);
      setDispositivo(Device.brand);
    })();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkEmail, setCheckEmail] = useState(false);

 

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
  };
  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 Characters Long.";
    }

    return null;
  };

  const goToProfile=(id_User,Token,nombreuser,apPat,apMat,bloqueado,Historico)=>{
    navigation.navigate(NavigationStrings.PROFILE,{id_User:id_User,Token:Token,nombreuser:nombreuser,apPat:apPat,apMat:apMat,bloqueado:bloqueado,Historico:Historico})
  
  }
  
  const handleLogin = async () => {
    const checkPassword = checkPasswordValidity(password);
    const URI = "https://inmobicapital.com:9589/test/login";
    const config = {
      headers: {
        key: "497eb7602213ecc9f64bd9630cd9e829",
      },
    };

    const contrasena = stringMd5(password);
    const data = {
      email: email,
      password: contrasena,
      geolocalizacion: {
        latitud: parseInt(latitud),
        longitud: parseInt(longitud),
        accuracy: parseInt(accuracys),
        dispositivo: dispositivo,
        sysop: sysop,
      },
    };
    const jsonData = JSON.stringify(data);

    if (!checkPassword) {

      axios.post(URI, jsonData, config)
      .then(async (response) => {
        const responseData = response.data;
        const Token = responseData.token;
        const id_User = responseData.Usuario["usuarioId"];
        const bloqueo=responseData.Usuario["boolBloqueado"];
        const nombreuser=responseData.Usuario["nombres"];
        const apPat=responseData.Usuario["apPat"];
        const apMat= responseData.Usuario["apMat"];
        const Historico=responseData.historicoEstadoId

        await AsyncStorage.setItem('TokenAuth', Token);
        await AsyncStorage.setItem('UserId', id_User.toString());
        await AsyncStorage.setItem("NombreUser",nombreuser);
        await AsyncStorage.setItem("ApPat",apPat);
        await AsyncStorage.setItem("ApMat",apMat);
        await AsyncStorage.setItem("HistoricoID",Historico.toString());
       


        
   
      
        



        alert("Inicio exitoso")
  

        goToProfile(id_User,Token,nombreuser,apPat,apMat,bloqueo,Historico);
      
      
      })
      .catch((error)=>{
        console.log(error)
        alert("Password o email incorrectos")
      })

    } else {
      alert("ALGO SALIO MAL");
    }
  };



  return (
    <LinearGradient colors={["#ffff", "#ffff"]} style={styles.linearGradient}>
      <ScrollView>
        <View style={styles.containerLogin}>
          <Text style={styles.txtLogint}>INICIAR SESI&Oacute;N</Text>
           <View>
            <TextInput
              style={styles.inputlogin}
              underlineColorAndroid="transparent"
              placeholder="Email"
              value={email}
              onChangeText={(text) => handleCheckEmail(text)}
            />
          </View>

          <View>
            <TextInput
              style={styles.inputlogin}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              value={password}
              secureTextEntry={seePassword}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
              style={styles.wrapperIcon}
              onPress={() => setSeePassword(!seePassword)}
            >
              <Image
                source={seePassword ? imagePath.icEyeOff : imagePath.icEye}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {email == "" || password == "" || checkEmail == true ? (
            <Text style={styles.txtlogsubmit}></Text>
          ) : (
            <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
              <Text style={styles.txtlogLogin}>Iniciar Sesi&oacute;n </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LoginPage;
