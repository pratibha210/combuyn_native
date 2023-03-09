import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    whiteBg :{
        backgroundColor:'white',
    },

    /**
     * Home Header
     */
    homeHeader:{
        position: 'relative',
        zIndex: 2,
        paddingHorizontal:15,
        elevation: 10,
        shadowColor: '#999',
        backgroundColor: 'white',
    },
    homeHeaderRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    homeHeadLogo:{
        width: 90,
        height:21,
        marginBottom:3
    },
    headerRightButton:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBtnStyle:{
        width: 40,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeHeaderLeft:{
        alignSelf: 'flex-end',
        marginBottom:5
    },
    apart_name:{
        alignItems: 'center',
        fontSize: 12,
        lineHeight: 14,
        color: '#007cb2'
    },

    /**
     * campaignsList
     */
    campaignsListWrap:{
        paddingHorizontal:15,
        paddingTop:15
    },
    campaignsList: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#afafaf',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius:10,
        marginBottom:15
    },
    campaignsListImg:{
        height: 156,
        borderTopLeftRadius:9,
        borderTopRightRadius:9,
    },
    campaignsListContent:{
        padding:12
    },
    campaignsListHeading:{
        fontSize:14,
        lineHeight: 20,
        marginBottom:3,
    },
    campaignsListDetails:{
        color: '#858585',
        fontSize: 13,
        lineHeight: 15,
        marginBottom:15
    },
    campaignsListBottom:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    campaignsListBottomButton:{
        paddingHorizontal:14,
        paddingVertical:8,
        backgroundColor: '#007cb2',
        borderRadius:2,
    },
    bannerButtonText:{
        color: 'white',
        textTransform: 'uppercase'
    },
    campaignsListBottomDate:{
        fontSize:12,
        color: '#007cb2',
        fontWeight: 600
    }
});