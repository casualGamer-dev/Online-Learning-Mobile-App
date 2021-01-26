import React, {useContext, useEffect, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [allSubject, setAllSubject] = useState([]);
  // console.log(user.providerData)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  const getCurrentDate = () => {
    const today: Date = new Date();
    const date = today.getDate() + " "+ monthNames[parseInt(`${today.getMonth()}`)] +" "+ today.getFullYear();
    return date;
  }

  const getStudentInformation = async () => {
    setLoading(true)
    let studentCourseDetails;
    try{
      studentCourseDetails = await getData('extra')
    } catch(e) {
      console.log(e)
    }
    if(studentCourseDetails.batch_id) {
      const subjectArray: any = [];
      try {
        const allSubjects = 
          await firestore()
          .collection('subject_details')
          .where('batch_id', '==',studentCourseDetails.batch_id)
          .get();
        // console.log('TESTING 123',data.forEach((a) => console.log(a._data.subject_name)))
        // const abcd2 = await getData('user')
        // console.log('hjhkj',abcd)
        // console.log('abcd2',user.uid)
        allSubjects.forEach((res: any) => {
          const { subject_name, teacher_name, subject_id } = res.data();
          subjectArray.push({
            subject_name,
            teacher_name,
            subject_id
          });
        })
        setAllSubject(subjectArray);
        setLoading(false);
      } catch(e) {
        console.log(e)
      }
    }
  };

  useEffect(() => {
    try{
      getStudentInformation()
    } catch(e){
      console.log(e)
    }
  }, []);

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
    {loading ? (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size='large' color='red' />
    </View>
    ) : (
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
            {/* <ScrollView style={{}}> */}
                <View style={styles.IntroductionMsg}>
                  <Text style={{fontSize: 0}}></Text>
                </View>

                <View style={styles.categoryBody}>
                  {allSubject ?
                    <Category 
                      navigation={navigation} 
                      name='SeperateCourseDetails'
                      allSubjectInfo={allSubject}
                    />
                  : null}
                </View>
      
            {/* </ScrollView> */}
          </View>
        </SafeAreaView>
      </>
    )}
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
