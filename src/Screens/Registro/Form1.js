import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Pressable

} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import styles from "../../Styles";
import axios from "axios";
import NavigationStrings from "../../Navigation/NavigationStrings";

import AsyncStorage from "@react-native-async-storage/async-storage";


const Form1 = ({navigation}) => {




    const [tokenAuth, setTokenAuth] = useState('');
    const [id_User,setIdUser]=useState("")

  const [Historico, setHistorico] = useState(0);



  const getDataFromStorage = async () => {
    try {
      const tokenAuthValue = await AsyncStorage.getItem('TokenAuth');
      const userValue = await AsyncStorage.getItem('UserId');
      
      const Historico=await AsyncStorage.getItem('HistoricoID');
    
   
      if (tokenAuthValue !== null) {
        setTokenAuth(tokenAuthValue) 
      }
      if (userValue !== null) {
        setIdUser(userValue);
      }
  
      if (Historico !== null) {
        setHistorico(Historico);
      }
     

 
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
  };

getDataFromStorage();
console.log(id_User)
  




  const ValidarData=(calle,nint,nexte,col,edo,cpostal)=>{
    if(calle !== null ||nint !== null ||nexte !== null ||col !== null ||edo !== null ||cpostal){
      console.log("datoscomplete")
    }
    else{
      alert("Hay campos vacios")

    }


  }

 





    //FORM DATA 
    const [calle, setCalle] = useState("");
    const [nint, setNint] = useState("");
    const [nexte, setNexte] = useState("");
    const [col, setCol] = useState("");
    const [alcaldia, setAlcaldia] = useState("");
    const [edo, setEdo] = useState("");
    const [cpostal, setCpostal] = useState("");

    
    const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/domicilio`;
    
    const data = {
      
      calle:calle,
                nint:nint,
                nexte:nexte,
                col:col,
                alcaldia:alcaldia,
                edo:edo,
                cpostal:cpostal
    
    };
    

    
    const config = {
      headers: {
        Authorization: `Bearer ${tokenAuth}`, // Agrega el encabezado de autorización con el token Bearer
      },
    };
    const jsonData = JSON.stringify(data);


    const SubmitForm=()=>{


      

        //console.log(calle,nint,nexte,col,edo,cpostal)
        ValidarData(calle,nint,nexte,col,edo,cpostal)
        

    
          axios
          .post(URI, jsonData, config)
          .then(async (response) => {
       
        const banderaform=response.data.code
    
        //const responseData = response.data;
    
       if(banderaform == 201 ){
     

        navigation.navigate(NavigationStrings.FORM2);

        alert("Paso 1 completado")
        

     
       }

    
        
      })
      .catch((error)=>{

        navigation.navigate(NavigationStrings.FORMULARIOS,{id_User:id_User,Token:token,HistoricoId:IdFormulario});
        console.log(error)
        alert("Hubo un error revise sus respuestas")
            
      })

}








  return (



    <LinearGradient
        colors={["#fff", "#ffff", "#ffff"]}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.container}>
 
            <Text style={styles.formtitle}>Paso 1 de 5 </Text>

            <Text style={styles.formtitle}>Domicilio</Text>


         

<TextInput
  style={styles.input}
  placeholder="Calle"
  value={calle}
  name="calle"
  onChangeText={(text) => setCalle(text)}
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
  value={nexte}
  name="nexte"
  keyboardType="numeric"
  onChangeText={(text) => setNexte(text)}
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


<Pressable onPress={SubmitForm} style={styles.button}>
          <Text style={styles.txtlogsubmit}>Guardar Datos</Text>
        </Pressable>

          






            </View>
            </ScrollView>
            </LinearGradient>
  );
};

export default Form1;