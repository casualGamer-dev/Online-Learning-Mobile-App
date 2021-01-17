import * as React from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-native-paper';
// import { StudentProvider, StoreProvider } from './src/contexts';
import { IntroScreen, Login } from './src/Screens/SignInFlow';
import { StudentBottomTab } from './src/Navigator/StudentBottomTab';
import { StudentAssignment, StudentSeperateExam } from './src/Screens/Student';
import SubjectBlogPost from './src/components/SubjectBlogPost';
// import TeacherApp from './src/Screens/Teacher/TeacherApp'; 
import BlogAnswer from './src/components/BlogAnswer';
import AddANewQuesction from './src/components/AddANewQuesction';
// import StudentSavedLectureTopBar from './src/Navigator/StudentSavedLectureTopBar';
import Bookmark from './src/components/BookmarkScreen';
import Notification from './src/components/NotificationScreen';
// import SeperateSubjectChat from './src/components/SeperateSubjectChat';
// import BrodcastVideo from './src/Screens/Video/BrodcastVideo';
import Colors from './src/utils/Color';
const Stack = createStackNavigator();

const App = () => {
  return (
    // {/* // <StoreProvider>
      //  <StudentProvider> */}
        <Provider>
          <StatusBar backgroundColor={Colors.F9Background()} barStyle='dark-content' />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={'Intro'}
              screenOptions={{headerShown: false}}
              >
              <Stack.Screen name="Intro" component={IntroScreen} />
              <Stack.Screen name="Login" component={Login} />
              {/* <Stack.Screen name="TeacherBottomTab" component={TeacherApp} /> */}
              <Stack.Screen name="StudentBottomTab" component={StudentBottomTab} />
              {/* <Stack.Screen name="StudentSavedLectureTopBar" component={StudentSavedLectureTopBar} /> */}
              <Stack.Screen name="StudentCourseAssignment" component={StudentAssignment} />
              <Stack.Screen name="StudentBlogPost" component={SubjectBlogPost} />
              <Stack.Screen name="AddAQuesction" component={AddANewQuesction} />
              <Stack.Screen name="BlogAnswer" component={BlogAnswer} />
              <Stack.Screen name="StudentSeperateExam" component={StudentSeperateExam} />
              <Stack.Screen name="Bookmark" component={Bookmark} />
              <Stack.Screen name="Notification" component={Notification} />
              {/* <Stack.Screen name="SeperateSubjectChat" component={SeperateSubjectChat} /> */}
              {/* <Stack.Screen name="SubjectVideo" component={BrodcastVideo} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      // {/* </StudentProvider> 
    // </StoreProvider> */}
  );
};

export default App;