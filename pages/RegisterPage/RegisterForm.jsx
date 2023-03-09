import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./RegisterForm.style";
import Environment from "../../Environment";
import axios from "axios";
export default function RegisterForm(props) {
  const [registerData, setRegisterData] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");
  const BASE_URL = Environment.BASE_URL;

  const onSubmit = (e) => {
    // e.preventDefault();
    let body = {
      mobile: registerData.mobile,
      type: "signup",
    };
    axios
      .post(BASE_URL + "auth/otp", body)
      .then((res) => {
        // console.log(res,"res")
        if (res.data) {
          props.navigation.navigate(("OTP"), {
            state: { data: registerData, type: res.data.type },
          });
        }
      })
      .catch((err) => {
        // console.log(err,"err")
        setErrorMessage(err?.response?.data?.message);
      });
  };

  console.log(registerData, "registerData");

  return (
    <>
      <View style={styles.inputView}>
        <TextInput
          onChangeText={(name) => {
            setRegisterData({
              ...registerData,
              'name': name,
            });
          }}
          name="name"
          style={styles.input}
          //   label="Your name"
          placeholder="Enter your name."
          placeholderTextColor="#003f5c"
          //   onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         onChangeText={(name) => {
            setRegisterData({
              ...registerData,
              'email': name,
            });
          }}
          name="email"
          style={styles.input}
          //   label="Email"
          placeholder="Enter your email id."
          placeholderTextColor="#003f5c"
        //   secureTextEntry={true}
          //   onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         onChangeText={(name) => {
            setRegisterData({
              ...registerData,
              'mobile': name,
            });
          }}
          name="mobile"
          maxLength={10}
          style={styles.input}
          keyboardType="numeric"
          //   label="Phone number"
          placeholder="Enter 10 digit number"
          placeholderTextColor="#003f5c"
          //   onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         onChangeText={(name) => {
            setRegisterData({
              ...registerData,
              'referralCode': name,
            });
          }}
          name="referralCode"
          style={styles.input}
          placeholder="Enter referral code."
          placeholderTextColor="#003f5c"
        //   secureTextEntry={true}
          //   onChangeText={(password) => setPassword(password)}
        />
      </View>
      {errorMessage && <p severity="error">{errorMessage}</p>}

      <Button title="Signup" onPress={() => onSubmit()} />

      <Text> Have an account?</Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => props.navigation.navigate("Login")}
      >
        Login
      </Text>
    </>
  );
}
