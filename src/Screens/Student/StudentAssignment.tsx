import React, {useState} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import BottomRightFab from '../../components/StudentBottomRightFab';
import AssignmentCard from './components/AssignmentCard';
import AssignmentModal from './components/AssignmentModal';
import Colors from '../../utils/Color';

const {width, height} = Dimensions.get('screen');
export const StudentAssignment = ({navigation}: any) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
            back={true}
            backgroundColor="#4B83F2"
            title="Subject Assignment"
            fontColor={'#F2F2F2'}
            navigation={navigation}
        />
        <SecondHeader 
            mainText='By Teacher Name / Subject'
            secondText='Last Assignment on : 20th Jul 2020'
        />
        <View style={styles.mainBody}>
            <ScrollView style={{}}>
              <View style={styles.categoryBody}>
                <View style={{}}>
                    <AssignmentCard setVisible={setVisible} />
                    <AssignmentCard setVisible={setVisible} />
                </View>
              </View>
            </ScrollView>
        </View>
        <BottomRightFab
            backgroundColor={Colors.darkColor()}
            navigation={navigation}
        />
        <AssignmentModal visible={visible} setVisible={setVisible} />
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
    answerInput: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: 15
    },
});
