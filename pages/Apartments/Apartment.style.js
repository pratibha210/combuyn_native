import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    headerText:{
      
    },
    headerTextTtile:{
      fontSize:16,
      textTransform: 'uppercase',
      color: '#212529'
    },
    // Radio Design
    radio_box:{
      display:'flex',
      flexWrap: 'wrap',
    },
    radio_list: {
      paddingVertical:10,
      paddingHorizontal:0,
    },
    appartment_list:{
      paddingHorizontal:16,
      backgroundColor: 'white',
    },

    //Bottom
    appartmentBottom:{
      flexDirection: 'column',
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: 'auto'
    },
    totalApartmentsText: {
      width: '100%',
      textAlign: 'center',
      color: '#ff811a',
      fontSize: 14,
      lineHeight:18,
      marginBottom: 10
    },
    appartmentButton:{
      width: '100%',
      backgroundColor: '#007cb2',
      borderRadius:5,
      height:44,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    appartmentButtonText:{
      color:'#fff',
      fontSize:14,
      fontWeight:'600',
      textTransform:'uppercase',
    },

    //search
    apartmentSearch:{
      paddingHorizontal:15,
      paddingVertical:15,
      backgroundColor: '#fff'
    },
    apartmentSearchText:{
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 14,
      textAlign: 'center',
      marginBottom: 16  
    },
    searchInput:{
      color: '#f00',
      backgroundColor: '#f5f5ff',
    }
});