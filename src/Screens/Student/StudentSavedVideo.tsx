import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import BottomRightFab from '../../components/StudentBottomRightFab';
import SecondHeader from '../../components/SecondHeader';
import Colors from '../../utils/Color';

const {width, height} = Dimensions.get('screen');
export const StudentSavedVideo = ({route, navigation}: any) => {
  const {subject_details} = route.params;
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <SecondHeader 
          mainText='Pre Recorded Video'
        />
        <View style={styles.mainBody}>
            <ScrollView style={{}}>
              <View style={styles.categoryBody}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text>Video Section</Text>
                      <Text>{subject_details.subject_id}</Text>
                  </View>
              </View>
            </ScrollView>
        </View>
        <BottomRightFab
          backgroundColor={Colors.darkColor()}
          navigation={navigation}
        />
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
  categoryBody: {
    marginTop: 25, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
});
