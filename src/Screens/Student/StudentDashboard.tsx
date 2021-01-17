import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import CommonHeader from '../../components/StudentCommonHeader';
import Category from '../../components/CategoryScreen';
import SecondHeader from '../../components/SecondHeader';
import Colors from '../../utils/Color';

const {width, height} = Dimensions.get('screen');
export const StudentDashboard = ({navigation}: any) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  const getCurrentDate = () => {
    const today: Date = new Date();
    const date = today.getDate() + " "+ monthNames[parseInt(`${today.getMonth()}`)] +" "+ today.getFullYear();
    return date;
  }
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
          welcomeMSG='Mr. Rupam'
        />
        <View style={styles.mainBody}>
          <ScrollView style={{}}>
              <View style={styles.IntroductionMsg}>
                <Text style={{fontSize: 0}}></Text>
                <Text style={styles.bodyHeading}>Let's Learn Something</Text>
                <Text style={styles.currentDate}>{getCurrentDate()}</Text>
                <Text></Text>
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
