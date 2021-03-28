import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {useSelector} from 'react-redux'
import RNBootSplash from 'react-native-bootsplash'

import Login from './src/components/login/Login'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faPlusCircle, faMapMarker, faHeart, faUser, faUserEdit } from '@fortawesome/free-solid-svg-icons'

import Home from './src/components/Home/Home'
import DetailHome from './src/components/Home/DetailHome'
import Filter from './src/components/Home/Filter'

import NearMe from './src/components/NearMe/NearMe'
import Profiles from './src/components/Profiles/Profiles'
import EditProfiles from './src/components/Profiles/EditProfiles'
import SignUp from './src/components/login/SignUp'
import Favorites from './src/components/Favorites/Favorites'
import AddProperty from './src/components/AddProperty/AddProperty'
import EditProperty from './src/components/AddProperty/EditProperty'
import Approve from './src/components/Approve/Approve'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Stack1 = () => {
    useEffect(() => {
        // let fontName = 'Kanit-Regular'
    }, [])
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="DetailHome" component={DetailHome} options={{ headerShown: false }} />
            <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
            <Stack.Screen name="EditProperty" component={EditProperty} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const Stack2 = () => {
    useEffect(() => {
        // let fontName = 'Kanit-Regular'
    }, [])
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profiles" component={Profiles} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfiles" component={EditProfiles} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const TabSctack = () => {
    const {role} = useSelector(state => state.userDataState)
    if(role === 'user'){
        return (
            <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}>
            <Tab.Screen
                name="Home"
                children={Stack1}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faHome} color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="AddProperty"
                component={AddProperty}
                options={{
                    tabBarLabel: 'Add Propery',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faPlusCircle} color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="NearMe"
                component={NearMe}
                options={{
                    tabBarLabel: 'Near Me',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faMapMarker} color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faHeart} color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profiles"
                component={Profiles}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faUser} color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
        )
    }
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}>
            <Tab.Screen
                name="Home"
                children={Stack1}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faHome} color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="AddProperty"
                component={AddProperty}
                options={{
                    tabBarLabel: 'Add Propery',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faPlusCircle} color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Approve"
                component={Approve}
                options={{
                    tabBarLabel: 'Approve',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faUserEdit} color={color} size={size} />,
                }}
            />
            {/* <Tab.Screen
                name="Profiles"
                component={Stack2}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faUser} color={color} size={size} />,
                }}
            /> */}
        </Tab.Navigator>
    )
}

export default function App() {
    useEffect(() => {
        RNBootSplash.hide({ duration: 500 }) // fade
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="main" children={TabSctack} options={{ headerShown: false }} />
                <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
