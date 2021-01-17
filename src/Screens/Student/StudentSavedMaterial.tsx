import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import {Provider} from 'react-native-paper';
import SecondHeader from '../../components/SecondHeader';
import LectureMaterial from '../../components/LectureMaterial';
import BottomRightFab from '../../components/StudentBottomRightFab';
import Colors from '../../utils/Color';

const {width, height} = Dimensions.get('screen');
export const StudentSavedMaterial = ({navigation}: any) => {
  return (
    <Provider>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <SecondHeader 
          mainText='Lecture Material'
          secondText='Last Updated on : 20th Jul 2020'
        />
        <View style={styles.mainBody}>
          <ScrollView style={{}}>
            <View style={styles.categoryBody}>

              <LectureMaterial />
              <LectureMaterial />

            </View>
          </ScrollView>
        </View>
        <BottomRightFab
          backgroundColor={Colors.darkColor()}
          navigation={navigation}
        />
      </SafeAreaView>
    </Provider>
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
    marginTop: 5,
    marginBottom: 130
  },
  upperTop: {
    width, 
    height: 90, 
    backgroundColor: '#4B83F2', 
    paddingRight: 15, 
    paddingLeft: 15
  },
});
