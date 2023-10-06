import React from "react";

import { Alert, Button, Image, Pressable } from "react-native";
import CustomDrawer from "./CustomDrawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationStrings from "./NavigationStrings";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Login, Signup } from "../Screens";
import Profile from "../Screens/User/Profile";
import Simulador from "../Screens/Simulador/Simulador";
import Form1 from "../Screens/Registro/Form1";
import Form2 from "../Screens/Registro/Form2";
import Form3 from "../Screens/Registro/Form3";
import Form4 from "../Screens/Registro/Form4";
import Form5 from "../Screens/Registro/Form5";
import MisDatos from "../Screens/User/MisDatos/MisDatos";
import MiInversion from "../Screens/User/MisDatos/MiInversion";


const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name={NavigationStrings.HOME} component={Home} />
        <Drawer.Screen name={NavigationStrings.LOGIN} component={Login} />
        <Drawer.Screen name={NavigationStrings.SIGNUP} component={Signup} />
        <Drawer.Screen name={NavigationStrings.PROFILE} component={Profile} />


        <Drawer.Screen name={NavigationStrings.SIMULADOR} component={Simulador} />

        <Drawer.Screen name={NavigationStrings.FORM1} component={Form1} />

        <Drawer.Screen name={NavigationStrings.FORM2} component={Form2} />

        <Drawer.Screen name={NavigationStrings.FORM3} component={Form3} />
        <Drawer.Screen name={NavigationStrings.FORM4} component={Form4} />
        <Drawer.Screen name={NavigationStrings.FORM5} component={Form5} />

        <Drawer.Screen name={NavigationStrings.MISDATOS} component={MisDatos} />

        <Drawer.Screen name={NavigationStrings.MIINVERSION} component={MiInversion} />



      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
