import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
//import axios from "axios";
import NavigationStrings from "../../../Navigation/NavigationStrings";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../../Styles";
import imagePath from "../../../Components/imagePath";

const MiInversion =({navigation})=>{
    const [tokenAuth, setTokenAuth] = useState("");
    const [id_User, setIdUser] = useState("");
  
    const [Historico, setHistorico] = useState(0);


    const [flaginvest,setFlaginvest]=useState(false)
    const [inversiones,setInversiones]=useState([]);
  
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
    console.log(id_User + "MI INVERSION");
  
const gotoInvest=()=>{

    const URIDATOBE = `https://inmobicapital.com:9589/test/usuario/${id_User}/inversion`;
    
    fetch(URIDATOBE, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenAuth}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud GET INVERSION ");
        }
      })
      .then((data) => {
        const resp=data.Inversiones
        console.log(resp.length)
        if(resp.leng > 0 ){
            setFlaginvest(true)
            setInversiones(resp)

        }
        
    
 
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error);
      });

}




    return(

        <LinearGradient
        colors={["#fff", "#ffff", "#ffff"]}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.container}>

          <Pressable onPress={gotoInvest} style={styles.botininvestProfile}>
              <Image source={imagePath.inversion} style={styles.icon} />

              <Text style={styles.txtsubmithome}>MI INVERSION </Text>
            </Pressable>

            {flaginvest == true ?
            (
                <View style={styles.cardmydata}>
                {inversiones.map((inversion) => (
                  <View key={beneficiario.inversionId}>
                    <Text style={styles.txtmisdatosContent}>marginBottom: {inversion.monto}</Text>
                    <Text style={styles.txtmisdatosContent}>Fecha Inicial: {inversion.fechaInicial}</Text>
                    <Text style={styles.txtmisdatosContent}>Fecha Final: {inversion.fechaFinal}</Text>
                    <Text style={styles.txtmisdatosContent}>D&iacute;a de Pago: {inversion.diaPago}</Text>
                    <Text style={styles.txtmisdatosContent}>Tasa: {inversion.tasa}</Text>
                    <Text style={styles.txtmisdatosContent}>Empresa: {inversion.empresa}</Text>
  
                  </View>
                ))}
              </View>

            )
            :
            (
            
  
   <View style={styles.cardmydata}>
                 <Text style={styles.txtLogint}>AUN NO HAY INVERSIONES </Text>
                 
                <Text style={styles.txtLogint}>Contactanos </Text>
                <Image source={imagePath.phone} style={styles.iconphone} />
                <Text style={styles.txtLogint}>55 8930 9248 </Text>
                <Image source={imagePath.mail} style={styles.iconphone} />
                <Text style={styles.txtLogint}>contacto@inmobicapital.com </Text>

   </View>
 

            )
        }







            </View>
            </ScrollView>
            </LinearGradient>
      
        
        


    )
}

export default MiInversion