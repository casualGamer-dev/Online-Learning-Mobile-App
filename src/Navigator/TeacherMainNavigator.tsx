import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TeacherBottomTab from '../Navigator/TeacherBottomTab';
import TeacherSavedLectureTopBar from '../Navigator/TeacherSavedLectureTopBar';
import {
    TeacherAddNewCourse, TeacherAssignment, ParticularAssignmentView
} from '../Screens/Teacher/Screens';
const TeacherStack = createStackNavigator();

const TeacherMainNavigator = ({navigation}: any) => {
    return(
        <TeacherStack.Navigator
            initialRouteName={'TeacherBottomTab'}
            screenOptions={{headerShown: false}}
            >
            <TeacherStack.Screen name="TeacherBottomTab" component={TeacherBottomTab} />
            <TeacherStack.Screen name="TeacherAddNewCourse" component={TeacherAddNewCourse} />
            <TeacherStack.Screen name="TeacherSavedLectureTopBar" component={TeacherSavedLectureTopBar} />
            <TeacherStack.Screen name="TeacherAssignment" component={TeacherAssignment} />
            <TeacherStack.Screen name="ParticularAssignmentView" component={ParticularAssignmentView} />
        </TeacherStack.Navigator>
    );
}
export default TeacherMainNavigator;