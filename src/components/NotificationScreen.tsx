import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../components/StudentCommonHeader';
import SecondHeader from '../components/SecondHeader';
import Colors from '../utils/Color';
import NotificationCard from './NotificationCard';
const {width, height} = Dimensions.get('screen');

const NotificationScreen = ({navigation}: any) => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [singleSubjectAnswer, setSingleSubjectAnswer] = useState([]);

    const getStudentNotification = async () => {
        try{
          setLoading(true);
          const particularSubjectAnswer: any = [];
          const fullSubjectAnswer = 
            await firestore()
              .collection('notification')
              .where('target', '==','student')
              .get();
    
          fullSubjectAnswer.forEach((res: any) => {
            const { notification_title, notification_body, date } = res.data();
            particularSubjectAnswer.push({
                notification_title,
                notification_body,
                date
            });
          })
          if(particularSubjectAnswer.length === 0) setEmpty(true)
          setSingleSubjectAnswer(particularSubjectAnswer)
          setLoading(false);
        } catch(e) {
          console.log(e)
        }
    }
    
    useEffect(() => {
        setLoading(true)
        getStudentNotification()
        setLoading(false);
    }, []);

    return (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                x={true}
                notification={true}
                backgroundColor={Colors.headerBlue()}
                title="My Notification"
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                blank={true}
            />
            <View style={styles.mainBody}>
                {/* <ScrollView style={{}}> */}
                    <View style={styles.categoryBody}>
                        {empty ?
                            <View style={styles.zeroQuestion}>
                                <Text>No Notification Found!</Text>
                            </View>
                        :
                            <FlatList 
                                data={singleSubjectAnswer}
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                refreshing={refresh}
                                onRefresh={getStudentNotification}
                                renderItem={ ({ item: notification }) => {
                                    return(
                                        <NotificationCard
                                            notificationDetails={notification}
                                            navigation={navigation}
                                        />
                                    )
                                }}
                                keyExtractor={ (item, index) => index.toString() }
                            />
                        }
                    </View>
                {/* </ScrollView> */}
            </View>
        </SafeAreaView> 
        </>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    IntroductionMsg: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
    },
    mainBody: {
        width,
        minHeight: height * .75, 
        backgroundColor: Colors.F9Background(), 
        borderTopRightRadius: 30, 
        position: 'relative', 
        top: -30
    },
    categoryBody: {
        marginTop: 25, 
        paddingLeft: 15, 
        paddingRight: 15,
        marginBottom: 130
    },
    zeroQuestion: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});
