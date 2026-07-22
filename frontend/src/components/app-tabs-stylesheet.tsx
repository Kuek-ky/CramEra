import { StyleSheet } from "react-native";
import {
    Colors,
    Radius,
    Shadows,
    Spacing,
} from "@/theme/Index";

export default StyleSheet.create({

    floatingTabBar: {
        position: "absolute",

        left: Spacing.lg,
        right: Spacing.lg,
        bottom: Spacing.lg,

        height: 65,

        borderRadius: Radius.lg,

        backgroundColor: Colors.surface,

        borderTopWidth: 0,

        paddingTop: 10,
        paddingBottom: 4,
        paddingHorizontal: 6,

        ...Shadows.floating,
    },

    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },

    floatingTabBtnContainer: {

        width: 70,
        height: 70,

        borderRadius: Radius.pill,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Colors.primary,

        marginTop: -28,
    },

    defaultTabBtnContainer: {

        width: 60,
        height: 60,

        justifyContent: "center",
        alignItems: "center",

    },

    floatingTabBtn: {

        justifyContent: "center",
        alignItems: "center",

    },

    tabText: {

        ...{
            fontSize: 10,
            fontWeight: "600",
        },

        marginTop: 2,

    },

});