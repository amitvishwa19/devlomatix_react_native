import { Animated, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useEffect, useRef, Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import { strings } from '../../utils/strings';
import { appcolors, appConfig } from '../../utils/constants';
import SettingsScreen from './SettingsScreen';
import PageBackground from '../../components/PageBackground';
import { HapticFeedback } from '../../utils/functions';
import DocumentsScreen from './DocumentsScreen';
import ChatsListScreen from './ChatsListScreen';



const BottomTab = createBottomTabNavigator();
type MainScreenProp = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen = ({ navigation }: MainScreenProp) => {
    const ref = useRef();


    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
            title: strings.appName,
            headerTransparent: true,
            headerTitleStyle: {
                color: 'red',
                //textAlign: 'center'

            },
            headerStyle: {
                //height: 50,
                //backgroundColor: 'blue',
                //borderBottomColor: 'transparent',
                //elevation: 0,
                //shadowOpacity: 0,
                //borderBottomWidth: 0,

            },
            headerTitleAlign: 'center',
            // headerLeft: () => {
            //    return  <Feather name="home" size={24} color="#003580" />
            // },
            // headerRight: () => {
            //     return <Feather name="home" size={24} color="#003580" />
            // }
        })


    }, [])

    const tabs = [
        {
            id: 3,
            name: 'Home',
            screen: 'HomeScreen',
            activeIcon: 'home',
            inactiveIcon: 'home-outline',
            Component: HomeScreen
        },
        {
            id: 1,
            name: 'Documents',
            screen: 'DocumentsScreen',
            activeIcon: 'documents',
            inactiveIcon: 'documents-outline',
            Component: DocumentsScreen
        },
        {
            id: 2,
            name: 'Chats',
            screen: 'ChatScreen',
            activeIcon: 'chatbubbles',
            inactiveIcon: 'chatbubbles-outline',
            Component: ChatsListScreen
        },
        {
            id: 4,
            name: 'Notifications',
            screen: 'NotificationScreen',
            activeIcon: 'notifications',
            inactiveIcon: 'notifications-outline',
            Component: NotificationScreen
        },
        {
            id: 5,
            name: 'Settings',
            screen: 'SettingsScreen',
            activeIcon: 'settings',
            inactiveIcon: 'settings-outline',
            Component: SettingsScreen
        }
    ]

    const ScreenOptions = {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle
    }
    return (
        <View style={{ flex: 1, backgroundColor: appcolors.primaryColor }}>
            <PageBackground />
            <BottomTab.Navigator screenOptions={ScreenOptions} initialRouteName={'Home'} >
            {
                    tabs.map((tab, index) => {
                        return (
                            <BottomTab.Screen name={tab.name}

                                key={tab.id}
                                component={tab.Component}
                                options={{
                                    tabBarLabel: 'Documents',
                                    tabBarShowLabel: false,
                                    headerShown: false,
                                    tabBarIcon: ({ focused }) => focused ? (<IonIcon name={tab.activeIcon} size={24} color={appcolors.primaryColor} />) : (<IonIcon name={tab.inactiveIcon} size={24} color="black" />),

                                    //tabBarButton: (props) => <TabBarButton item={tab} {...props} />
                                }}
                                listeners={({ navigation }) => ({
                                    tabPress: (e) => {
                                        HapticFeedback()
                                    },
                                })}
                            />
                        )
                    })
                }

            </BottomTab.Navigator>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    tabBarStyle: {
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 0,
        //position: 'absolute',
        bottom: 10,
        //height: 40,
        marginHorizontal: 10,
        borderRadius: 10,
        opacity: 1,

    },
    tabbarButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 55,
    },
    tabbarButton: {
        width: 50,
        height: 50,
        borderRadius: 25,


        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    tabbarButtonTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: appcolors.primaryColor,
        position: 'absolute',
        bottom: 20,
    }
})

const TabBarButton = ({ item, accessibilityState, onPress }: any) => {

    const animatedValues = {
        translate: useRef(new Animated.Value(0)).current,
        scale: useRef(new Animated.Value(0)).current,
    }

    const { translate, scale } = animatedValues

    useEffect(() => {
        handleAnimated()
    }, [accessibilityState.selected])

    const handleAnimated = () => {
        Animated.parallel([
            Animated.timing(translate, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 400,
                useNativeDriver: false
            }),
            Animated.timing(scale, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 250,
                useNativeDriver: false
            })
        ]).start()
    }

    const translateStyles = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    const scaleStyles = {
        opacity: scale.interpolate({
            inputRange: [.5, 1],
            outputRange: [.5, 1],
            extrapolate: 'clamp'
        }),
        transform: [
            {
                scale: scale
            }
        ]
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.tabbarButtonContainer}>
            <Animated.View style={[styles.tabbarButton, translateStyles]}>
                <Animated.View style={[{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },]}>
                    <IonIcon
                        name={accessibilityState.selected ? item.activeIcon : item.inactiveIcon}
                        size={24}
                        color={accessibilityState.selected ? appcolors.primaryColor : 'black'}
                    />
                </Animated.View>
            </Animated.View>
            <Animated.Text style={[styles.tabbarButtonTitle, { opacity: scale }]}>{item.name}</Animated.Text>
        </TouchableOpacity>
    )
}