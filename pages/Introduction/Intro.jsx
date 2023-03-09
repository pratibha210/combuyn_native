import React, { useState } from "react";
import { SafeAreaView, Image, StyleSheet, Pressable, Text, View, Button, ImageBackground, StatusBar, PreviewLayout, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import styles from "./Intro.style";
// import Carousel from 'react-native-snap-carousel';
import { useFonts } from "expo-font";

const { width } = Dimensions.get('window');
const item_size = width * 0.92;

const sliderData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pallavi',
    des: 'The quality is excellent and is sourced from the grower or manufacturer, so the prices are fair. In the rare instance that we are dissatisfied, they are quick to give a replacement or refund. The variety is very good and seasonal foods and items arrive promptly. Thank you for making life easy for us. I am happy to be a part of the Combuyn family.'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Sharnam',
    des: "I've been ordering all my groceries online via multiple platforms, but there is a reason why Combuyn is my favorite... freshness & quality is always ensured. From veggies to made-to-order cheese, from seafood to freshly baked bread, combuyn is my one stop shop for all my daily needs. I really like the personal touch to customer service too- folks at Combuyn are always reachable for any issues. Keep on keeping on, Combuyn team!"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Mukesh',
    des: 'Always of the best quality and timely delivery.'
  },
];

const Item = ({ item }) => (
  <TouchableOpacity disabled={true} style={[styles.testimonialItem, { width: item_size }]}>
    <Text style={[styles.testipara, poppisFont.medium]}>{item.des}</Text>
    <Text style={[styles.testititle, poppisFont.semibold]}>{item.title}</Text>
  </TouchableOpacity>
);



