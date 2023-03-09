import { StyleSheet, Text, View, Button, Pressable, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./Apartment.style";
import Environment from "../../Environment";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RadioButton, TextInput, Appbar } from 'react-native-paper';
import { useFonts } from "expo-font";


export default function Apartment(props) {
  // font
  const [loaded] = useFonts({
    'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'PoppinsMedium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'PoppinsSemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  })

  // const [value, setValue] = useState(null);
  const [apartmentList, setApartmentList] = useState([]);
  // const [checked, setChecked] = React.useState('first');
  const [searchInput, setSearchInput] = useState("");

  const BASE_URL = Environment.BASE_URL;
  // console.log(props.navigation,'gfyfff');

  const [errorMessage, setErrorMessage] = React.useState("");
  const [appartmentId, setAppartment] = useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [appartmentName, setAppartmentName] = useState("");
  // const location = useLocation();
  // const appartment = JSON.parse(AsyncStorage.getItem("appartments"));
  const [loginDetails, setLoginDetails] = useState({});
  const [localappartmentId, setLocalappartmentId] = useState('')
  const [localAppartmentName, setlocalAppartmentName] = useState('');
  const [successMessage, setSuccessMessage] = React.useState("");
  const [nvigateLoader, setNvigateLoader] = React.useState(true);
  const [appartmentList, setAppartmentLsit] = useState([]);
  const [localAppId, setLocalAppId] = useState("");
  const [cartProduct, setCartProduct] = useState([]);


  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('appartmentId');
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setLocalappartmentId(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const retrievecartData = async () => {
    try {
      const value = await JSON.parse(AsyncStorage.getItem('cartProduct'));
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setCartProduct(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const retrieveAppData = async () => {
    try {
      const value = await AsyncStorage.getItem('appartmentName');
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setlocalAppartmentName(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };



  const retrieveLogingData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginDet');
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setLoginDetails(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // console.log(localAppId,"localAppId");
  useEffect(() => {
    retrieveData();
    retrievecartData();
    retrieveLogingData();
    retrieveAppData();

  }, [props]);

  // console.log(appartmentId,"appartmentId")
  useEffect(() => {
    AsyncStorage.removeItem("path");
    if (appartmentId && appartmentId.id) {
      AsyncStorage.removeItem("appartmentId");
      setAppartmentName(appartmentId.name);
      setLocalAppId(appartmentId.id);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      setLocalAppId(localappartmentId);
      setAppartmentName(localAppartmentName);
    }
  }, [appartmentId || localappartmentId]);

  //// make restriction condition for redirection ///

  // console.log(loginDetails,"loginDetails");
  React.useEffect(() => {

    if (
      props?.route?.params?.state?.flag !== "fromTopBar" &&
      loginDetails?.token &&
      loginDetails.user?.address?.length > 0
    ) {
      setTimeout(() => {
        setNvigateLoader(false);
      }, 3000);
      props.navigation.replace("Home");
    } else if (props?.route?.params?.state == "success") {
      setTimeout(() => {
        setNvigateLoader(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setNvigateLoader(false);
      }, 3000);
    }
  }, []);



  /**
   * get appart list api call
   */

  useEffect(() => {
    getAppartmentApifunction();
  }, []);

  /**
   * onclick function for select appartment
   */
  const onSelectAppart = (item) => {
    console.log(item);
    setAppartment(item);
    setLocalAppId(item.id)
  };

  /**
   * get Campaign list API call function by appartment id
   */
  const getcampaignAPIcallFunc = () => {
    // e.preventDefault();

    AsyncStorage.setItem("appartmentId", localAppId);
    AsyncStorage.setItem("appartmentName", appartmentName);

    axios
      .get(
        BASE_URL +
        "campaigns?apartment=" +
        localAppId +
        "&status=Active"
      )
      .then((res) => {
        if (res.data) {

          let arr = cartProduct;
          let newArr = [];
          if (arr.length > 0) {
            arr &&
              arr.length > 0 &&
              arr.map((item) => {
                return (
                  item.campaigns &&
                  item.campaigns.length > 0 &&
                  item.campaigns.map((camp) => {
                    return (
                      res.data &&
                      res.data.length > 0 &&
                      res.data.map((resp) => {
                        return camp.campaignId == resp.id && newArr.push(item);
                      })
                    );
                  })
                );
              });
          } else {
            newArr = res.data
          }
          // res.data = res.data.sort((a, b) => a.order - b.order);

          AsyncStorage.setItem("cartProduct", JSON.stringify(newArr));
          AsyncStorage.setItem("campaigns", JSON.stringify(res.data));

          props.navigation.replace('Home');
          setAppartment({});
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };








  // const onItemChange = (item) => {
  //   setValue(item);
  //   setIsFocus(false);
  // }

  // const gotoHome = (e) => {
  //   getcampaignAPIcallFunc()
  //   // storeData(value)
  //   AsyncStorage.setItem('appartmentId', value)
  //   AsyncStorage.setItem("appartmentName", appartmentName);
  //   props.navigation.navigate("Home", value)
  // }



  /**
     * get appart list api function
     */

  const getAppartmentApifunction = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "apartments")
      .then((res) => {
        setIsLoading(false);
        // console.log(res?.data, "res");

        if (res) {
          const arr = res.data.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          setApartmentList(arr);
          // AsyncStorage.setItem("appartments", JSON.stringify(arr));
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.message);
      });
  };

  /**
   * get appart list api call
   */

  React.useEffect(() => {
    getAppartmentApifunction();
  }, [props]);



  /**
   *
   * @param {string} searchValue @appartment search function
   */

  const searchItems = (searchValue) => {
    // console.log(searchValue, "searchValue");
    setIsLoading(false);
    setSearchInput(searchValue);
    if (searchValue.length >= 1) {
      let data =
        apartmentList &&
        apartmentList.length > 0 &&
        apartmentList.filter((item) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });

      // console.log(data, "appartmentList");
      // if (searchValue && searchValue.length >= 3) {
      const arr =data && data.length > 0 && data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setApartmentList(arr);
    } else {
      // setAppartmentLsit([]);
      getAppartmentApifunction();
      setSearchInput("");
    }
  };

  if (!loaded) {
    return null;
  }
  return (
    <>

      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.navigate('Introduction')} />
        <Appbar.Content style={styles.headerText} title="Apartment" titleStyle={[styles.headerTextTtile, poppisFont.medium]} />
      </Appbar.Header>

      <View style={styles.apartmentSearch}>
        <Text style={[styles.apartmentSearchText, poppisFont.regular]}>Select your Apartment</Text>
        <View>
          <TextInput
            onChangeText={(e) => searchItems(e)}
            style={styles.searchInput}
            mode="outlined"
            label="Search Apartment"
            placeholder="Type apartment name..."
            right={<TextInput.Affix text="/100" />}
          />
        </View>
      </View>

      <ScrollView style={styles.appartment_list}>
        {apartmentList && apartmentList?.length > 0 && apartmentList.map((x, index) => {
          return (
            <RadioButton.Group key={x.id} onValueChange={() => onSelectAppart(x)} value={localAppId}>
              <RadioButton.Item style={[styles.radio_list, poppisFont.regular]} label={x.name} value={x.id} />
            </RadioButton.Group>
          )
        })}

      </ScrollView>

      <Appbar style={styles.appartmentBottom}>
        <Text style={[styles.totalApartmentsText, poppisFont.regular]}>17 residents from your apartments are already part of Combuyn community</Text>

        <Pressable
          style={styles.appartmentButton}
          onPress={() => getcampaignAPIcallFunc()}
        >
          <Text style={[styles.appartmentButtonText, poppisFont.medium]}
          >Continue</Text>
        </Pressable>

      </Appbar>


    </>
  );
}

const poppisFont = StyleSheet.create({
  regular: {
    fontFamily: 'PoppinsRegular'
  },
  medium: {
    fontFamily: 'PoppinsMedium'
  },
  semibold: {
    fontFamily: 'PoppinsSemiBold'
  }
});