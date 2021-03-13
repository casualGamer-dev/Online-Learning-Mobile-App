import 'react-native-gesture-handler';
import {AppRegistry, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    setTimeout(() => {
        console.log('Message handled in the background!', remoteMessage);
        Alert.alert(remoteMessage.notification.title, remoteMessage.notification?.body)
    }, 500);
});

AppRegistry.registerComponent(appName, () => App);