export default function Intro(props) {
  // font
  const [loaded] = useFonts({
    'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'PoppinsMedium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'PoppinsSemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  })

  //slider
  const [selectedId, setSelectedId] = useState();
  const [currentIndex, setcurrentIndex] = useState(0);
  const renderItem = ({ item }) => {
    return (

      <Item
        item={item}
      // onPress={() => setSelectedId(item.id)}
      />
    );
  };


  if (!loaded) {
    return null;
  }
  return (
    <>
      <ScrollView>
        <SafeAreaView>
          <StatusBar
            animated={true}
            backgroundColor="#007faf"
          />
          <ImageBackground
            source={require('../../assets/images/banner.jpeg')}
            style={styles.bannerImage}
          >
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo.png')}
            />
            <View
              style={styles.container}
            >
              <Text
                style={[styles.bannerHeading, poppisFont.regular]}
              >
                Live Together, Buy Together
              </Text>
              <Text
                style={[styles.bannerSubHeading, poppisFont.regular]}
              >
                We enable communities to enjoy the benefits of group buying with utmost ease
              </Text>
              <Pressable
                onPress={() => props.navigation.navigate("Apartment")}
                style={styles.bannerButton}>
                <Text style={[styles.bannerButtonText, poppisFont.regular]}
                >Order Now</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </SafeAreaView>

        <SafeAreaView>
          <View
            style={styles.benefits}
          >
            <Text
              style={[styles.benefitsHeading, poppisFont.regular]}
            >Benefits of Community Buying</Text>

            <View style={styles.row}>
              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits1.png')}
                />
                <Text style={[styles.benefitsTitle, poppisFont.medium]}>Get fresher products from trusted makers</Text>
                <Text style={[styles.benefitsPara, poppisFont.regular]}>Exclusive batch preparation for ComBuyn communities</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits2.png')}
                />
                <Text style={[styles.benefitsTitle, poppisFont.medium]}>Competitive pricing</Text>
                <Text style={[styles.benefitsPara, poppisFont.regular]}>Buying in bulk is always cheaper</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits3.png')}
                />
                <Text style={[styles.benefitsTitle, poppisFont.medium]}>Priorty support</Text>
                <Text style={[styles.benefitsPara, poppisFont.regular]}>More power to customers as a community.</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits4.png')}
                />
                <Text style={[styles.benefitsTitle, poppisFont.medium]}>No minimum order</Text>
                <Text style={[styles.benefitsPara, poppisFont.regular]}>Free doorstep delivery. No minimum order value.</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits5.png')}
                />
                <Text style={[styles.benefitsTitle, poppisFont.medium]}>Interstate delicacies</Text>
                <Text style={[styles.benefitsPara, poppisFont.regular]}>Taste of India delivered doorstep at no extra cost.</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits6.png')}
                />
                <Text style={[styles.benefitsTitle, poppisFont.medium]}>Trusted feedback</Text>
                <Text style={[styles.benefitsPara, poppisFont.regular]}>Get genuine feedback and reviews from community members.</Text>
              </View>

            </View>

          </View>
        </SafeAreaView>

        <SafeAreaView>
          <View style={styles.productSection}>
            <Text
              style={styles.sectionHeading}>Our most loved products</Text>

            <View style={styles.row}>
              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img1.jpg')}
                  />
                  <Text style={[styles.productHeading, poppisFont.semibold]}>Fresh hand-made paneer</Text>
                  <Text style={[styles.productPara, poppisFont.regular]}>Super soft paneer procured everyday from Delhi.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img2.jpg')}
                  />
                  <Text style={[styles.productHeading, poppisFont.semibold]}>Fresh bakes</Text>
                  <Text style={[styles.productPara, poppisFont.regular]}>Range of breads/cookies freshly baked just a few hours before delivery</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img3.jpg')}
                  />
                  <Text style={[styles.productHeading, poppisFont.semibold]}>Fresh Chakki Atta</Text>
                  <Text style={[styles.productPara, poppisFont.regular]}>Range of breads/cookies freshly baked just a few hours before delivery</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img4.jpg')}
                  />
                  <Text style={[styles.productHeading, poppisFont.semibold]}>Fruits & Vegetables</Text>
                  <Text style={[styles.productPara, poppisFont.regular]}>Imported and seasonal range of fruits/Vegetables procured daily from Farmer’s market in bulk.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img5.jpg')}
                  />
                  <Text style={[styles.productHeading, poppisFont.semibold]}>Cold pressed oils</Text>
                  <Text style={[styles.productPara, poppisFont.regular]}>Range of traditionally milled cold pressed oils, ghee and butter.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img6.jpg')}
                  />
                  <Text style={[styles.productHeading, poppisFont.semibold]}>Regional savories</Text>
                  <Text style={[styles.productPara, poppisFont.regular]}>Authentic taste from a highly curated set of makers.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_india.jpg')}
                  />
                  <Text style={[styles.productHeading, poppisFont.semibold]}>Interstate specialities</Text>
                  <Text style={[styles.productPara, poppisFont.regular]}>Delhi Gazak. Bikaner pickles, Kerala chips, Agra Petha and many more.</Text>
                </View>
              </View>

            </View>
          </View>
        </SafeAreaView>

        <SafeAreaView>
          <ImageBackground
            style={styles.testimonialSection}
            source={require('../../assets/images/testimonial_bg.png')}>
            <View>
              <Text style={[styles.testimonialHeading, poppisFont.medium]}>What our customers say</Text>
            </View>

            <View style={styles.testimonialWrap}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                data={sliderData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                snapToInterval={item_size}
                decelerationRate={0}
                bounces={false}
                onScroll={e => {
                  const x = e.nativeEvent.contentOffset.x;
                  setcurrentIndex((x / width).toFixed(0))
                }}

                scrollEventThrottle={16}
                contentContainerStyle={{
                  justifyContent: 'center'
                }}
              />
            </View>
            <View style={styles.sliderDotsWrap}>
              {sliderData?.map((item, index) => {
                return (
                  <View key={index} style={[styles.sliderDots, {
                    backgroundColor: currentIndex == index ? '#ff811a' : '#ff811a',
                    opacity: currentIndex == index ? 1 : 0.5
                  }]}>
                  </View>
                )
              })}
            </View>
            <View style={styles.testiOverlaly}></View>
          </ImageBackground>
        </SafeAreaView>

        <SafeAreaView>
          <ImageBackground
            source={require('../../assets/images/community_banner.jpg')}
            style={styles.communityImage}
          >
            <View style={[styles.community, poppisFont.regular]}>
              <Text style={[styles.communityHeading, poppisFont.regular]}>Join the community</Text>
              <Text style={[styles.communityPara, poppisFont.regular]}>Join your neighbours in becoming part of the Combuyn community and get access to our range of curated and high quality products with all the benefits of group buying !</Text>
              <Pressable
                onPress={() => props.navigation.navigate("Apartment")}
                style={styles.communityButton}>
                <Text style={[styles.communityButtonText, poppisFont.regular]}
                >Explore Now</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </SafeAreaView>

        <SafeAreaView>
          <View style={styles.footer}>
            <Image
              style={styles.footerImg}
              source={require('../../assets/images/logo.png')}
            />
            <Text style={[styles.footerCopy, poppisFont.regular]}>© 2023 Combuyn. All Rights Reserved.</Text>
          </View>
        </SafeAreaView>
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