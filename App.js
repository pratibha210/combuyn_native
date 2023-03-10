import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import Intro from "./pages/Introduction/Intro";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Apartment from "./pages/Apartments/Apartment";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import RegisterForm from "./pages/RegisterPage/RegisterForm";
import Otp from "./pages/OtpPage/Otp";
import CampaignDetails from "./pages/Campains/CampaignDetails";
import Addaddress from "./pages/Profile/Addaddress";
import AddressList from "./pages/Profile/AddressList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Order from "./pages/Order/Order";
import Profile from "./pages/Profile/Profile";
import Knowmore from "./pages/KnowMore/KnowMorePage";
import PrivacyPolicy from "./pages/KnowMore/PrivacyPolicy";
import Termscondition from "./pages/KnowMore/Termscondition";
import AboutUs from "./pages/KnowMore/AboutUs";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabStack = () => {
  // font
  const [loaded] = useFonts({
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#007cb2",
        tabBarInactiveTintColor: "#1e1e1e",
        tabBarStyle: {
          paddingTop: 6,
          backgroundColor: "#fff",
          height: 60,
          elevation: 12,
          shadowColor: "black",
          shadowOpacity: 1,
          borderTopColor: "transparent",
        },
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 12,
          fontFamily: "PoppinsSemiBold",
          paddingBottom: 6,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: "#87B56A",
          borderBottomWidth: 0,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "MyOrder") {
            iconName = focused ? "basket" : "basket-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "More") {
            iconName = focused
              ? "ellipsis-horizontal"
              : "ellipsis-horizontal-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyOrder"
        component={Order}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="More"
        component={Knowmore}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Introduction"
              component={Intro}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Apartment"
              component={Apartment}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={RegisterForm} />
            <Stack.Screen name="OTP" component={Otp} />
            <Stack.Screen name="Profile" component={Profile} />
            {/* <Stack.Screen name="Address" component={Addaddress} /> */}
            <Stack.Screen name="AddressList" component={AddressList} />
            <Stack.Screen name="Campaign" component={CampaignDetails} />
            <Stack.Screen name="Aboutus" component={AboutUs} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Termscondition" component={Termscondition} />

            <Stack.Screen
              name="Home"
              component={TabStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
