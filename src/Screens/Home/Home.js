import React from 'react';
import { Text, View ,ScrollView,Image,Pressable} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import NavigationStrings from '../../Components/NavigationStrings';
import styles from '../../Styles';
import imagePath from '../../Components/imagePath';
import NavigationStrings from '../../Navigation/NavigationStrings';
const HomePage=({navigation})=>{

    const gotoLogin = () => {
        navigation.navigate(NavigationStrings.LOGIN, {title: 'INICIO'});
      };
    
 
      const gotoSim = () => {
        navigation.navigate(NavigationStrings.SIMULADOR);
      };

      const gotoSignup = () => {
        navigation.navigate(NavigationStrings.SIGNUP);
      };

    return(

      <LinearGradient
      colors={['#000000', '#000000', '#010101']}
      style={styles.linearGradient}>
      <ScrollView>
        <View style={styles.container}>
        <Image source={imagePath.homeimg} style={styles.Homeimg} />
          
            
        <Text style={styles.introtxt}>Haz crecer tu patrimonio</Text>
          <Text style={styles.cursitxt}>
            invirtiendo con respaldo inmobiliario
          </Text>

        <View>
              <Pressable onPress={gotoSim} style={styles.botininvestprohome}>
              <Image source={imagePath.icMoney} style={styles.icon} />
          
                <Text style={styles.txtsubmithome}> SIMULADOR</Text>
              </Pressable>

        </View>


       

<View>
              <Pressable onPress={gotoSignup} style={styles.botininvestprohome}>
              <Image source={imagePath.icMoneyinv} style={styles.icon} />
          
                <Text style={styles.txtsubmithome}> INVERTIR</Text>
              </Pressable>

        </View>
        <View>
              <Pressable onPress={gotoLogin} style={styles.botininvestprohome}>
              <Image source={imagePath.icUser} style={styles.icon} />
          
                <Text style={styles.txtsubmithome}> INICIAR SESI&Oacute;N</Text>
              </Pressable>

        </View>




   

   
          
        </View>
      </ScrollView>
    </LinearGradient>

    )
}

export default HomePage