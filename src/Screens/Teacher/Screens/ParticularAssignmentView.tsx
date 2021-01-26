import React from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Provider } from 'react-native-paper';
import CommonHeader from '../components/TeacherCommonHeader';
import SecondHeader from '../../../components/SecondHeader';
import Colors from '../../../utils/Color';
import MaterialMenu from '../../../components/MaterialMenu';

const {width, height} = Dimensions.get('screen');
export const ParticularAssignmentView = ({navigation}: any) => {
  return (
    <Provider>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
            x={true}
            backgroundColor={Colors.headerBlue()}
            title="Assignment 1"
            fontColor={Colors.headerFontColor()}
            navigation={navigation}
        />
        <SecondHeader 
            mainText='Title'
            secondText='Last Updated on : 20th Jul 2020'
        />
        <View style={styles.mainBody}>
            <ScrollView style={{}}>
                <View style={styles.categoryBody}>

                    <View style={{marginTop: 5}}>
                        <View style={{marginBottom: 10}}>
                            <Text style={styles.missingHeading}>Missing</Text>
                        </View>
                        <View style={styles.materialContent}>
                            <MaterialMenu />
                            <MaterialMenu />
                            <MaterialMenu />
                            <MaterialMenu />
                        </View>
                    </View>

                    <View style={{marginTop: 5}}>
                        <View style={{marginBottom: 10}}>
                            <Text style={styles.lateHeading}>Late Submission</Text>
                        </View>
                        <View style={styles.materialContent}>
                            <MaterialMenu />
                            <MaterialMenu />
                        </View>
                    </View>

                    <View style={{marginTop: 5}}>
                        <View style={{marginBottom: 10}}>
                            <Text style={styles.onTimeHeading}>On Time Submission</Text>
                        </View>
                        <View style={styles.materialContent}>
                            <MaterialMenu />
                            <MaterialMenu />
                            <MaterialMenu />
                            <MaterialMenu />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
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
        marginTop: 15, 
        paddingLeft: 15, 
        paddingRight: 15,
        marginBottom: 130
    },
    materialContent: {
        backgroundColor: Colors.white(), 
        padding: 15,
        paddingTop: 0,
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
    uploadSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        top: 6,
    },
    uploadText: {
        position: 'relative', 
        top: 8
    },
    lateHeading: {
        fontSize: 12, 
        fontWeight: '600', 
        color: Colors.extremeBlue()
    },
    onTimeHeading: {
        fontSize: 12, 
        fontWeight: '600', 
        color: 'green'
    },
    missingHeading: {
        fontSize: 12, 
        fontWeight: '600', 
        color: 'red'
    },
});
