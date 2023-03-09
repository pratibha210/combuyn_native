import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./Otp.style";
// import OtpInputs from "react-native-otp-inputs";
import Environment from "../../Environment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageRoutes from "../../routes";
import moment from 'moment'
export default function Otp(props) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [otp, setOtp] = useState("");
  const [appartmentId, setApartmentId] = useState('')
  const BASE_URL = Environment.BASE_URL;
  const [cartProduct, setCartProduct] = useState([])

  // console.log(props,"props");

  const retrieveCartarr = async () => {
    try {
      const value = await (AsyncStorage.getItem("cartProduct"));
      if (value !== null) {
        setCartProduct(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginDet');
      if (value !== null) {
        // We have data!!
        console.log(value);
        props.navigation.navigate("Home")
      }
    } catch (error) {
      // Error retrieving data
    }
  };


  useEffect(() => {
    retrieveData();
    retrieveCartarr()
  }, [props]);
  // console.log(location.state, userDetails);
  const getcampaignAPIcallFunc = (e) => {
    axios
      .get(
        BASE_URL +
        "campaigns?apartment=" +
        e + "&status=Active"
      )
      .then((res) => {
        // console.log(res, "res");
        if (res) {
          res.data = res.data.sort((a, b) => a.order - b.order);
          AsyncStorage.setItem("campaigns", JSON.stringify(res.data));
          let arr = cartProduct;
          let newArr = []
          arr && arr.length > 0 && arr.map((item) => {
            return (
              item.campaigns && item.campaigns.length > 0 && item.campaigns.map((camp) => {
                return (
                  res.data && res.data.length > 0 && res.data.map((resp) => {
                    return (
                      camp.campaignId == resp.id && newArr.push(item)

                    )
                  })
                )
              })
            )
          })
          // console.log(newArr,"newArr")
          AsyncStorage.setItem("cartProduct", JSON.stringify(newArr))
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };



  const onSubmit = (e) => {
    // e.preventDefault();
    if (props?.route?.params?.state?.type == "signup") {
      let body = { ...props?.route?.params?.state?.data, otp }
      axios
        .post(BASE_URL + "auth/register",
          body

        )
        .then((res) => {
          // dispatch(setUserInfo(res.data.user));
          // dispatch(setToken(res.data.token));
          AsyncStorage.setItem("referOpen", true)
          AsyncStorage.setItem("referDate", moment(Date.now()).format())
          AsyncStorage.setItem("loginDet", JSON.stringify(res.data));
          props.navigation.navigate("Apartment");
        })
        .catch((err) => {
          console.log(err, "err")
          setErrorMessage(err.response?.data?.message);
        });
    } else if (props?.route?.params?.state?.type == "login") {
      axios
        .post(BASE_URL + "auth/login", {
          mobile: props?.route?.params?.state.mobile,
          otp,
        })
        .then((res) => {

          console.log(res, "res")

          // dispatch(setUserInfo(res.data.user));
          // dispatch(setToken(res.data.token));

          AsyncStorage.setItem("loginDet", JSON.stringify(res.data));
          AsyncStorage.setItem("referOpen", true)
          AsyncStorage.setItem("referDate", moment(Date.now()).format())

          if (res.data.user.address.length > 0) {
            getcampaignAPIcallFunc(res.data.user.address[0].apartmentId)
            AsyncStorage.setItem("appartmentName", res.data.user.address[0].apartment)
            AsyncStorage.setItem("appartmentId", res.data.user.address[0].apartmentId)
            AsyncStorage.setItem("deliveryAddress", JSON.stringify(res.data.user.address[0]));

            props.navigation.navigate("Apartment")

          }
          //   if(path=="payment-method"){
          //     props.navigation.navigate(PageRoutes.PAYMENT);
          //   }else  if(path=="order"){
          //     props.navigation.navigate(PageRoutes.ORDER_LIST);
          //   }else if(path=="thankyou"){
          //     props.navigation.navigate("/thankyou");
          //   }else if(path=="referral"){
          //     props.navigation.navigate("/profile",{state: "referral"});
          //   }else if(path=="profile"){
          //     props.navigation.navigate("/profile");
          //   }
          //   else if(path =="deliveryaddress"){
          //     props.navigation.navigate("/deliveryaddress");
          //   } 

          //   else if (res.data.user.address.length > 0) {
          //     getcampaignAPIcallFunc(res.data.user.address[0].apartmentId)
          //     AsyncStorage.setItem("appartmentName",res.data.user.address[0].apartment)
          //     AsyncStorage.setItem("appartmentId", res.data.user.address[0].apartmentId)
          //     AsyncStorage.setItem("deliveryAddress" ,JSON.stringify(res.data.user.address[0]));
          //     props.navigation.navigate("/home")
          // }
          // else if(AsyncStorage.getItem("appartmentId")){
          //   if(AsyncStorage.getItem("path") == "profile"){
          //     props.navigation.navigate("/profile",{state: "home"});
          //   }else{
          //     props.navigation.navigate("/"+path);

          //   }
          //   }
          else {
            props.navigation.navigate("Apartment");
          }
        })
        .catch((err) => {
          console.log(err, " otp")
          setErrorMessage("Invalid OTP");
        });
    } else {
      setErrorMessage("Please type your otp to continue");
    }
  };

  return (
    <>
      {/* <View style={styles.container}>
        <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={6}
        />
      </View> */}
      <View>
        {/* <Text>Verification Code</Text>
                    <p>We have sent the verification code to <br></br>your Mobile number and Email Id</p> 
                    <Text>{props?.route?.params?.state?.mobile}</Text> */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            name="otp"
            placeholder="Enter otp."
            placeholderTextColor="#003f5c"
            // secureTextEntry={true}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={(otp) => setOtp(otp)}
          />
        </View>

        <Text>{errorMessage && errorMessage}</Text>
        <Button title="Login" onPress={() => onSubmit()} />
      </View>
    </>
  );
}
