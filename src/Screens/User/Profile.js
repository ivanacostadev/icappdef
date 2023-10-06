import React, { useState,useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ScrollView,

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import styles from "../../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imagePath from "../../Components/imagePath";
import NavigationStrings from "../../Navigation/NavigationStrings";


const Profile = ({navigation,route}) => {




  const [Token,setTokenAuth]=useState("")

  const [id_User,setIdUser]=useState("")
  const [nombreuser, setNombreuser] = useState("");
  const [apPat, setApPat] = useState("");
  const [apMat, setApMat] = useState("");
  const [HistoricoId,setHistoricoId]=useState("")
  console.log(HistoricoId+"HISTORICO")



    



  const getDataFromStorage = async () => {
    try {
      const tokenAuthValue = await AsyncStorage.getItem('TokenAuth');
      const userValue = await AsyncStorage.getItem('UserId');
      const nombreuser = await AsyncStorage.getItem("NombreUser");
      const apPat = await AsyncStorage.getItem("ApPat");
      const apMat = await AsyncStorage.getItem("ApMat");
      const Historico = await AsyncStorage.getItem("HistoricoID");
     
      if (tokenAuthValue !== null) {
        setTokenAuth(tokenAuthValue)
   
      }
      if (userValue !== null) {
        setIdUser(userValue);
 
      }
      if (nombreuser !== null) {
        setNombreuser(nombreuser);
      }
      if (apPat !== null) {
        setApPat(apPat);
      }
      if (apMat !== null) {
        setApMat(apMat);
      }
      if (Historico !== null) {
        setHistoricoId(Historico);
      }
 
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
  };
 

    getDataFromStorage();

   
  const gotoSim = () => {
    navigation.navigate(NavigationStrings.SIMULADOR);
  };


  const vamosform1=()=>{
    navigation.navigate(NavigationStrings.FORM1);

  }
  const vamosform2=()=>{
    navigation.navigate(NavigationStrings.FORM2);

  }
  const vamosform3=()=>{
    navigation.navigate(NavigationStrings.FORM3);

  }
  const vamosform4=()=>{
    navigation.navigate(NavigationStrings.FORM4);

  }

const FlagHistorica=HistoricoId
  const gotoforms=()=>{
    if(FlagHistorica ==1){
 
      vamosform1()
 

    }
    if(FlagHistorica ==2){
      vamosform4()

    }
    if(FlagHistorica ==3){
      vamosform3()
 

    }
    if(FlagHistorica ==4){
      vamosform4()
 

    }


  }


  const MisDatos = ()=>{
    navigation.navigate(NavigationStrings.MISDATOS);

  }
  const Inversion=()=>{
    navigation.navigate(NavigationStrings.MIINVERSION);

  }



 

  return (
    <LinearGradient
      colors={["#000000", "#000000", "#000000"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <View style={styles.container}>
          <Image source={imagePath.homeimg} style={styles.Homeimg} />

          <Text style={styles.welcomeprofiletxtpp}>
            {nombreuser} {apPat} {apMat}
          </Text>
          <View>
            <Pressable onPress={gotoSim} style={styles.botininvestProfile}>
              <Image source={imagePath.icMoney} style={styles.icon} />

              <Text style={styles.txtsubmithome}> SIMULADOR</Text>
            </Pressable>
          </View>

          {HistoricoId == 1 || HistoricoId == 2 || HistoricoId == 3 ? (
            <View>
              <Pressable onPress={gotoforms} style={styles.botininvestProfile}>
                <Image source={imagePath.icregistro} style={styles.icon} />

                <Text style={styles.txtsubmithome}> INVERTIR</Text>
              </Pressable>
            </View>
          ) : null}
      <Pressable onPress={MisDatos} style={styles.botininvestProfile}>
              <Image source={imagePath.misdatos} style={styles.icon} />

              <Text style={styles.txtsubmithome}> MIS DATOS</Text>
            </Pressable>


            <Pressable onPress={Inversion} style={styles.botininvestProfile}>
              <Image source={imagePath.inversion} style={styles.icon} />

              <Text style={styles.txtsubmithome}>MI INVERSION </Text>
            </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
