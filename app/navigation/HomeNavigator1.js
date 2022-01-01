/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import TabBadgeIcon from '../components/navigation/TabBadgeIcon';

import Cart from '../screens/cart/Cart';
import Orders from '../screens/orders/Orders';

// import Settings screen
import Settings from '../screens/settings/Settings';

// import colors
import Colors from '../theme/colors';
import {color} from 'react-native-reanimated';
import {Platform, StyleSheet} from 'react-native';

// HomeNavigator Config

type Props = {
  color: string,
  focused: string,
  size: number,
};

// create bottom tab navigator
const Tab = createBottomTabNavigator();

// HomeNavigator
function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}: Props) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'magnify';
          } else if (route.name === 'Favorites') {
            iconName = `heart${focused ? '' : '-outline'}`;
          } else if (route.name === 'Settings') {
            iconName = `account-settings${focused ? '' : '-outline'}`;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secondaryText,
        showLabel: false, // hide labels
        style: {
          backgroundColor: Colors.surface, // TabBar background
        },
      }}>
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: (props) => (
            <TabBadgeIcon
              name={`cart${props.focused ? '' : '-outline'}`}
              {...props}
            />
          ),
        }}
      />



      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  androidMenu: {
    marginBottom: 20,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 100,
  },
  iosMenu: {
    bottom: 5,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 100,
    position: 'absolute',
  },
});

export default HomeNavigator;
