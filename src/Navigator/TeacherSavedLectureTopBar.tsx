import * as React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TeacherSavedVideo, TeacherSavedMaterial} from '../Screens/Teacher/Screens';
import Colors from '../utils/Color';
const TopTab = createMaterialTopTabNavigator();
const {width} = Dimensions.get('screen');

const TeacherSavedLectureTopBar = ({navigation}: any) => {
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
          name="TeacherSavedVideo" 
          component={TeacherSavedVideo} 
          options={{
            tabBarLabel: 'Upload Video'
          }}
        />
        <TopTab.Screen 
          name="TeacherSavedMaterial" 
          component={TeacherSavedMaterial} 
          options={{
            tabBarLabel: 'Upload Material'
          }}
        />
    </TopTab.Navigator>
  );
};

export default TeacherSavedLectureTopBar;