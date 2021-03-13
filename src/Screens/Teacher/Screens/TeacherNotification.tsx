import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../components/TeacherCommonHeader';
import SecondHeader from '../../../components/SecondHeader';
import NotificationCard from '../../../components/NotificationCard';
import Colors from '../../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const TeacherNotification = ({navigation}: any) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleSubjectAnswer, setSingleSubjectAnswer] = useState([]);

  const getTeacherNotification = async () => {
    try{
      setLoading(true);
      const particularSubjectAnswer: any = [];
      const fullSubjectAnswer = 
      await firestore()
        .collection('notification')
        .where('target', '==','teacher')
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
        getTeacherNotification()
        setLoading(false);
    }, []);
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          backgroundColor={Colors.headerBlue()}
          title="Notification"
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
        />
        <SecondHeader 
            welcomeMSG='Mr. Teacher'
        />
        <View style={styles.mainBody}>
          {/* <ScrollView style={{}}> */}
            <View style={styles.contentBody}>
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
                  onRefresh={getTeacherNotification}
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
  contentBody: {
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
