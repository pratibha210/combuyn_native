import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./Login.style";
import Environment from "../../Environment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login(props) {
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const BASE_URL = Environment.BASE_URL;
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
  }, [props]);


  const onSubmit = (e) => {
    // e.preventDefault();
    axios
      .post(BASE_URL + "auth/otp", {
        mobile: mobile,
        "type": "login"
      })
      .then((res) => {
        if (res) {
          props.navigation.navigate(("OTP"), { state: { mobile: mobile, type: "login" } })
        }
      })
      .catch((err) => {
        setErrorMessage("This Number is not registered! Signup now.")
      });
  };


  return (
    <>


      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          name="mobile"
          placeholder="Enter 10 digit number."
          placeholderTextColor="#003f5c"
          // secureTextEntry={true}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(mobile) => setMobile(mobile)}
        />
      </View>
      <Text> Don't have an account?</Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => props.navigation.navigate("Register")}
      >
        Sign Up
      </Text>

      <Text>{errorMessage && errorMessage}</Text>
      <Button
        title="Login"
        onPress={() => onSubmit()}
      />
    </>
  );
}
