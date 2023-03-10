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
import { useFonts } from "expo-font";
import { FontAwesome } from '@expo/vector-icons';

export default function Home(props) {
  // font
  const [loaded] = useFonts({
    'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'PoppinsMedium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'PoppinsSemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  })

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

  if (!loaded) {
    return null;
  }
  return (
    <>
      <View style={styles.homeHeader}>
        <View style={styles.homeHeaderRow}>
          <View style={styles.homeHeaderLeft}>
            <Image
              style={styles.homeHeadLogo}
              source={require('../../assets/images/logo.png')}
            />
            <Text style={[styles.apart_name, poppisFont.regular]}>Ajmera Infinity <FontAwesome style={styles.fontIcon} name="angle-down" size={14} color="#007cb2" /></Text>
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
        {/* <View>
          <FlatList>
            <View><Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi exercitationem dolorum debitis iusto fugiat? Excepturi perferendis quam corrupti, similique id itaque doloremque et assumenda facilis velit porro modi cupiditate magni.</Text></View>
            <View><Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi exercitationem dolorum debitis iusto fugiat? Excepturi perferendis quam corrupti, similique id itaque doloremque et assumenda facilis velit porro modi cupiditate magni.</Text></View>
            <View><Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi exercitationem dolorum debitis iusto fugiat? Excepturi perferendis quam corrupti, similique id itaque doloremque et assumenda facilis velit porro modi cupiditate magni.</Text></View>
          </FlatList>
        </View> */}


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
                    <Text style={[styles.campaignsListHeading, poppisFont.medium]}>{x.name}</Text>
                    <Text style={[styles.campaignsListDetails, poppisFont.regular]}>{createMarkup(x.description)}</Text>

                    <View style={styles.campaignsListBottom}>
                      <Text style={[styles.campaignsListBottomDate, poppisFont.medium]}>Delivery By - March 9th 2023</Text>
                      <Pressable style={styles.campaignsListBottomButton}
                        onPress={() => props.navigation.navigate("Campaign", x.id)}>
                        <Text style={[styles.campaignsListBottomButtonText, poppisFont.medium]}
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