import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavigationStrings from "../../Navigation/NavigationStrings";
import styles from "../../Styles";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Form5 = ({ navigation }) => {
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

  console.log(id_User + "F5");

  const soypp = ["SI", "NO"];
  const [ppe, setPpe] = useState(false);

  //BANDERAS BOLEANAS
  const [boolPEP, setBoolsPEP] = useState(0);
  const [boolPEP_familiar, setBoolsPEP_familiar] = useState(0);
  const [boolProvedor, setBoolProvedor] = useState(0);

  const tipopterceros = ["FISICA", "MORAL"];
  const sifam = ["SI", "NO"];
  const sitercero = ["SI", "NO"];
  const gengres = ["H", "M"];

  //PPE
  const [nombrecargo, setNombreCargo] = useState("");
  const [dependencia, setDependencia] = useState("");

  //FAMILAIR
  const [parentesco, setParentesco] = useState("");
  const [nombrefuncionario, setNombrefuncionario] = useState("");
  const [apfuncionario, setApfuncionario] = useState("");
  const [amfuncionario, setAmfuncionario] = useState("");
  const [cargofuncionario, setNCargoFuncionario] = useState("");
  const [dependenciafunc, setDependenciaFunc] = useState("");

  //TERCEROS
  const [rsocial, setRsocial] = useState("");
  const [tipopter, setTipopter] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [nombretercero, setNombretercero] = useState("");
  const [aptercero, setAptercero] = useState("");
  const [amtercero, setAmtercero] = useState("");
  const [rfctercero, setRfctercero] = useState("");
  const [curptercero, setCurptercero] = useState("");
  const [celulartercero, setCelulartercero] = useState("");
  const [genero, setGenero] = useState("");
  const [edoNac, setEdonac] = useState("");
  const [actividad, setActividad] = useState("");
  const [fiel, setFiel] = useState("");
  const [calle, setCalle] = useState("");
  const [num_ext, setNum_ext] = useState("");
  const [num_int, setNum_int] = useState("");
  const [colonia, setColonia] = useState("");
  const [del_mun, setDel_num] = useState("");
  const [estado, setEstado] = useState("");
  const [cp, setCp] = useState("");
  const [pais, setPais] = useState("");
  const [email, setEmail] = useState("");
  const [puesto_rep, setPuesto_rep] = useState("");
  const [nombresReplegal, setNombresrepLegal] = useState("");
  const [apPatrep, setApPatrep] = useState("");
  const [apMatrep, setApMatrep] = useState("");

  //DATEPICKER
  const dias = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const meses = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const years = [
    "1940",
    "1941",
    "1942",
    "1943",
    "1944",
    "1945",
    "1946",
    "1947",
    "1948",
    "1949",
    "1950",
    "1950",
    "1951",
    "1952",
    "1953",
    "1954",
    "1955",
    "1956",
    "1957",
    "1958",
    "1959",
    "1960",
    "1960",
    "1961",
    "1962",
    "1963",
    "1964",
    "1965",
    "1966",
    "1967",
    "1968",
    "1969",
    "1970",
    "1970",
    "1971",
    "1972",
    "1973",
    "1974",
    "1975",
    "1976",
    "1977",
    "1978",
    "1979",
    "1980",
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  const [day, setDay] = useState("");
  const [mount, setMount] = useState("");
  const [year, setYear] = useState("");

  const [dayf, setDayf] = useState("");
  const [mountf, setMountf] = useState("");
  const [yearf, setYearf] = useState("");

  const [dayter, setDayter] = useState("");
  const [mountter, setMountter] = useState("");
  const [yearter, setYearter] = useState("");

  const fechanact = yearter + "-" + mountter + "-" + dayter;
  const fechaNac = new Date(fechanact);

  const fechai = year + "-" + mount + "-" + day;
  const fechaseparacion = new Date(fechai);
  const fechaif = yearf + "-" + mountf + "-" + dayf;
  const fechaseparacionf = new Date(fechaif);

  //END OF DATE PICKER//

  const [flagfamilia, setFlagfamilia] = useState("");
  const [flagTerceros, setFlagterceros] = useState(false);
  const [flagRfc, setFlagrfcT] = useState(false);
  const [flagcurpT, setFlagCurpT] = useState(false);
  const [data, setData] = useState({});

  //NACIONALIDADES

  const nacionalidades = [
    "Afgana",
    "Albanesa",
    "Alemana",
    "Andorrana",
    "Angoleña",
    "Antiguana",
    "Argentina",
    "Armenia",
    "Arubeña",
    "Australiana",
    "Austríaca",
    "Azerbaiyana",
    "Bahameña",
    "Bahreiní",
    "Bangladesí",
    "Barbadense",
    "Belga",
    "Beliceña",
    "Beninés",
    "Bermudeña",
    "Bielorrusa",
    "Birmana",
    "Boliviana",
    "Bosnia",
    "Botsuana",
    "Brasileña",
    "Británica",
    "Brunéi",
    "Búlgara",
    "Burkinesa",
    "Burundesa",
    "Butanesa",
    "Cabe Verdiana",
    "Camboyana",
    "Camerunesa",
    "Canadiense",
    "Chadiana",
    "Checa",
    "Chilena",
    "China",
    "Chipriota",
    "Vaticanense",
    "Colombiana",
    "Comorense",
    "Congoleña",
    "Congoleña",
    "Coreana del Norte",
    "Coreana del Sur",
    "Costarricense",
    "Croata",
    "Cubana",
    "Danesa",
    "Dominiquesa",
    "Ecuatoguineana",
    "Ecuatoriana",
    "Eritrea",
    "Escocesa",
    "Eslovaca",
    "Eslovena",
    "Española",
    "Estadounidense",
    "Estonia",
    "Etíope",
    "Filipina",
    "Finlandesa",
    "Fiyiana",
    "Francesa",
    "Gabonesa",
    "Gambiana",
    "Georgiana",
    "Ghanesa",
    "Granadina",
    "Griega",
    "Guatemalteca",
    "Guineana",
    "Guineana Ecuatoriana",
    "Guineana",
    "Guyanesa",
    "Haitiana",
    "Hondureña",
    "Húngara",
    "India",
    "Indonesa",
    "Iraquí",
    "Iraní",
    "Irlandesa",
    "Islandesa",
    "Israelí",
    "Italiana",
    "Jamaicana",
    "Japonesa",
    "Jordana",
    "Kazaja",
    "Keniana",
    "Kirguisa",
    "Kiribatiana",
    "Kuwaití",
    "Laosiana",
    "Lesotensa",
    "Letona",
    "Libanesa",
    "Liberiana",
    "Libia",
    "Liechtensteiniana",
    "Lituana",
    "Luxemburguesa",
    "Macedonia",
    "Malaca",
    "Malauí",
    "Maldiva",
    "Malena",
    "Malí",
    "Maltesa",
    "Marfileña",
    "Marroquí",
    "Marshallense",
    "Mauriciana",
    "Mauritana",
    "Mexicana",
    "Micronesia",
    "Moldava",
    "Monegasca",
    "Mongola",
    "Montenegrina",
    "Mozambiqueña",
    "Namibia",
    "Naurana",
    "Nepalesa",
    "Nicaragüense",
    "Nigerina",
    "Nigeriana",
    "Norcoreana",
    "Noruega",
    "Neozelandesa",
    "Omaní",
    "Neerlandesa",
    "Pakistaní",
    "Palaos",
    "Panameña",
    "Papúa Nueva Guineana",
    "Paraguaya",
    "Peruana",
    "Polaca",
    "Portuguesa",
    "Británica",
    "Qatarí",
    "Ruandesa",
    "Rumana",
    "Rusa",
    "Salomonense",
    "Salvadoreña",
    "Samoa",
    "Sanmarinense",
    "Santalucense",
    "Santotomense",
    "Sanvicentense",
    "Senegalesa",
    "Serbia",
    "Seychellense",
    "Sierraleonesa",
    "Singapurense",
    "Siria",
    "Somalí",
    "Srilanquesa",
    "Suazilandesa",
    "Sudafricana",
    "Sudanesa",
    "Sudanesa",
    "Sueca",
    "Suiza",
    "Surinamesa",
    "Tailandesa",
    "Taiwanesa",
    "Tanzana",
    "Tayika",
    "Timorense",
    "Togolesa",
    "Tongana",
    "Trinitense",
    "Tunecina",
    "Turca",
    "Turcomana",
    "Tuvaluana",
    "Ucraniana",
    "Ugandesa",
    "Uruguaya",
    "Uzbeka",
    "Vanuatense",
    "Venezolana",
    "Vietnamita",
    "Yemení",
    "Yibutiana",
    "Zambiana",
    "Zimbabuense",
  ];
  //END NACIONALIDADES

  //ESTADOS

  const estados = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Coahuila",
    "Colima",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  //END ESTADOS

  const validaCurpT = (curptercero) => {
    if (curptercero.length == 18) {
      console.log("CURP CORRECTO");
      setFlagCurpT(true);
    } else if (curptercero.length > 18) {
      alert("CURP INVALIDO");
      setFlagCurpT(false);
    } else if (curptercero.length < 18) {
      alert("CURP INVALIDO");
      setFlagCurpT(false);
    }
  };

  const validaRFCTercero = (rfctercero) => {
    if (rfctercero.length == 10 || rfctercero.length == 13) {
      console.log("RFC CORRECTO");
      setFlagrfcT(true);
    } else if (rfctercero.length < 10) {
      alert("RFC no debe ser menor a 10 caracteres");
      setFlagrfcT(false);
    } else if (rfctercero.length > 14) {
      alert("RFC exede 13 caracteres");
      setFlagrfcT(false);
    }
  };
  const validaNacionalT = (curptercero) => {
    const curpvalt = curptercero[11] + curptercero[12];
    const Nacidoextt = "NE";

    if (curpvalt == Nacidoextt) {
      alert("ERROR: Este CURP no corresponde a cuidadanos nacionales");
    }
  };

  const handleForm = () => {
    //validaClabe(clabe)
    //validaCurpT(curptercero)
    //validaRFCTercero(rfctercero)

    if (ppe == true) {
      setBoolsPEP(1);
    } else {
      setBoolsPEP(0);
    }

    if (flagfamilia == true) {
      setBoolsPEP_familiar(1);
    } else {
      setBoolsPEP_familiar(0);
    }

    if (flagTerceros == true) {
      setBoolProvedor(1);
    } else {
      setBoolProvedor(0);
    }

    const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/pep`;
    const config = {
      headers: {
        Authorization: `Bearer ${tokenAuth}`, // Agrega el encabezado de autorización con el token Bearer
      },
    };

    if (boolPEP == 0 && boolPEP_familiar == 0 && boolProvedor == 0) {
      const datos = {
        boolPEP: boolPEP,
        boolPEP_familiar: boolPEP_familiar,
        boolProvedor: boolProvedor,
      };
      setData(datos);
    } else if (boolPEP == 1 && boolPEP == 1 && boolPEP == 1) {
      const datos = {
        boolPEP: boolPEP,
        pep: {
          nomCargo: nombrecargo,
          dependencia: dependencia,
          fechaSep: fechaseparacion,
        },
        //FAM PPE FAM
        boolPEP_familiar,
        pepFamiliar: {
          parentesco: parentesco,
          apPat: apfuncionario,
          apMat: amfuncionario,
          nombres: nombrefuncionario,
          nomCargo: cargofuncionario,
          dependencia: dependenciafunc,
          fechaSep: fechaseparacionf,
        },
        //TERCERO

        boolProvedor,
        prr: {
          tipoPersona: tipopter,
          rs: rsocial,
          nacionalidad: nacionalidad,
          apPat: aptercero,
          apMat: amtercero,
          nombre: nombretercero,
          fechaNac: fechaNac,
          rfc: rfctercero,
          curp: curptercero,
          telMovil: celulartercero,
          genero: genero,
          edoNac: edoNac,
          actividad: actividad,
          fiel: fiel,
          calle: calle,
          num_ext: num_ext,
          num_int: num_int,
          colonia: colonia,
          del_mun: del_mun,
          estado: estado,
          cp: cp,
          pais: pais,
          email: email,
          puesto_repLegal: puesto_rep,
          nombres_repLegal: nombresReplegal,
          apPat_repLegal: apPatrep,
          apMat_repLegal: apMatrep,
        },
      };
      setData(datos);
    }

    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    axios
      .post(URI, jsonData, config)
      .then((response) => {
        console.log(response.data);
        console.log(jsonData);
        alert("Datos guardados");

        navigation.navigate(NavigationStrings.PROFILE);
      })
      .catch((error) => {
        alert("Error");
      });
  };

  return (
    <LinearGradient
      colors={["#fff", "#ffff", "#ffff"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text></Text>
          <Text style={styles.welcomeprofiletxtf3}>
            Soy persona pol&iacute;ticamente expuesta?
          </Text>
          <Text></Text>

          <SelectDropdown
            dropdownStyle={styles.dropdown1DropdownStyle}
            buttonStyle={styles.dropdown1BtnStyle}
            defaultButtonText={"SELECCIONE"}
            data={soypp}
            onSelect={(selectedItem) => {
              if (selectedItem == "SI") {
                setPpe(true);
              } else {
                setPpe(false);
              }
            }}
            buttonTextAfterSelection={(selectedItem) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />

          {ppe ? (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="NOMBRE DEL CARGO P&Uacute;BLICO"
                value={nombrecargo}
                name="nombrecargo"
                onChangeText={(text) => setNombreCargo(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="DEPENDENCIA"
                value={dependencia}
                name="dependencia"
                onChangeText={(text) => setDependencia(text)}
              />

              <Text style={styles.txtfn}>Fecha de separaci&oacute;n</Text>

              <View style={styles.datefechasep}>
                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDate}
                  buttonStyle={styles.dropdown1BtnStyleDate}
                  data={dias}
                  defaultButtonText={"D"}
                  onSelect={(selectedItem) => {
                    console.log(day);
                    setDay(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />

                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDate}
                  buttonStyle={styles.dropdown1BtnStyleDate}
                  data={meses}
                  defaultButtonText={"M"}
                  onSelect={(selectedItem) => {
                    console.log(selectedItem + "Mes");
                    setMount(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />

                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDateA}
                  buttonStyle={styles.dropdown1BtnStyleDateA}
                  data={years}
                  defaultButtonText={"A"}
                  onSelect={(selectedItem) => {
                    console.log(selectedItem);
                    setYear(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </View>
            </View>
          ) : (
            <Text></Text>
          )}
          {/* END OF PPE */}

          <Text style={styles.txtfn}>
            Tiene algun tipo de parentesco con alguna persona que desempeñe
            &oacute; haya desempeñado algun cargo p&uacute;blico destacado ?
          </Text>

          <SelectDropdown
        dropdownStyle={styles.dropdown1DropdownStyle}
        buttonStyle={styles.dropdown1BtnStyle}
            data={sifam}
            defaultButtonText={"SELECCIONE"}
            onSelect={(selectedItem) => {
              if (selectedItem == "SI") {
                setFlagfamilia(true);
              } else if (selectedItem == "") {
                selectedItem == "NO";
              } else {
                setFlagfamilia(false);
              }
            }}
            buttonTextAfterSelection={(selectedItem) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />

          {flagfamilia ? (
            <View style={styles.container}>
              <Text style={styles.txtfn}>Datos del funcionario:</Text>

              <TextInput
                style={styles.input}
                placeholder="PARENTESCO"
                value={parentesco}
                name="parentesco"
                onChangeText={(text) => setParentesco(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="APELLIDO PATERNO"
                value={apfuncionario}
                name="apfuncionario"
                onChangeText={(text) => setApfuncionario(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="APELLIDO MATERNO"
                value={amfuncionario}
                name="amfuncionario"
                onChangeText={(text) => setAmfuncionario(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="NOMBRE"
                value={nombrefuncionario}
                name="nombrefuncionario"
                onChangeText={(text) => setNombrefuncionario(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="NOMBRE DEL CARGO P&Uacute;BLICO"
                value={cargofuncionario}
                name="ncargofuncionario"
                onChangeText={(text) => setNCargoFuncionario(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="DEPENDENCIA"
                value={dependenciafunc}
                name="dependenciafunc"
                onChangeText={(text) => setDependenciaFunc(text)}
              />
              <Text style={styles.txtfn}>Fecha de separaci&oacute;n</Text>

              <View style={styles.datefechasep}>
                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDate}
                  buttonStyle={styles.dropdown1BtnStyleDate}
                  data={dias}
                  defaultButtonText={"D"}
                  onSelect={(selectedItem) => {
                    console.log(day);
                    setDayf(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />

                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDate}
                  buttonStyle={styles.dropdown1BtnStyleDate}
                  data={meses}
                  defaultButtonText={"M"}
                  onSelect={(selectedItem) => {
                    console.log(selectedItem + "Mes");
                    setMountf(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />

                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDateA}
                  buttonStyle={styles.dropdown1BtnStyleDateA}
                  data={years}
                  defaultButtonText={"A"}
                  onSelect={(selectedItem) => {
                    console.log(selectedItem);
                    setYearf(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </View>
            </View>
          ) : (
            <Text></Text>
          )}
          {/*END OF FLAG FAMILIA  */}

          <Text style={styles.txtfn}>Actua a nombre de un tercero?</Text>
          <SelectDropdown
        dropdownStyle={styles.dropdown1DropdownStyle}
        buttonStyle={styles.dropdown1BtnStyle}
            data={sitercero}
            defaultButtonText={"SELECCIONE"}
            onSelect={(selectedItem) => {
              if (selectedItem == "SI") {
                setFlagterceros(true);
              } else if (selectedItem == "") {
                selectedItem == "NO";
              } else {
                setFlagterceros(false);
              }
            }}
            buttonTextAfterSelection={(selectedItem) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />

          {flagTerceros ? (
            <View>
              <SelectDropdown
                dropdownStyle={styles.dropdown1DropdownStyle}
                buttonStyle={styles.dropdown1BtnStyle}
                data={tipopterceros}
                defaultButtonText={"TIPO DE PERSONA"}
                onSelect={(selectedItem) => {
                  //console.log(selectedItem);
                  setTipopter(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="RAZ&Oacute;N SOCIAL"
                value={rsocial}
                name="rsocial"
                onChangeText={(text) => setRsocial(text)}
              />

              <SelectDropdown
                dropdownStyle={styles.dropdown1DropdownStyle}
                buttonStyle={styles.dropdown1BtnStyle}
                data={nacionalidades}
                defaultButtonText={"Nacionalidad"}
                onSelect={(selectedItem) => {
                  //console.log(selectedItem);
                  setNacionalidad(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="APELLIDO PATERNO"
                value={aptercero}
                name="aptercero"
                onChangeText={(text) => setAptercero(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="APELLIDO MATERNO"
                value={amtercero}
                name="amtercero"
                onChangeText={(text) => setAmtercero(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="NOMBRE"
                value={nombretercero}
                name="nombretercero"
                onChangeText={(text) => setNombretercero(text)}
              />
              <Text style={styles.txtfn}>Fecha de nacimiento</Text>

              <View style={styles.datefechasep}>
                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDate}
                  buttonStyle={styles.dropdown1BtnStyleDate}
                  data={dias}
                  defaultButtonText={"D"}
                  onSelect={(selectedItem) => {
                    console.log(day);
                    setDayter(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />

                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDate}
                  buttonStyle={styles.dropdown1BtnStyleDate}
                  data={meses}
                  defaultButtonText={"M"}
                  onSelect={(selectedItem) => {
                    console.log(selectedItem + "Mes");
                    setMountter(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />

                <SelectDropdown
                  dropdownStyle={styles.dropdown1DropdownStyleDateA}
                  buttonStyle={styles.dropdown1BtnStyleDateA}
                  data={years}
                  defaultButtonText={"A"}
                  onSelect={(selectedItem) => {
                    console.log(selectedItem);
                    setYearter(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="RFC "
                value={rfctercero}
                name="rfctercero"
                onChangeText={(text) => setRfctercero(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="CURP"
                value={curptercero}
                name="curptercero"
                onChangeText={(text) => setCurptercero(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="CELULAR"
                value={celulartercero}
                name="celulartercero"
                onChangeText={(text) => setCelulartercero(text)}
              />
              <SelectDropdown
                dropdownStyle={styles.dropdown1DropdownStyle}
                buttonStyle={styles.dropdown1BtnStyle}
                defaultButtonText={"GENERO"}
                data={gengres}
                onSelect={(selectedItem) => {
                  setGenero(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />

              <SelectDropdown
                dropdownStyle={styles.dropdown1DropdownStyle}
                buttonStyle={styles.dropdown1BtnStyle}
                defaultButtonText={"ESTADO DE NACIMIENTO"}
                data={estados}
                onSelect={(selectedItem) => {
                  setEdonac(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="ACTIVIDAD"
                value={actividad}
                name="actividad"
                onChangeText={(text) => setActividad(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="FIEL"
                value={fiel}
                name="fiel"
                onChangeText={(text) => setFiel(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="calle"
                value={calle}
                name="calle"
                onChangeText={(text) => setCalle(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="N&Uacute;MERO EXTERIOR"
                value={num_ext}
                name="num_ext"
                onChangeText={(text) => setNum_ext(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="N&Uacute;MERO EXTERIOR"
                value={num_int}
                name="num_int"
                onChangeText={(text) => setNum_int(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="colonia"
                value={colonia}
                name="colonia"
                onChangeText={(text) => setColonia(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="DELEGACI&Oacute;N &Oacute; MUNICIPIO"
                value={del_mun}
                name="del_mun"
                onChangeText={(text) => setDel_num(text)}
              />

              <SelectDropdown
                dropdownStyle={styles.dropdown1DropdownStyle}
                buttonStyle={styles.dropdown1BtnStyle}
                defaultButtonText={"ESTADO"}
                data={estados}
                onSelect={(selectedItem) => {
                  setEstado(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="C&Oacute;DIGO POSTAL"
                value={cp}
                name="cp"
                onChangeText={(text) => setCp(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="PAIS"
                value={pais}
                name="pais"
                onChangeText={(text) => setPais(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="EMAIL"
                value={email}
                name="email"
                onChangeText={(text) => setEmail(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="PUESTO DE REPRESENTANTE LEGAL "
                value={puesto_rep}
                name="puesto_rep"
                onChangeText={(text) => setPuesto_rep(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="NOMBRE DE REPRESENTANTE LEGAL"
                value={nombresReplegal}
                name="nombresReplegal"
                onChangeText={(text) => setNombresrepLegal(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="APELLIDO PATERNO"
                value={apPatrep}
                name="apPatrep"
                onChangeText={(text) => setApPatrep(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="APELLIDO MATERNO "
                value={apMatrep}
                name="apMatrep"
                onChangeText={(text) => setApMatrep(text)}
              />
            </View>
          ) : (
            <Text></Text>
          )}

          <Pressable style={styles.btnuploadsend} onPress={handleForm}>
            <Text style={styles.txtpdf}>Guardar datos</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Form5;
