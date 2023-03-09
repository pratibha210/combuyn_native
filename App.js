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

import Profile from "./pages/Profile/Profile";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


const TabStack =()=> {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#F8F8F8',
        tabBarStyle: {
          backgroundColor: '#633689',
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 12
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home-outline'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // tabBarLabel: 'Home',
          headerShown: false
        }}  />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Introduction" component={Intro} />
          <Stack.Screen options={{headerShown: false}} name="Apartment" component={Apartment} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={RegisterForm} />
          <Stack.Screen name="OTP" component={Otp} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Address" component={Addaddress} />
          <Stack.Screen name="AddressList" component={AddressList} />
          <Stack.Screen name="Campaign" component={CampaignDetails} />
          <Stack.Screen
            name="Home"
            component={TabStack}
            options={{headerShown: false}}
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
