import React, {useContext, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import { AuthContext } from '../../Context';
import CommonHeader from '../../components/StudentCommonHeader';
import Category from '../../components/CategoryScreen';
import SecondHeader from '../../components/SecondHeader';
import Colors from '../../utils/Color';

import firestore from '@react-native-firebase/firestore';
import { getData } from '../../AsyncActivities/getData';
const {width, height} = Dimensions.get('screen');

export const StudentDashboard = ({navigation}: any) => {
  const { user } = useContext(AuthContext);
  // console.log(user.providerData)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  const getCurrentDate = () => {
    const today: Date = new Date();
    const date = today.getDate() + " "+ monthNames[parseInt(`${today.getMonth()}`)] +" "+ today.getFullYear();
    return date;
  }

  const data123 = async () => {
    let abcd;
    try{
      abcd = await getData('extra')
    } catch(e) {
      console.log(e)
    }
    
      if(abcd.batch_id) {
        try {
          // console.log(abcd)
    const data = await firestore().collection('subject_details').where('batch_id', '==',abcd.batch_id).get();
    // const abcd2 = await getData('user')
    // console.log('hjhkj',abcd)
    // console.log('abcd2',user.uid)
    console.log('TESTING',data.forEach((a) => console.log(a._data.subject_name)))
    } catch(e) {
      console.log(e)
    }
  }
  };

  // useEffect(() => {try{data123()} catch(e){console.log(e)}});

  // useEffect(() => {
  //   firestore()
  //     .collection('subject_details')
  //     .add({
  //       batch_id: 125,
  //       teacher_id: 156,
  //       subject_name: 'abcd'
  //     })
  //     .then(() => {
  //       console.log('DONE')
  //     })
  //     .catch((error) => console.log(error));
  // });

  

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          backgroundColor={Colors.headerBlue()}
          title="My Dashboard"
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
        />
        <SecondHeader 
          welcomeMSG={`${user.displayName}`}
        />
        <View style={styles.mainBody}>
          <ScrollView style={{}}>
              <View style={styles.IntroductionMsg}>
                <Text style={{fontSize: 0}}></Text>
                {/* <Text style={styles.bodyHeading}>{`Welcome, ${user.displayName}`}</Text> */}
                {/* <Text style={styles.currentDate}>{getCurrentDate()}</Text> */}
                {/* <Text></Text> */}
              </View>
              <View style={styles.categoryBody}>
                <Category 
                  navigation={navigation} 
                  name='SeperateCourseDetails'
                />
              </View>
          </ScrollView>
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
  currentDate: {
    marginTop: 3
  },
  bodyHeading: {
    fontSize: 20, 
    fontWeight: '700', 
    marginTop: 0,
    color: Colors.extremeBlue(),
  },
  categoryBody: {
    marginTop: 25, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
});
