import * as React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {StudentSavedVideo, StudentSavedMaterial} from '../Screens/Student';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/Color';
const TopTab = createMaterialTopTabNavigator();
const {width} = Dimensions.get('screen');

const StudentSavedLectureTopBar = ({navigation}: any) => {
  return (
    <TopTab.Navigator
        initialRouteName='StudentSavedVideo'
        tabBarOptions={{
          labelStyle: { fontSize: 12, color: Colors.white() },
          tabStyle: { width: width / 2 },
          style: { backgroundColor: Colors.darkBlue(), elevation: 0 },
          indicatorStyle: {backgroundColor: Colors.darkBlue()},
        }}
        >
        <TopTab.Screen 
          name="StudentSavedVideo" 
          component={StudentSavedVideo} 
          options={{
            tabBarLabel: 'Lecture Video'
          }}
        />
        <TopTab.Screen 
          name="StudentSavedMaterial" 
          component={StudentSavedMaterial} 
          options={{
            tabBarLabel: 'Lecture Material'
          }}
        />
    </TopTab.Navigator>
  );
};

export default StudentSavedLectureTopBar;