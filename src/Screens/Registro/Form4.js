import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavigationStrings from "../../Navigation/NavigationStrings";
import styles from "../../Styles";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imagePath from "../../Components/imagePath";

const Form4 = ({ navigation }) => {
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

  console.log(id_User + "F4");

  //Esta es la info en base 64
  const [imageData, setImageData] = useState("");
  const [titleDoc, setTitleDoc] = useState("");
  const [tipodoc, setTipoDoc] = useState(0);
  //const [selectedDocument, setSelectedDocument] = useState(null);
  const [flagdocs1, setFlagdocs1] = useState(0);
  const [banderatipo, setBanderaTipo] = useState(0);

  //Verificar docuemntacion del usuario

  const URIDOCS = `https://inmobicapital.com:9589/test/usuario/${id_User}/documentos`;
  const token = tokenAuth;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
    },
  };

  axios
    .get(URIDOCS, config)
    .then((response) => {
      // Handle the response data
      const datadocs = response.data.Documentos;
      const resp = response.data;
      console.log(datadocs.length + "DOCS LENGHT ");

      if (datadocs.length == 0) {
        console.log("FLAG1");
        setTitleDoc("INE FRENTE"), setTipoDoc(1);
      }
      if (datadocs.length == 1) {
        console.log("BAndera2");
        setTitleDoc("INE REVERSO"), setTipoDoc(8);
      }
      if (datadocs.length == 2) {
        console.log("BAndera3");
        setTitleDoc("COMPROBANTE DE DOMICILIO"), setTipoDoc(3);
      }
      if (datadocs.length == 3) {
        console.log("BAndera4");
        setTitleDoc("CARÁTULA DE ESTADO DE CUENTA"), setFlagdocs1(1);
      }
      if (datadocs.length == 4) {
        console.log("LOS DOCUMENTOS OBLIGATORIOS YA ESTA CARGADOS")


      }

      //console.log(docarriba3)
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Se requiere permiso para acceder a la galería de imágenes.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const base64Image = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });

      setImageData(base64Image);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Se requiere permiso para acceder a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      const base64Image = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });

      setImageData(base64Image);
    }
  };

  const handleSubmit = async () => {
    const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/documentos`;

    data = {
      tipoDocumento: tipodoc,
      encodedImage: imageData,
    };
    const jsonData = JSON.stringify(data);

    await axios.post(URI, jsonData, config).then((response) => {
      console.log(response);

      alert("Archivo enviado exitosamente");
      setImageData("");
    });
  };

  const [pdfData, setPdfData] = useState("");

  const handlePress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        const { uri } = result;
        const base64Data = await convertToBase64(uri);

        setPdfData(base64Data);

        sendPDF(base64Data);
      }
    } catch (error) {
      console.log("Error selecting PDF:", error);
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const convertToBase64 = async (uri) => {
    const file = await fetch(uri);
    const fileData = await file.blob();
    const base64 = await convertBlobToBase64(fileData);
    return base64;
  };

  const sendPDF = (base64Data) => {
    const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/documentos`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
      },
    };
    data = {
      tipoDocumento: 7,
      encodedImage: base64Data,
    };
    const jsonData = JSON.stringify(data);
    axios.post(URI, jsonData, config).then((response) => {
      navigation.navigate(NavigationStrings.FORM5);
    });

    alert("Datos guardados");
  };

  return (
    <LinearGradient
      colors={["#fff", "#ffff", "#ffff"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <View style={styles.container}>
          {flagdocs1 == 1 ? (
            <View>
              <Text style={styles.txtdocstitle1}>{titleDoc}</Text>
              <Pressable onPress={handlePress} style={styles.botininvestpro}>
                <Text style={styles.txtpdf}>SELECCIONAR PDF</Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.txtdocstitle1}>{titleDoc}</Text>

              {imageData ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${imageData}` }}
                  style={{ width: 200, height: 200 }}
                />
              ) : null}

              <Pressable style={styles.btnupload1} onPress={pickImage}>
                <Text style={styles.txtbtnupcar}>SUBIR DESDE LA GALERIA </Text>
                <Image source={imagePath.addcamara} style={styles.iconscarga} />
              </Pressable>


              <Pressable style={styles.btnupload1} onPress={takePhoto}>
                <Text style={styles.txtbtnupcar}>
                  TOMAR FOTO
   
                  </Text>
                  <Image source={imagePath.camara} style={styles.iconscarga} />
              </Pressable>

              <Pressable
                style={styles.btnuploadsend}
                onPress={handleSubmit}
                disabled={imageData == ""}
              >
                <Text style={styles.txtsendcarga}>ENVIAR ARCHIVOS</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default Form4;
