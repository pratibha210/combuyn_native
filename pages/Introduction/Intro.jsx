import React from "react";
import { SafeAreaView, Image, StyleSheet, Pressable, Text, View, Button, ImageBackground, StatusBar, PreviewLayout, ScrollView } from 'react-native';
import styles from "./Intro.style";
// import Carousel from 'react-native-snap-carousel';
// import { useFonts } from "expo-font";


export default function Intro(props) {

  // const [loaded] = useFonts({
  //   'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
  //   'PoppinsMedium': require('../../assets/fonts/Poppins-Medium.ttf'),
  //   'PoppinsSemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  // })

  // if (!loaded) {
  //   return null;
  // }
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
                style={[styles.bannerHeading]}
              >
                Live Together, Buy Together
              </Text>
              <Text
                style={[styles.bannerSubHeading]}
              >
                We enable communities to enjoy the benefits of group buying with utmost ease
              </Text>
              <Pressable
                onPress={() => props.navigation.navigate("Apartment")}
                style={styles.bannerButton}>
                <Text style={[styles.bannerButtonText]}
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
              style={[styles.benefitsHeading]}
            >Benefits of Community Buying</Text>

            <View style={styles.row}>
              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits1.png')}
                />
                <Text style={styles.benefitsTitle}>Get fresher products from trusted makers</Text>
                <Text style={styles.benefitsPara}>Exclusive batch preparation for ComBuyn communities</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits2.png')}
                />
                <Text style={styles.benefitsTitle}>Competitive pricing</Text>
                <Text style={styles.benefitsPara}>Buying in bulk is always cheaper</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits3.png')}
                />
                <Text style={styles.benefitsTitle}>Priorty support</Text>
                <Text style={styles.benefitsPara}>More power to customers as a community.</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits4.png')}
                />
                <Text style={styles.benefitsTitle}>No minimum order</Text>
                <Text style={styles.benefitsPara}>Free doorstep delivery. No minimum order value.</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits5.png')}
                />
                <Text style={styles.benefitsTitle}>Interstate delicacies</Text>
                <Text style={styles.benefitsPara}>Taste of India delivered doorstep at no extra cost.</Text>
              </View>

              <View style={styles.col_6}>
                <Image
                  style={styles.benefitsImg}
                  source={require('../../assets/images/benefits6.png')}
                />
                <Text style={styles.benefitsTitle}>Trusted feedback</Text>
                <Text style={styles.benefitsPara}>Get genuine feedback and reviews from community members.</Text>
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
                  <Text style={styles.productHeading}>Fresh hand-made paneer</Text>
                  <Text style={styles.productPara}>Super soft paneer procured everyday from Delhi.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img2.jpg')}
                  />
                  <Text style={styles.productHeading}>Fresh bakes</Text>
                  <Text style={styles.productPara}>Range of breads/cookies freshly baked just a few hours before delivery</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img3.jpg')}
                  />
                  <Text style={styles.productHeading}>Fresh Chakki Atta</Text>
                  <Text style={styles.productPara}>Range of breads/cookies freshly baked just a few hours before delivery</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img4.jpg')}
                  />
                  <Text style={styles.productHeading}>Fruits & Vegetables</Text>
                  <Text style={styles.productPara}>Imported and seasonal range of fruits/Vegetables procured daily from Farmer’s market in bulk.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img5.jpg')}
                  />
                  <Text style={styles.productHeading}>Cold pressed oils</Text>
                  <Text style={styles.productPara}>Range of traditionally milled cold pressed oils, ghee and butter.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_img6.jpg')}
                  />
                  <Text style={styles.productHeading}>Regional savories</Text>
                  <Text style={styles.productPara}>Authentic taste from a highly curated set of makers.</Text>
                </View>
              </View>

              <View style={styles.col12}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productImg}
                    source={require('../../assets/images/product_india.jpg')}
                  />
                  <Text style={styles.productHeading}>Interstate specialities</Text>
                  <Text style={styles.productPara}>Delhi Gazak. Bikaner pickles, Kerala chips, Agra Petha and many more.</Text>
                </View>
              </View>

            </View>
          </View>
        </SafeAreaView>

        <SafeAreaView>
          {/* <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          /> */}
        </SafeAreaView>

        <SafeAreaView>
          <ImageBackground
            source={require('../../assets/images/community_banner.jpg')}
            style={styles.communityImage}
          >
            <View style={styles.community}>
              <Text style={styles.communityHeading}>Join the community</Text>
              <Text style={styles.communityPara}>Join your neighbours in becoming part of the Combuyn community and get access to our range of curated and high quality products with all the benefits of group buying !</Text>
              <Pressable
                onPress={() => props.navigation.navigate("Apartment")}
                style={styles.communityButton}>
                <Text style={styles.communityButtonText}
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
            <Text style={styles.footerCopy}>© 2023 Combuyn. All Rights Reserved.</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

// const poppisFont = StyleSheet.create({
//   regular: {
//     fontFamily: 'PoppinsRegular'
//   },
//   medium: {
//     fontFamily: 'PoppinsMedium'
//   },
//   semibold: {
//     fontFamily: 'PoppinsSemiBold'
//   }
// });