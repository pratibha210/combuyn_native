import React, { useState, useEffect } from "react";
import { Text, View, Button ,  RefreshControl,ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Environment from "../../Environment";
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
export default function AddressList(props) {
  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState("");
  const [flag, setFlag] = React.useState("");

  const [localAppartmentName, setLocalAppartmentName] = useState("");
  const [textMessage, setTextMessage] = React.useState("");
  const [addressId, setAddressId] = React.useState("");
  const [index, setIndex] = React.useState();
  const [appId, setAppId] = React.useState("");
  const [tempAdd, setTempAdd] = React.useState({});
  const [userData, setUserData] = useState({});
  const [cartProduct, setCartProduct] = useState([]);
  const [localappartmentId, setLocalappartmentId] = useState("");
  const BASE_URL = Environment.BASE_URL;
  const [refreshing, setRefreshing] = React.useState(false);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("loginDet");
      if (value !== null) {
        setUserData(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const retrieveDeliveryAdd = async () => {
    try {
      const value = await AsyncStorage.getItem("deliveryAddress");
      if (value !== null) {
        setLocalappartmentId(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const retrieveCartarr = async () => {
    try {
      const value = await AsyncStorage.getItem("cartProduct");
      if (value !== null) {
        setCartProduct(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const retrieveApartmentName = async () => {
    try {
      const value = await AsyncStorage.getItem("appartmentName");
      if (value !== null) {
        setLocalAppartmentName(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    // onRefresh();
    retrieveData();
    retrieveCartarr();
    retrieveApartmentName();
    retrieveDeliveryAdd();
  }, [props]);

  const handleClickOpen = (index, id, appId) => {
    // console.log(index, id, appId,"index, id, appId")
    setAddressId(id);
    setIndex(index);
    setAppId(appId);
    setOpen(true);
  };
  const handleChange = (event, data) => {
    console.log(data, "checked");
    setSelectedValue(data._id);
    AsyncStorage.setItem("deliveryAddress", JSON.stringify(data));
    AsyncStorage.setItem("appartmentName", data.apartment);
    AsyncStorage.setItem("appartmentId", data.apartmentId);
    getcampaignAPIcallFunc(data.apartmentId);
  };

  React.useEffect(() => {
    if (!userData) {
      AsyncStorage.removeItem("loginDet");
      AsyncStorage.setItem("path", "AddressList");
      props.navigation.navigate("Login");
    } else {
      AsyncStorage.removeItem("path");

      setSelectedValue(localappartmentId._id);
    }
  }, []);

  // console.log(selectedValue,"selectedValue")

  /////// get Campaign API by apratment id ////////////////
  const getcampaignAPIcallFunc = (e) => {
    axios
      .get(BASE_URL + "campaigns?apartment=" + e + "&status=Active")
      .then((res) => {
        // console.log(res, "res");
        if (res) {
          res.data = res.data.sort((a, b) => a.order - b.order);
          AsyncStorage.setItem("campaigns", JSON.stringify(res.data));
          let arr = cartProduct;
          let newArr = [];
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
          // console.log(newArr,"newArr")
          AsyncStorage.setItem("cartProduct", JSON.stringify(newArr));
        }
      })
      .catch((err) => {
        // setErrorMessage(err.message);
      });
  };

  const handleClose = (e) => {
    if (flag == "edit") {
      setOpen(false);
      setFlag("");
      props.navigation.navigate("AddAddress", {
        state: {
          flag: "edit",
          addId: addressId,
          index: index,
          temadd: tempAdd,
        },
      });
    } else {
      axios
        .delete(BASE_URL + "users/" + userData?.user?.id + "/address/" + addressId, {
          headers: {
            authorization: `bearer ${userData?.token?.accessToken}`,
          },
        })
        .then((res) => {
          if (res) {
            setOpen(false);

            let add = userData.user.address;
            let delAdd = localappartmentId;
            add.splice(index, 1);
            userData.user.address = add;
            AsyncStorage.setItem("loginDet", JSON.stringify(userData));
            retrieveDeliveryAdd();
            if (userData.user.address.length > 0) {
              AsyncStorage.setItem(
                "appartmentName",
                userData.user.address[0].apartment
              );
              AsyncStorage.setItem(
                "appartmentId",
                userData.user.address[0].apartmentId
              );
              // dispatch(setUserInfo(userData.user));

              if (appId == delAdd.apartmentId) {
                AsyncStorage.setItem(
                  "deliveryAddress",
                  JSON.stringify(userData.user.address[0])
                );
                getcampaignAPIcallFunc(res.data.user.address[0].apartmentId);
              }
            } else {
              AsyncStorage.removeItem("appartmentName");
              AsyncStorage.removeItem("appartmentId");
              AsyncStorage.removeItem("deliveryAddress");
              // dispatch(setUserInfo(loginData.user));

              props.navigation.navigate("Apartment");
            }

            setAddressId("");
          }
        })
        .catch((err) => {
          setOpen(false);
          if(err.code == 401)
          props.navigation.navigate("Login");
          // setErrorMessage("This Number is not registered! Signup now.");
        });
    }
  };

  // console.log(userInfo, "userInfo");
  const handleCloseDialog = () => {
    setOpen(false);
    setFlag("");
  };


  // "edit", item._id, index, item.apartmentId
  const gotToEdit = (flag, id, idx, temadd) => {
    // console.log(flag, id, idx,temadd,"flag, id, idx,temadd");
    setFlag(flag);
    setAddressId(id);
    setIndex(idx);
    setTempAdd(temadd);
    if (cartProduct && cartProduct.length) {
      setOpen(true);
      setTextMessage(
        " Any current orders to be delivered will be delivered at the previous address"
      );
    } else {
      setOpen(false);
      setFlag("");
      props.navigation.navigate("Address", {
        state: { flag: flag, addId: id, index: idx, temadd: temadd },
      });
    }
  };

  return (
    <>
      <View>
        <Text> AddressList</Text>
        <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <Text>Pull down to see RefreshControl indicator</Text> */}
        {userData?.user?.address?.length > 0 &&
          userData?.user.address.map((x, index) => {
            return (
              <View onClick={() => handleChange(x)}>
                <Text> Home</Text>
                <Text> {userData?.user.name}</Text>
                <Text> {userData?.user.mobile}</Text>
                <Text> {x?.apartment}</Text>
                <Text> {x?.tower} ,</Text>
                <Text> {x?.flatNo}</Text>
                <Button
                  title="Edit"
                  onPress={() => props.navigation.navigate("Address")}
                />
                <Text> </Text>
                <Button
                  title="Delete"
                //   onPress={() => {
                //     this.setState({ visible: true });
                //   }}
                    onPress={() =>
                        handleClickOpen(index, x._id, x.apartmentId)
                      }
                  //   onPress={() => props.navigation.navigate("Address")}
                />
              </View>
            );
          })}
          <Text></Text>
        <Button
          title="Add Address"
          onPress={() => props.navigation.navigate("Address")}
        />
      </ScrollView>


<Dialog
    visible={open}
    footer={
      <DialogFooter>
        <DialogButton
          text="CANCEL"
          onPress={() => handleCloseDialog()}
        />
        <DialogButton
          text="OK"
          onPress={() => handleClose()}
        />
      </DialogFooter>
    }
  >
    <DialogContent>
     <Text>  {"are you sure !! you want to delete this address"}</Text>
    </DialogContent>
  </Dialog>
      </View>
    </>
  );
}
