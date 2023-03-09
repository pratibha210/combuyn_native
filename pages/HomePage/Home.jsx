import { ScrollView, StyleSheet, Text, Image, Button, View, FlatList, Pressable, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./Home.style";
import Environment from "../../Environment";
import axios from "axios";
// import CardView from "react-native-cardview";
// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { Card, Title, Paragraph } from "react-native-paper";

import { } from "react-native-web";

export default function Home(props) {
  const width = Dimensions.get('window').width;

  console.log(props, "pros");
  const [campaignList, setCampaignList] = useState([]);
  const [appartmentId, setApartmentId] = useState('')

  const BASE_URL = Environment.BASE_URL;
  const appId = props.route.params;
  const [visible, setVisible] = useState(false);

  // console.log(appIdsss,"appIdsss")

  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);


  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('appartmentId');
      if (value !== null) {
        // We have data!!
        console.log(value);
        setApartmentId(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };


  useEffect(() => {
    retrieveData();
  }, [props]);


  const createMarkup = (data) => {
    // console.log(data,"data")
    const regex = /(<([^>]+)>)/gi;
    return data.replace(regex, "");
  };



  useEffect(() => {
    axios
      .get(BASE_URL + "campaigns?apartment=" + appartmentId + "&status=Active")
      .then((res) => {
        console.log(res, "res");

        if (res) {
          res.data = res.data.sort((a, b) => a.order - b.order);

          setCampaignList(res.data);
        }
      })
      .catch((err) => { });
  }, [appartmentId]);

  return (
    <>
      <View style={styles.homeHeader}>
        <View style={styles.homeHeaderRow}>
          <View style={styles.homeHeaderLeft}>
            <Image
              style={styles.homeHeadLogo}
              source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.apart_name}>Ajmera Infinity</Text>
          </View>

          <View style={styles.headerRightButton}>
            <Pressable
              style={styles.headerBtnStyle}
              onPress={() => props.navigation.navigate("Profile")}>
              <MaterialIcons name="notifications-none" size={28} color="#007cb2" />
            </Pressable>

            <Pressable
              style={styles.headerBtnStyle}
              onPress={() => props.navigation.navigate("Profile")}>
              <Feather name="shopping-bag" size={22} color="#007cb2" />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView style={styles.whiteBg}>
        <View style={styles.campaignsListWrap}>

          {campaignList &&
            campaignList.length > 0 &&
            campaignList.map((x) => {
              return (
                <View key={x.id} style={[styles.campaignsList, styles.shadowProp]}>
                  <Image
                    style={[styles.campaignsListImg, { width: width - 32 }]}
                    source={{ uri: x.images[0].link }}
                  />
                  <View style={styles.campaignsListContent}>
                    <Text style={styles.campaignsListHeading}>{x.name}</Text>
                    <Text style={styles.campaignsListDetails}>{createMarkup(x.description)}</Text>

                    <View style={styles.campaignsListBottom}>
                      <Text style={styles.campaignsListBottomDate}>Delivery By - March 9th 2023</Text>
                      <Pressable style={styles.campaignsListBottomButton}
                        onPress={() => props.navigation.navigate("Campaign", x.id)}>
                        <Text style={[styles.bannerButtonText]}
                        >Buy Now</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
          {/* { : <Loader/>}  */}

        </View>
      </ScrollView>
    </>
  );
}
