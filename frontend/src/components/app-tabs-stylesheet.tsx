import { StyleSheet } from "react-native"

export default StyleSheet.create({
    floatingTabBar: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        height: 60,
        width: "90%",
        borderTopWidth: 0,
        paddingTop: 10,
        alignSelf: "center",
        bottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    floatingTabBtnContainer: {
        top: -15,
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#2d5082',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2,
        paddingBottom: 2
    },
    floatingTabBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabText: {
        fontSize: 9
    },
    defaultTabBtnContainer: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
});