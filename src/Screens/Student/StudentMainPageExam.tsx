import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import Colors from '../../utils/Color';
import { getData } from '../../AsyncActivities/getData';
import SeperateExamCard from './components/SeperateExamCard';
import ExamDetailDesc from './components/ExamDetailDesc';
import Loader from '../../components/Loader';
const {width, height} = Dimensions.get('screen');

export const StudentMainPageExam = ({navigation}: any) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false);
  const [liveOnline, setLiveOnline] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [details, setDetails] = useState<any>();

  const getParticularCourseDetails = async () => {
    try{
      setLoading(true);
      const allData = await getData('extra')
      const ID = allData.batch_id;
      // console.log(ID)

      const liveArray: any = []
      const subjectLive = 
        await firestore()
          .collection('all_exams')
          .where('batch_id', '==',ID.toString())
          .get();
    
      subjectLive.forEach((res: any) => {
        const { file_name, details, file_url, published_on, start_time, end_time, exam_id, subject_id } = res.data();
        liveArray.push({
          file_name,
          details,
          file_url,
          published_on,
          start_time,
          end_time,
          exam_id,
          subject_id
        });
      })
      setLiveOnline(liveArray);
      if(liveArray.length === 0) {
        console.log('EMPTY CALLED')
        setEmpty(true);
      }
      setLoading(false);
    } catch(e) {
      console.log(e)
    }
  }  
    
  useEffect(() => {
    setLoading(true)
    getParticularCourseDetails()
    setLoading(false);
  }, []);

  return (
    <>
    {loading ? <Loader />
    :
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          backgroundColor={Colors.headerBlue()}
          title="My Exams"
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
        />
        <SecondHeader 
          mainText='All The Exams'
        />
        <View style={styles.mainBody}>
          {/* <ScrollView style={{}}> */}
            <View style={styles.contentBody}>
              {empty ?
                <View style={styles.zeroQuestion}>
                  <Text>No Exam Found!</Text>
                </View>
              :
                <FlatList 
                  data={liveOnline}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  refreshing={refresh}
                  onRefresh={getParticularCourseDetails}
                  renderItem={ ({ item: assignmentDetails }) => {
                  return(
                    <SeperateExamCard 
                      visible={visible}
                      setVisible={setVisible} 
                      assignmentDetails={assignmentDetails}
                      navigation={navigation} 
                      setLoading={setLoading}
                      setDetails={setDetails}
                    />
                  )
                  }}
                  keyExtractor={ (item, index) => index.toString() }
                />
              }
            </View>
          {/* </ScrollView> */}
        </View>
        <ExamDetailDesc 
          navigation={navigation} 
          visible={visible}
          setVisible={setVisible} 
          assignmentDetails={details}
          setLoading={setLoading} 
        />
      </SafeAreaView>
    </>
  }
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
  whiteBody: {
    backgroundColor: Colors.white(), 
    borderRadius: 10,      
    shadowColor: Colors.shadowWhite(),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  zeroQuestion: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});
