import * as React from 'react';
import { StatusBar, View, ActivityIndicator, Text, Alert } from 'react-native';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AuthContext } from './src/Context';
import {storeData} from './src/AsyncActivities/storeData';
import {getData} from './src/AsyncActivities/getData';
import {clearCache} from './src/AsyncActivities/clearCache';
import { IntroScreen, Login, Signup } from './src/Screens/SignInFlow';
import Colors from './src/utils/Color';
import StudentMainNavigator from './src/Navigator/StudentMainNavigator';
import auth from '@react-native-firebase/auth';
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
        .catch( (error) => Alert.alert(error));
      } catch(e) {
        console.log(e)
      }
    },
    signUp: async (userSignInData: any) => {
      console.log('SIGN UP PRESSED')
      try{
        await auth()
          .createUserWithEmailAndPassword(userSignInData.email, userSignInData.password)
          .then( userCredentials => {
            return userCredentials.user.updateProfile({
              displayName: userSignInData.fullname,
            })
          })
          .catch((error: any) => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
              Alert.alert('That email address is invalid!');
            } else if (error.code === 'auth/weak-password') {
              Alert.alert('weak password');
            } else
            Alert.alert(error);
          });
      } catch(e) {
        console.log(e)
      }
    },
    signOut: async () => {
      console.log('LOGOUT PRESSED')
      try{
        await auth().signOut();
        clearCache();
      } catch(e) {
        console.log(e)
      }
    },
  };

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    storeData('user', user);
    if(initialization) setInitialization(false)
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initialization) {
    return(
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size='large' color='red' />
      </View>
    );
  }

  return (
    <>
    <AuthContext.Provider value={authContext}>
    {/* // {/* // <StoreProvider> */}
      {/* //  <StudentProvider> */}
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
            ) : (
              <StudentMainNavigator />
            )}
          </NavigationContainer>
        </Provider>
      {/* // {/* </StudentProvider>  */}
     {/* // </StoreProvider> */}
    </AuthContext.Provider>
    </>
  );
};

export default App;