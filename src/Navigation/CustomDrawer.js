import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import NavigationStrings from "./NavigationStrings";
import imagePath from "../Components/imagePath";
import styles from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CustomDrawer(props) {
  const [tokenAuth, setTokenAuth] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status


  useEffect(() => {
    const getDataFromStorage = async () => {
      try {
        const tokenAuthValue = await AsyncStorage.getItem("TokenAuth");
        const userValue = await AsyncStorage.getItem("UserId");
  
        if (tokenAuthValue !== null) {
          setTokenAuth(tokenAuthValue);
        }
  
        if (userValue !== null) {
          setUser(userValue);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
   
        }
      } catch (error) {
        console.log("Error reading data from AsyncStorage:", error);
      }
    };
  
    getDataFromStorage();
  }, []);





  const { navigation } = props;
  return (
    <DrawerContentScrollView style={{ backgroundColor: "#000000" }} {...props}>
      <View
        style={{ backgroundColor: "#000000", marginBottom: 50, marginTop: 20 }}
      >
        <Image source={imagePath.fondob} style={styles.imgsidebar} />
        {/*<Image source={ImagePath.logotexto} style={styles.imgsidebar} />*/}
      </View>

 {isLoggedIn == true ?
 (
  <View>
  <DrawerItem
    style={{
      backgroundColor: "#ffff",
      borderWidth: 0.5,
      borderColor: "#ffff",
      marginBottom: 30,
      color: "#000000",
    }}
    label="MI PERFIL"
    onPress={() => navigation.navigate(NavigationStrings.PROFILE)}
    icon={() => (
      <Image source={imagePath.icperfil} style={styles.icon} />
    )}
    labelStyle={{
      color: "black",
      fontWeight: "600",
      fontSize: 20,
      textAlign: "center",
    }}
  />

</View>
 )
 :
 (null)}

<DrawerItem
        style={{
          backgroundColor: "#ffff",
          borderWidth: 0.5,
          borderColor: "#ffff",
          marginBottom: 30,
          color: "#000000",
        }}
        label="INICIO"
        onPress={() => navigation.navigate(NavigationStrings.HOME)}
        icon={() => <Image source={imagePath.icHome} style={styles.icon} />}
        labelStyle={{
          color: "black",
          fontWeight: "600",
          fontSize: 20,
          textAlign: "center",
        }}
      />

      <DrawerItem
        style={{
          backgroundColor: "#ffff",
          borderWidth: 0.5,
          borderColor: "#ffff",
          marginBottom: 30,
          color: "#000000",
        }}
        label="SIMULADOR "
        onPress={() => navigation.navigate(NavigationStrings.SIMULADOR)}
        icon={() => <Image source={imagePath.icMoney} style={styles.icon} />}
        labelStyle={{
          color: "black",
          fontWeight: "600",
          fontSize: 20,
          textAlign: "center",
        }}
      />
               


        <View>
           <DrawerItem
            style={{
              backgroundColor: "#ffff",
              borderWidth: 0.5,
              borderColor: "#ffff",
              marginBottom: 30,
              color: "#000000",
            }}
            label="INVERTIR AHORA"
            onPress={() => navigation.navigate(NavigationStrings.SIGNUP)}
            icon={() => (
              <Image source={imagePath.icMoneyinv} style={styles.icon} />
            )}
            labelStyle={{
              color: "black",
              fontWeight: "600",
              fontSize: 20,
              textAlign: "center",
            }}
          />

          <DrawerItem
            style={{
              backgroundColor: "#ffff",
              borderWidth: 0.5,
              borderColor: "#ffff",
              marginBottom: 20,
              color: "#000000",
            }}
            label="INICIAR SESIÓN"
            onPress={() => navigation.navigate(NavigationStrings.LOGIN)}
            icon={() => <Image source={imagePath.icUser} style={styles.icon} />}
            labelStyle={{
              color: "black",
              fontWeight: "600",
              fontSize: 20,
              textAlign: "center",
            }}
          />
        </View>

    </DrawerContentScrollView>
  );
}
export default CustomDrawer;
