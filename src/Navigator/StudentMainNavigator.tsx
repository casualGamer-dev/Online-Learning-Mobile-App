import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';



import { StudentBottomTab } from '../../src/Navigator/StudentBottomTab';
import { StudentAssignment, StudentSeperateExam } from '../../src/Screens/Student';
import SubjectBlogPost from '../../src/components/SubjectBlogPost';
// import TeacherApp from './src/Screens/Teacher/TeacherApp'; 
import BlogAnswer from '../../src/components/BlogAnswer';
import AddANewQuesction from '../../src/components/AddANewQuesction';
// import StudentSavedLectureTopBar from './src/Navigator/StudentSavedLectureTopBar';
import Bookmark from '../../src/components/BookmarkScreen';
import Notification from '../../src/components/NotificationScreen';
// import SeperateSubjectChat from './src/components/SeperateSubjectChat';
// import BrodcastVideo from './src/Screens/Video/BrodcastVideo';



const StudentStack = createStackNavigator();

const StudentMainNavigator = () => {
    return(
        <StudentStack.Navigator
                initialRouteName={'StudentBottomTab'}
                screenOptions={{headerShown: false}}
                >
                {/* <Stack.Screen name="TeacherBottomTab" component={TeacherApp} /> */}
                <StudentStack.Screen name="StudentBottomTab" component={StudentBottomTab} />
                {/* <Stack.Screen name="StudentSavedLectureTopBar" component={StudentSavedLectureTopBar} /> */}    

                {/* <StudentStack.Screen name="StudentCourseAssignment" component={StudentAssignment} />
                <StudentStack.Screen name="StudentBlogPost" component={SubjectBlogPost} />
                <StudentStack.Screen name="AddAQuesction" component={AddANewQuesction} />
                <StudentStack.Screen name="BlogAnswer" component={BlogAnswer} />
                <StudentStack.Screen name="StudentSeperateExam" component={StudentSeperateExam} />
                <StudentStack.Screen name="Bookmark" component={Bookmark} />
                <StudentStack.Screen name="Notification" component={Notification} /> */}


                {/* <Stack.Screen name="SeperateSubjectChat" component={SeperateSubjectChat} /> */}
                {/* <Stack.Screen name="SubjectVideo" component={BrodcastVideo} /> */}
              </StudentStack.Navigator>
    );
}

export default StudentMainNavigator;