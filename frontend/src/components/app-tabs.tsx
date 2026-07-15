import { Tabs } from 'expo-router';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import style from './app-tabs-stylesheet';

export default function AppTabs() {
    const TabIcon = ({name, src, color, focused }) => {
        if (focused) {
            return (
                <View style={style.floatingTabBtnContainer}>
                    <Image
                        source={src}
                        style={[style.icon, { tintColor: color }]}
                    />
                    <Text style={[style.tabText, {color: color}]}>{name}</Text>
                </View>
            );
        }

        return (
            <View style={style.defaultTabBtnContainer}>
                <Image
                    source={src}
                    style={[style.icon, { tintColor: color }]}
                />
                <Text style={[style.tabText, {color: color}]}>{name}</Text>
            </View>
        );
    };
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#000',
                tabBarStyle: style.floatingTabBar,
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="personal_documents"
                options={{
                    tabBarIcon: (props) =>
                        <TabIcon
                            src={require('@/assets/images/tabIcons/document.png')}
                            color={props.color}
                            focused={props.focused}
                            name={'Docs'}
                        />,
                }}
            />

            <Tabs.Screen
                name="flashcards"
                options={{
                    tabBarIcon: (props) =>
                        <TabIcon
                            src={require('@/assets/images/tabIcons/flashcards.png')}
                            color={props.color}
                            focused={props.focused}
                            name={'Flashcards'}
                        />,
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: (props) =>
                        <TabIcon
                            src={require('@/assets/images/tabIcons/home.png')}
                            color={props.color}
                            focused={props.focused}
                            name={'Home'}
                        />,
                }}
            />

            <Tabs.Screen
                name="holygrail"
                options={{
                    tabBarIcon: (props) =>
                        <TabIcon
                            src={require('@/assets/images/tabIcons/search.png')}
                            color={props.color}
                            focused={props.focused}
                            name={'The Grail'}
                        />,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: (props) =>
                        <TabIcon
                            src={require('@/assets/images/tabIcons/settings.png')}
                            color={props.color}
                            focused={props.focused}
                            name={'Settings'}
                        />,
                }}
            />
        </Tabs>
    );
}