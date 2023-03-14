import React,{useState, useEffect} from 'react'
import {
    Text,
    View,
  } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import Environment from "../../Environment";
  import axios from "axios";

export default function Order(props) {

  const BASE_URL = Environment.BASE_URL;
  const [userData, setUserData] = useState({});

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("loginDet");
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setUserData(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData();
  }, [props]);

  useEffect(() => {
    AsyncStorage.removeItem("path");
   
    axios
      .get(BASE_URL + "orders", {
        headers: {
          authorization: `bearer ${userData?.token?.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data,"ressss")
        // setIsLoading(false);
        let campaigns = [];
        res.data?.map((ele1) => {
          ele1.status !== "PendingPayment" &&
            ele1.status !== "PaymentFailed" &&
            ele1.status !== "PaymentCancelled" &&
            ele1.campaigns?.map((ele2) => {
              ele2.address = ele1?.address;
              ele2.orderId = ele1?.id;
              ele2.customer = ele1?.customer;
              ele2.createdAt = ele1?.createdAt;
              campaigns.push(ele2);
            });
        });

        AsyncStorage.setItem("orderList", JSON.stringify(campaigns));

        // setIsLoading(false);
        setOrderList(campaigns);
      })
      .catch((err) => {
        // if (err.response.status === 401) {
        //   AsyncStorage.removeItem("loginDet");
        //   AsyncStorage.setItem("path", "order");
        //  props.navigation.navigate("Login")
        // } else {
        //   setIsLoading(false);
        //   setErrorMessage(err.message);
        // }
      });
    // }
  }, [userData]);



  return (
    <View>
    <Text>
    Order
    </Text>
    
    </View>
  )
}
