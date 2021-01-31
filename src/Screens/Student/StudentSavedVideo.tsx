import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BottomRightFab from '../../components/StudentBottomRightFab';
import SecondHeader from '../../components/SecondHeader';
import Loader from '../../components/Loader';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const StudentSavedVideo = ({route, navigation}: any) => {
  const {subject_details} = route.params;
  const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getParticularCourseDetails = async () => {
    try{
      setLoading(true);
      const particularSubject: any = [];
      const fullSubjectDetails = 
        await firestore()
            .collection('saved_video')
            .where('subject_id', '==',subject_details.subject_id.toString())
            .get();

      fullSubjectDetails.forEach((res: any) => {
        const { video_url } = res.data();
        particularSubject.push({
          video_url
        });
      })
      // console.log(particularSubject)
      if(particularSubject.length === 0) setEmpty(true)
      setSingleSubjectdetails(particularSubject)
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
    !loading && !singleSubjectDetails.length ? <Loader /> : (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <SecondHeader 
          mainText='Pre Recorded Video'
        />
        <View style={styles.mainBody}>
            {/* <ScrollView style={{}}> */}
              <View style={styles.categoryBody}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {empty ?
                      <View style={styles.zeroQuestion}>
                        <Text>No Video Material Found!</Text>
                      </View>
                    :
                    <FlatList 
                      data={singleSubjectDetails}
                      showsVerticalScrollIndicator={false}
                      horizontal={false}
                      renderItem={ ({ item: videoDetails }) => {
                        return(
                          <>
                            <Text onPress={() => navigation.navigate('WebViewComponent')}>{videoDetails.video_url}</Text>
                          </>
                        )
                      }}
                      keyExtractor={ (item, index) => index.toString() }
                      />
                    }
                  </View>
              </View>
            {/* </ScrollView> */}
        </View>
        <BottomRightFab
          backgroundColor={Colors.darkColor()}
          navigation={navigation}
        />
      </SafeAreaView>
    </>
    )
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
    minHeight: height * .85, 
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
  }
});
