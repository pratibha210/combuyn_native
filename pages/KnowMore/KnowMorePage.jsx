import React, { useState } from "react";
import {
  Text,
  View,
} from "react-native";



const Knowmore = (props) => {
  return (
    <>
      <View>
        <Text onPress={()=> props.navigation.navigate("Aboutus") }>About us</Text>

        <Text onPress={()=> props.navigation.navigate("PrivacyPolicy") }>Refund and Cancellation Policy</Text>

        <Text onPress={()=> props.navigation.navigate("Termscondition") }>Privacy Policy</Text>
      </View>
    </>
  );
};

export default Knowmore;
