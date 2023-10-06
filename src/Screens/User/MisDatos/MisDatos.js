import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
//import axios from "axios";
import NavigationStrings from "../../../Navigation/NavigationStrings";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../../Styles";


const MisDatos=({ navigation })=>{
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
    console.log(id_User + "DATOS");
  
  






    const [banderaDatos,setBanderaDatos]=useState(0)
    const [banderaBene,setBanderaBene]=useState(0)

    const[calle,setCalle]=useState("")
    const[colonia,setColonia]=useState("")
    const[delegacion,setDelegacion]=useState("")
    const[estado,setEstado]=useState("")
    const[cp,setCp]=useState("")


    //BENEFICIARIO
  
    const [porcentaje,setPorcentaje]=useState("")
    //CALCUlO DE PORCENTAJE RESTEANTE 
    const porcentIgot=100
    const restap= porcentIgot - porcentaje
    const porcentFree=restap
    const [benes,setBenes]=useState("")


    const [beneficiarios, setBeneficiarios] = useState([]);







   
      const getMyData = () => {
        const URIDATOS = `https://inmobicapital.com:9589/test/usuario/${id_User}/domicilio`;
    
        fetch(URIDATOS, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error en la solicitud GET MY DATA ");
            }
          })
          .then((data) => {
            // Hacer algo con los datos recibidos
            const jsonDataCalle = JSON.stringify(data.Domicilio["calle"]);
            const jsonDataCol = JSON.stringify(data.Domicilio["colonia"]);
            const jsonDataDel = JSON.stringify(data.Domicilio["delMun"]);
            const jsonDataEdo = JSON.stringify(data.Domicilio["estado"]);
            const jsonDataCP = JSON.stringify(data.Domicilio["cp"]);
            
            
            const callesin = jsonDataCalle.replace(/["']/g, '');
            setCalle(callesin)
            const colsin = jsonDataCol.replace(/["']/g, '');       
            setColonia(colsin)
            const delsin = jsonDataDel.replace(/["']/g, '');
            setDelegacion(delsin)
            const edosin = jsonDataEdo.replace(/["']/g, '');
            setEstado(edosin)
            const cpsin = jsonDataCP.replace(/["']/g, '');
            setCp(cpsin) 
     
          })
          .catch((error) => {
            // Manejar el error de la solicitud
            console.error(error);
          });
      };
      const getMyDataBene = () => {
        const URIDATOBE = `https://inmobicapital.com:9589/test/usuario/${id_User}/beneficiario`;
    
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
              throw new Error("Error en la solicitud GET ");
            }
          })
          .then((data) => {
      
            setBeneficiarios(data.Beneficiario);
     
          })
          .catch((error) => {
            // Manejar el error de la solicitud
            console.error(error);
          });
      };

      const getContrato=()=>{
        const tipo = "CONTRATO";
const URICONTRACT = `https://inmobicapital.com:9589/test/usuario/${id_User}/documentacion`;

const requestData = {
  tipo: tipo
};

fetch(URICONTRACT, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${tokenAuth}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(requestData)
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error en la solicitud GET DOCUMENTACION");
    }
  })
  .then((data) => {
    
    console.log(data);
  })
  .catch((error) => {
    // Manejar el error de la solicitud
    console.error(error);
    console.log(requestData)
  });

       

      }

     
      

   
     
  


const benefiter=()=>{
             
    setBanderaBene(1)
    getMyDataBene()
}
const benfiterout = ()=>{
    setBanderaBene(0)

}

const getdatas =()=>{
    getMyData();
    setBanderaDatos(1)
   
}
const outdatas=()=>{
  
    setBanderaDatos(0)

}

const getdocumentacion = ()=>{
    getContrato()

}






    return(
        <LinearGradient
        colors={["#fff", "#ffff", "#ffff"]}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.container}>
      

         
          <Pressable  onPress={getdatas} onLongPress={outdatas} style={styles.botininvestpro}>
              <Text style={styles.txtloginbtn}> MIS DATOS </Text>
            </Pressable>

            {banderaDatos ? 
            (
                <View style={styles.cardmydata}>

                <Text style={styles.txtmisdatosContent}>CALLE: {calle} </Text>
                <Text style={styles.txtmisdatosContent}>COLONIA: {colonia} </Text>
                <Text style={styles.txtmisdatosContent}>DELEGACI&Oacute;N: {delegacion} </Text>
                <Text style={styles.txtmisdatosContent}>ESTADO: {estado} </Text>
                <Text style={styles.txtmisdatosContent}>CP: {cp} </Text>
        </View>

          


            )
            :
            (null)
            
        }




            <Pressable  onPress={benefiter} onLongPress={benfiterout} style={styles.botininvestpro}>
              <Text style={styles.txtloginbtn}> MIS BENEFICIARIOS </Text>
            </Pressable>

            {banderaBene ? (
            <View style={styles.cardmydata}>
              {beneficiarios.map((beneficiario) => (
                <View key={beneficiario.beneficiarioId}>
                  <Text style={styles.txtmisdatosContent}>Nombre: {beneficiario.nombres}</Text>
                  <Text style={styles.txtmisdatosContent}>Apellido Paterno: {beneficiario.apPat}</Text>
                  <Text style={styles.txtmisdatosContent}>Apellido Materno: {beneficiario.apMat}</Text>
                  <Text style={styles.txtmisdatosContent}>Procentaje: {beneficiario.porcentaje}</Text>

                </View>
              ))}
            </View>
          ) : null}

            <Pressable  onPress={getdocumentacion} style={styles.botininvestpro}>
              <Text style={styles.txtloginbtn}> CONTRATO </Text>
            </Pressable>

            </View>
            </ScrollView>
            </LinearGradient>


    )
}

export default MisDatos