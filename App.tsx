import React from 'react';
import { StatusBar, Alert } from 'react-native';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from './src/Context';
import {storeData} from './src/AsyncActivities/storeData';
import {clearCache} from './src/AsyncActivities/clearCache';
import { IntroScreen, Login, Signup } from './src/Screens/SignInFlow';
import StudentMainNavigator from './src/Navigator/StudentMainNavigator';
import TeacherMainNavigator from './src/Navigator/TeacherMainNavigator';
import AdminMainNavigator from './src/Navigator/AdminMainNavigator';
import Loader from './src/components/Loader';
import Colors from './src/utils/Color';
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = React.useState(null);
  const [initialization, setInitialization] = React.useState(true);
  const authContext = {
    user,
    setUser,
    signIn: async (userName: any, password: any) => {
      try{
        await auth()
        .signInWithEmailAndPassword(userName, password)
        .then(() => console.log('LOGIN DONE'))
        .catch( (error) => {
          if (error.code === 'auth/wrong-password') {
            Alert.alert('WRONG Details!');
          } else {
            console.log(error)
          }
        });
      } catch(error) {
        console.log(error)
        Alert.alert('Error', 'Error in Login');
      }
    },
    signUp: async (userSignInData: any) => {
      console.log('SIGN UP PRESSED')
      try{
        await auth()
          .createUserWithEmailAndPassword(userSignInData.email, userSignInData.password)
          .then( userCredentials => {  
            firestore()
              .collection('Users')
              .add({
                user_id: userCredentials.user.uid,
                name: userSignInData.fullname,
                batch_id: userSignInData.batchId,
              })
              .then(() => {
                console.log('DATA ADDED AT THE TIME OF REG')
                return userCredentials.user.updateProfile({
                  displayName: userSignInData.type,
                })
              })
              .catch((Regerror) => Alert.alert(Regerror));
              storeData('extra', {
                name: userSignInData.fullName,
                batch_id: userSignInData.batchId,
                roll_number: userSignInData.roll_number
              });
          })
          .catch((error: any) => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('ERROR','That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
              Alert.alert('ERROR','That email address is invalid!');
            } else if (error.code === 'auth/weak-password') {
              Alert.alert('Warning','Weak Password');
            } else {
              console.log(error);
              Alert.alert('Error', 'Error in Registation Section...');
            }
          });
      } catch(e) {
        console.log(e)
        Alert.alert('Error', 'Error in Registation Section...')
      }
    },
    signOut: async () => {
      console.log('LOGOUT PRESSED')
      try{
        await auth().signOut();
        clearCache();
      } catch(e) {
        console.log(e)
        Alert.alert('Error', 'Error in Logout')
      }
    },
  };

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    storeData('user', user);
    if(initialization) setInitialization(false)
  }

  const PushNotification = async() => {
    try{
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch(e) {
      console.log(e)
      Alert.alert('Error', 'Error in Push Notifiction')
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    PushNotification()

    // When App in is Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification?.body)
    });

    // When App is in Quite Mode
    // messaging().getInitialNotification();

    // When App is in Foreground
    messaging().onMessage(remoteMessage => {
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification?.body)
    });

    return subscriber;
  }, []);

  if(initialization) {
    return(
      <Loader />
    );
  }

  return (
    <>
      <AuthContext.Provider value={authContext}>
        <Provider>
          <StatusBar backgroundColor={Colors.F9Background()} barStyle='dark-content' />
          <NavigationContainer>
            {user === null ? (
              <Stack.Navigator
                initialRouteName={'Intro'}
                screenOptions={{headerShown: false}}
                >
                <Stack.Screen name="Intro" component={IntroScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </Stack.Navigator>
            ) : user && user.displayName === 'student' ? (
              <StudentMainNavigator />
            ) : user && user.displayName === 'teacher' ? (
              <TeacherMainNavigator />
            ) : user && user.displayName === 'admin' ? (
              <AdminMainNavigator />
            ) : (
              <Loader />
            )}
          </NavigationContainer>
        </Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;