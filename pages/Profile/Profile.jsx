import React, { useState, useEffect } from "react";
import { Text, View ,Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Profile.style";

export default function Profile(props) {
  const [userData, setUserData] = useState({});
  const [apartments,setApartments] = useState({})
  const retrieveData = async () => {
    try {
      const value = await (AsyncStorage.getItem("loginDet"));
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setUserData(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const retrieveDeliveryAdd = async () => {
    try {
      const value = await (AsyncStorage.getItem("deliveryAddress"));
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setApartments(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };


  useEffect(() => {
    retrieveData();
    retrieveDeliveryAdd();
  }, [props]);

  const onLogoutFunc = () => {
    AsyncStorage.clear();
    AsyncStorage.setItem("path", "logout")
    AsyncStorage.setItem("referOpen",false)
    props.navigation.navigate("Login")

  };


//   useEffect(() => {
//     console.log(userData, "hjfjfjf");
// }, [userData]);

  return (
    <>
      <View>
        <Text>{userData?.user?.name}</Text>
        <Text>
              {userData && userData?.user?.address && userData?.user?.address.length > 0 && (
                <>
                  {`${apartments?.apartment}, ${apartments?.flatNo}, ${apartments?.tower}`}
                </>
              )}
            </Text>
        <Text>{userData?.user?.mobile}</Text>
        <Text>{userData?.user?.email}</Text>
        <Text>{userData?.user?.walletCredits}{"Available Wallet Balance"}</Text>
        <Text>{userData?.user?.orderCount ? userData?.user?.orderCount : 0 }{"Order"}</Text>
        <Button title="Address"  onPress={()=> props.navigation.navigate("AddressList")}/>
        <Text> </Text>
        <Button title="Logout"  onPress={()=> {onLogoutFunc()}}/>

      </View>
    </>
  );
}
