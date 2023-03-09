import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        paddingHorizontal:15,
    },
    logo: {
        width:160,
        height:38,
        position:'absolute',
        top: 15,
        left: 15,
    },
    bannerImage:{
        minHeight: 450,
        paddingTop: 100,
        resizeMode: 'auto',
        paddingBottom: 40,
    },
    bannerHeading: {
        fontSize: 45,
        color: '#fff',
        lineHeight: 55,
        marginBottom: 30,
    },
    bannerSubHeading: {
        fontSize: 20,
        maxWidth:400,
        color: '#fff',
        lineHeight: 28,
        marginBottom: 30,
    },
    bannerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 3,
        height:40,
        width:150,
        backgroundColor: '#fe8123',
    },
    bannerButtonText:{
        color: '#fff',
        fontSize: 16,
    },

    /**
     * Row & col
     */
    row:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal:-10
    },
    col_6:{
        width: '50%',
        paddingHorizontal:10
    },
    col12:{
        width: '100%',
        paddingHorizontal: 10
    },

    /**
     * Benefits
     */
    benefits:{
        paddingTop:50,
        paddingBottom:30,
        paddingHorizontal:15,
        backgroundColor: 'white'
    },
    benefitsHeading:{
        fontSize:25,
        textAlign:'center',
        color:'#fe8123',
        lineHeight: 32,
        marginBottom: 30,
    },
    benefitsImg:{
        width: 60,
        height: 60,
        marginEnd: 'auto',
        marginStart: 'auto',
        marginBottom: 20,
    },
    benefitsTitle: {
        fontSize: 14,
        lineHeight:20,
        marginBottom:8,
        color: '#152f2e',
        fontWeight: '600',
        textAlign: 'center',
    },
    benefitsPara:{
        marginBottom:30,
        fontSize: 12,
        color: '#152f2e',
        lineHeight: 18,
        textAlign: 'center',
    },
    
    /**
     * Product
     */
    sectionHeading:{
        fontSize:25,
        textAlign:'center',
        color:'#fe8123',
        lineHeight: 32,
        marginBottom: 30,
    },
    productSection:{
        paddingVertical: 50,
        paddingHorizontal:15,
        backgroundColor: '#f5f5f5',
    },
    productItem:{
        width: '100%',
        marginBottom:20,
        backgroundColor: '#fff'
    },
    productImg:{
        height:200,
        marginBottom:15,
        width: '100%'
    },
    productHeading:{
        fontSize: 18,
        color: '#152f2e',
        lineHeight: 26,
        marginBottom:8,
        textAlign: 'center',
        paddingHorizontal:15,
    },
    productPara:{
        fontSize:13,
        lineHeight: 20,
        color: '#152f2e',
        textAlign: 'center',
        paddingHorizontal:15,
        paddingBottom:12
    },


    /**
     * Community
     */
    communityImage:{
        resizeMode: 'cover',
    },
    community:{
        paddingVertical:50,
        paddingHorizontal:15
    },
    communityHeading:{
        fontSize:25,
        textAlign:'center',
        color:'#000',
        lineHeight: 32,
        marginBottom: 15,
    },
    communityPara:{
        fontSize:15,
        lineHeight:22,
        textAlign: 'center',
        marginBottom: 20,
    },
    communityButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 3,
        height:40,
        width:160,
        backgroundColor: '#fe8123',
        marginEnd:'auto',
        marginStart: 'auto'
    },
    communityButtonText:{
        color: '#fff',
        fontSize: 16,
    },


    /**
     * Footer
     */
    footer:{
        backgroundColor: '#303030',
        paddingVertical: 25,
        paddingHorizontal:15,
    },
    footerImg:{
        width:160,
        height:38,
        marginEnd:'auto',
        marginStart: 'auto',
        marginBottom: 20,
    },
    footerCopy:{
        textAlign: 'center',
        color: 'white'
    }
});