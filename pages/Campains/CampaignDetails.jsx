import React, { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./CampaignDetails.style";
import Environment from "../../Environment";
import axios from "axios";
export default function CampaignDetails(props) {
  const [campaignsData, setCampaignData] = useState({});
  const BASE_URL = Environment.BASE_URL;

  // console.log(props?.route?.params,"props");

  useEffect(() => {
    axios
      .get(BASE_URL + "campaigns/" + props?.route?.params)
      .then((res) => {
        console.log(res);
        if (res) {
          setCampaignData(res?.data);
        }
      })
      .catch((err) => {});
  }, []);

  return (

    <View>
    <Text style={styles.name}>{campaignsData?.name}</Text>

    {campaignsData?.products?.length > 0 && campaignsData?.products?.map((x)=>{
        return(

      
    <TouchableOpacity
      style={styles.card}
      // onPress={onPress}
    >
      <Image
        style={styles.thumb}
        source={x?.images?.[0].link}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{x?.name}</Text>
        <Text style={styles.price}>$ {x?.groupPrice}</Text>
      </View>
    </TouchableOpacity>
    )
    })}
    </View>

  );
}
