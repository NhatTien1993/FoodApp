import { Image, View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from './Contant';
import { ICONS } from './Images';
import { COLORS } from './Theme';
import DetailProduct from '../src/screen/detail/DetailProduct';
import HomePage from '../src/screen/home/HomePage';
import Search from '../src/screen/seacrh/Search';
import Like from '../src/screen/like/Like';
import User from '../src/screen/user/User';
import Map from '../src/screen/maps/Map';
import SearchMap from '../src/screen/maps/SearchMap';
import Cart from '../src/screen/cart/Cart';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
    return (
        <BottomTabBar {...props.props} />
    )
}
const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    if (accessibilityState.selected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={70}
                        height={57}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPress}
                    style={{
                        top: -24,
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    height: 60
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const TabBarNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderTopWidth: 0,
                backgroundColor: 'transparent'
            }
        }}
        tabBar={(props) => (<CustomTabBar props={props} />)}>
        <Tab.Screen
            name={screens.home}
            component={HomePage}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? COLORS.primary : COLORS.secondary,
                        }}
                        source={ICONS.cutlery}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton {...props} />
                )
            }}
        />
        <Tab.Screen
            name={screens.tab_search}
            component={Search}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? COLORS.primary : COLORS.secondary,
                        }}
                        source={ICONS.search}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton {...props} />
                )
            }}
        />
        <Tab.Screen
            name={screens.tab_like}
            component={Like}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? COLORS.primary : COLORS.secondary,
                        }}
                        source={ICONS.like}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton {...props} />
                )
            }}
        />
        <Tab.Screen
            name={screens.tab_user}
            component={User}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? COLORS.primary : COLORS.secondary,
                        }}
                        source={ICONS.user}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton {...props} />
                )
            }}
        />
    </Tab.Navigator>
)
const RootStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
        }}
    >
        <Stack.Screen name={screens.tab_home} component={TabBarNavigator} />
        <Stack.Screen name={screens.map} component={Map} />
        <Stack.Screen name={screens.detail} component={DetailProduct} />
        <Stack.Screen name={screens.cart} component={Cart} />
        <Stack.Screen
            name={screens.search_map} component={SearchMap}
            options={{
                animationEnabled: true,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 0.5, 0.9, 1],
                            outputRange: [0, 0.25, 0.7, 1],
                        }),
                    },
                    overlayStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
                            extrapolate: 'clamp',
                        }),
                    },

                }),
            }} />
    </Stack.Navigator>
)
export { RootStackNavigator }