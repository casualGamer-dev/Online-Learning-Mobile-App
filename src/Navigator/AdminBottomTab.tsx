import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ProfileStack } from '../Profile';
import Colors from '../utils/Color';
import { Signup } from '../Screens/SignInFlow';
const Tab = createBottomTabNavigator();
export const AdminBottomTab = ({navigation}: any) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'AllSignup') {
            iconName = focused ? 'home' : 'home';
            return <AntIcon name={iconName} size={28} color={color} />;
          } else if (route.name === 'StudentProfile') {
            iconName = focused ? 'user' : 'user';
            return <Feather name={iconName} size={28} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.darkColor(),
        inactiveTintColor: Colors.black(),
        showLabel: false
      }}
      >
      <Tab.Screen 
        name="AllSignup" 
        component={Signup} 
        options={{
          tabBarLabel: 'Add User',
          // tabBarBadge: number
        }} 
      />

      <Tab.Screen 
        name="StudentProfile" 
        component={ProfileStack} 
        options={{
          tabBarLabel: 'Profile',
          // tabBarBadge: number
        }} 
      />
    </Tab.Navigator>
  );
};