/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image } from 'react-native';
import LoginScreen from './login';
import RegisterScreen from './register';
import Home from './home';
import Cart from './Cart';
import Favorites from './Favorites';
import Shop from './Shop';
import Profile from './Profile';
import SearchScreen from './SearchScreen';
import ProductDetail from './ProductDetail';
import Payment from './Payment';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderReturn from './OrderReturn/OrderReturn';
import EditProfile from './EditProfile';
import Orders from './Orders';
import OrderDetail from './OrderDetail';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#999999',
                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                ],
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../images/Home.png')}
                            style={{ width: 22, height: 22, resizeMode: 'stretch' }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Shop"
                component={ShopStack}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../images/search.png')}
                            style={{ width: 20, height: 20, resizeMode: 'stretch' }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../images/heart.png')}
                            style={{ width: 25, height: 25, resizeMode: 'stretch' }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStackScreen}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../images/cart.png')}
                            style={{ width: 28, height: 28, resizeMode: 'stretch' }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../images/profile.png')}
                            style={{ width: 23, height: 23, resizeMode: 'stretch' }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

const ShopStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="ShopHome" component={Shop} options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const CartStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name="CartHome" component={Cart} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
        <Stack.Screen name="Return" component={OrderReturn} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const ProfileStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name="ProfileHome" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
);

export const RootComponent = function () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="HomeTabs" component={MyTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
