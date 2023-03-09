import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// import Header from "./components/Header";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Environment from "../../Environment";
import axios from "axios";
const Addaddress = (props) => {
  const BASE_URL = Environment.BASE_URL;

  const [apartment, setApartment] = React.useState("");
  const [tower, setTower] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [flatNo, setFlatNo] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [apartmentList, setApartmentList] = React.useState([]);
  const [towerList, setTowerList] = React.useState([]);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const onCompanyOpen = useCallback(() => {
    setGenderOpen(false);
  }, []);
  const { handleSubmit, control } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data, "data");
  // };

  const [userData, setUserData] = useState({});
  const [apartments, setApartments] = useState({});
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("loginDet");
      if (value !== null) {
        // We have data!!
        console.log(value);
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
        // We have data!!
        console.log(value);
        setApartments(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // console.log(props,"propspropsprops");

  useEffect(() => {
    retrieveData();
    retrieveDeliveryAdd();
  }, [props]);

  //  const  onChangeApprt=(e)=>{
  // console.log(e,"dfs");
  // setApartment(e)
  //   }

  const onChangeApprt = (event) => {
    // console.log(event,"dfs");
if(event){
  let appart = apartmentList &&
  apartmentList?.length > 0 &&
  apartmentList.filter((a) => {
    return a.value === event && a.label;
  });
  console.log(appart,"name");
  setApartment(appart[0].label)
    const towers =
      apartmentList &&
      apartmentList?.length > 0 &&
      apartmentList.filter((a) => {
        return a.value === event && a.towers;
      });
    const newTowers = towers[0]?.towers?.filter((t) => {
      return (
        (t.label = t.status === "Active" && t.name),
        (t.value = t.status === "Active" && t.name)
      );
    });
    //  console.log(newTowers,"newTowersnewTowers");
    setTowerList(newTowers);
  }
  };


  //   React.useEffect(() => {
  //     if (location.state?.flag == "edit") {
  //       setApartment(location?.state?.temadd?.apartment);
  //       setTower(location?.state?.temadd?.tower);
  //       setFlatNo(location?.state?.temadd?.flatNo);
  //       // }
  //     }
  //   }, [apartmentList]);

  //   React.useEffect(() => {
  //     // console.log( location.state?.index,"index");
  //     if (!checkIfUserLoggedIn()) {
  //       navigate(PageRoutes.LOGIN);
  //     }
  //   }, []);
  //   const getcampaignAPIcallFunc = (e) => {
  //     axios
  //       .get(
  //         BASE_URL +
  //           "campaigns?apartment=" +
  //           e +
  //           "&status=Active"
  //       )
  //       .then((res) => {
  //         // console.log(res, "res");
  //         if (res) {
  //           res.data = res.data.sort((a, b) => a.order - b.order);
  //           AsyncStorage.setItem("campaigns", JSON.stringify(res.data));
  //           let arr = JSON.parse(AsyncStorage.getItem("cartProduct"));
  //           let newArr = [];
  //           arr &&
  //             arr.length > 0 &&
  //             arr.map((item) => {
  //               return (
  //                 item.campaigns &&
  //                 item.campaigns.length > 0 &&
  //                 item.campaigns.map((camp) => {
  //                   return (
  //                     res.data &&
  //                     res.data.length > 0 &&
  //                     res.data.map((resp) => {
  //                       return camp.campaignId == resp.id && newArr.push(item);
  //                     })
  //                   );
  //                 })
  //               );
  //             });
  //           // console.log(newArr,"newArr")
  //           AsyncStorage.setItem("cartProduct", JSON.stringify(newArr));
  //         }
  //       })
  //       .catch((err) => {
  //         setErrorMessage(err.message);
  //       });
  //   };
  // fetch details of apartment
  // fetch details of cart
  React.useEffect(() => {
    if (userData?.token?.accessToken) {
      axios
        .get(BASE_URL + "apartments", {
          headers: {
            authorization: `bearer ${userData?.token?.accessToken}`,
          },
        })
        .then((res) => {
          // console.log(res, "reeeeeee");
          setIsLoading(false);
          let apart = res?.data?.filter((t) => t.status === "Active");
          let obj = { label: "", value: "", towers: [] };
          let newApart = [];
          apart?.map((x) => {
            return (
              (obj = { label: x.name, value: x.id, towers: x.towers }),
              newApart.push(obj)
            );
          });
          setApartmentList(newApart);
          // if(props.?.state?.temadd){
          // let arr = res?.data?.filter((t) => t.status === "Active");
          // const towers = arr
          //   .find((t) => t.name === location?.state?.temadd?.apartment)
          //   .towers.filter((t) => t.status === "Active");
          // setTowerList(towers);
          // }
        })
        .catch((err) => {
          // console.log(err, "reeeeeee");

          if (err.status === 401) {
            AsyncStorage.removeItem("loginDet");
            // AsyncStorage.removeItem("appartmentName")
            // AsyncStorage.removeItem("appartmentId")
            // navigate(PageRoutes.LOGIN);
          } else {
            setIsLoading(false);
            setErrorMessage(err.message);
          }
        });
    }
  }, [userData?.token?.accessToken]);
  // console.log(location.state, "location");

    const onSubmit = (e) => {
      // e.preventDefault();
      if (apartment || flatNo || tower) {
        const toUpdate = {

          apartment: apartment || userData?.user?.address[0].apartment,
          flatNo: e.flatNo || userData?.user?.address[0].flatNo,
          tower: e.tower || userData?.user?.address[0].tower,

        };
        // if (location.state?.flag == "edit") {
        //   axios
        //     .put(
        //       BASE_URL +
        //         "users/" +
        //         userInfo.id +
        //         "/address/" +
        //         location.state?.addId,
        //       toUpdate,
        //       getHeaderWithToken(accessToken.accessToken)
        //     )
        //     .then((res) => {
        //       console.log(res,"res",location.state)
        //       let idx = location.state?.index;
        //       let arr = localUpdate.user.address;
        //       arr[idx] = res.data;
        //       localUpdate.user.address = arr;
        //       AsyncStorage.setItem("loginDet", JSON.stringify(localUpdate));
        //       dispatch(setUserInfo(localUpdate.user));

        //       navigate(-1);
        //     })
        //     .catch((err) => {
        //       // console.log(err, "err");
        //       if (err.response.status === 401) {
        //         AsyncStorage.removeItem("loginDet");
        //         navigate(PageRoutes.LOGIN);
        //       } else {
        //         setIsLoading(false);
        //         setErrorMessage(err.message);
        //       }
        //     });
        // } 
        
        // else {
          axios
            .post(
              BASE_URL +
                "users/" +
                userData?.user?.id +
                "/address",
              toUpdate, {
                headers: {
                  authorization: `bearer ${userData?.token?.accessToken}`,
                },
              }
            )
            .then((res) => {
              // console.log(res.data,"res")
              let obj = res.data;
              // console.log(obj, "obj");
              let arr =  userData.user.address;
              arr.push(obj);
              userData.user.address = arr;
              AsyncStorage.setItem("loginDet", JSON.stringify( userData));
              // dispatch(setUserInfo(localUpdate.user));
              if (userData.user.address.length == 1) {
                AsyncStorage.setItem(
                  "deliveryAddress",
                  JSON.stringify( userData.user.address[0])
                );
                getcampaignAPIcallFunc(res.data.apartmentId);
                AsyncStorage.setItem(
                  "appartmentName",
                   userData.user.address[0].apartment
                );
                AsyncStorage.setItem("appartmentId",  userData.user.address[0].apartmentId);
              }

              props.navigation.navigate("AddressList");
            })
            .catch((err) => {
              // console.log(err, "err");
              if (err?.response?.status === 401) {
                AsyncStorage.removeItem("loginDet");
                props.navigation.navigate("Login")
              } else {
                setIsLoading(false);
                setErrorMessage(err.message);
              }
            });
        }
      // }
       else {
        setErrorMessage("All fields are required");
      }
    };

  return (
    <View style={styles.container}>
      {/* <Header text="Sign In" /> */}
      <Text style={styles.label}>Name</Text>
      <Controller
        name="name"
        defaultValue={userData?.user?.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // disabled
            //   readOnly
            style={styles.input}
            selectionColor={"#5188E3"}
            // onChangeText={onChange}
            value={value ? value : userData?.user?.name}
          />
        )}
      />

      <Text style={styles.label}>Email Address</Text>
      <Controller
        name="email"
        defaultValue={userData?.user?.email}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // disabled
            // readOnly
            style={styles.input}
            selectionColor={"#5188E3"}
            // onChangeText={onChange}
            value={value ? value : userData?.user?.email}
          />
        )}
      />
      <View>
        <Text style={styles.label}>Select Apartment</Text>
        <Controller
          name="apartment"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdownCompany}>
              <DropDownPicker
                style={styles.dropdown}
                open={companyOpen}
                value={companyValue} //companyValue
                items={apartmentList}
                setOpen={setCompanyOpen}
                setValue={setCompanyValue}
                setItems={setApartmentList}
                placeholder="Select apartment"
                placeholderStyle={styles.placeholderStyles}
                loading={loading}
                activityIndicatorColor="#5188E3"
                //   searchable={true}
                //   searchPlaceholder="Search your company here..."
                onOpen={onCompanyOpen}
                // onChangeValue={(e)=>onChange(e)}
                onChangeValue={(e) => {
                  onChangeApprt(e);
                }}
                zIndex={1000}
                zIndexInverse={3000}
              />
            </View>
          )}
        />

        <Text style={styles.label}>Select Tower</Text>
        <Controller
          name="tower"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdownGender}>
              <DropDownPicker
                style={styles.dropdown}
                open={genderOpen}
                value={genderValue} //genderValue
                items={towerList}
                setOpen={setGenderOpen}
                setValue={setGenderValue}
                setItems={setTowerList}
                placeholder="Select Tower"
                placeholderStyle={styles.placeholderStyles}
                onOpen={onGenderOpen}
                onChangeValue={(e) => onChange(e)}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
          )}
        />
      </View>

      <Text style={styles.label}>Flat No</Text>
      <Controller
        name="flatNo"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.getStarted}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> { props.navigation.replace("AddressList")}}>
        <Text style={styles.getStarted}>Cancel</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.logIn}>
        <Text style={styles.links}>I have an account</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderStyle: "solid",
    borderColor: "#B7B7B7",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
  },
  getStarted: {
    backgroundColor: "#5188E3",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  logIn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#758580",
  },
});

export default Addaddress;
