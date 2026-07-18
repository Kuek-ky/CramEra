import {Tabs} from "expo-router";
import {Image, Text, View} from "react-native";

import {Colors} from "@/theme/colors";
import style from "./app-tabs-stylesheet";

interface TabIconProps {
    name: string;
    src: any;
    color: string;
    focused: boolean;
}

export default function AppTabs() {
    const TabIcon = ({
        name,
        src,
        color,
        focused,
    }: TabIconProps) => {
        return (
            <View
                style={
                    focused
                        ? style.floatingTabBtnContainer
                        : style.defaultTabBtnContainer
                }
            >
                <Image
                    source={src}
                    style={[
                        style.icon,
                        {
                            tintColor: color,
                        },
                    ]}
                />

                <Text
                    style={[
                        style.tabText,
                        {
                            color,
                        },
                    ]}
                >
                    {name}
                </Text>
            </View>
        );
    };

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: style.floatingTabBar,
                tabBarActiveTintColor: Colors.white,
                tabBarInactiveTintColor: Colors.textSecondary,
            }}
        >
            <Tabs.Screen
                name="personal_documents"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            name="Docs"
                            src={require("@/assets/images/tabIcons/document.png")}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="flashcards"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            name="Flashcards"
                            src={require("@/assets/images/tabIcons/flashcards.png")}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            name="Home"
                            src={require("@/assets/images/tabIcons/home.png")}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="holygrail"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            name="The Grail"
                            src={require("@/assets/images/tabIcons/search.png")}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            name="Settings"
                            src={require("@/assets/images/tabIcons/settings.png")}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}