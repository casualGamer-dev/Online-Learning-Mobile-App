import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import BottomRightFab from '../../components/StudentBottomRightFab';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const SeperateCourseDetails = ({route, navigation}: any) => {
    const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
    const subjectId = route.params.subjectId;

    const getParticularCourseDetails = async () => {
        console.log(subjectId)
        const particularSubject: any = [];
        const fullSubjectDetails = 
            await firestore()
                .collection('subject_details')
                .where('subject_id', '==',subjectId.toString())
                .get();

        fullSubjectDetails.forEach((res: any) => {
            const { subject_name, subject_id } = res.data();
            particularSubject.push({
                subject_name,
                subject_id
            });
        })
        setSingleSubjectdetails(particularSubject)
        console.log('SUBJECT',singleSubjectDetails)
    }   

    useEffect(() => {
        getParticularCourseDetails()
    }, []);

    return (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={false}
                backgroundColor={Colors.headerBlue()}
                title='Subject Name'
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                mainText='By Teacher Name ' 
                secondText='Last Activity: 25th May 2020' 
            />
            <View style={styles.mainBody}>
                <ScrollView style={{}}>
                    <View style={styles.categoryBody}>
                        <View style={{}}>
                            <View style={[styles.liveNowStyle]}>
                                <Text>Live Class Details</Text>
                                <Button
                                    onPress={() => navigation.navigate('SubjectVideo')}
                                    >
                                    <Text>Click to Join Live Class</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={{padding: 15, marginTop: 10}}>
                            <View style={styles.mainRow}>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('StudentSavedLectureTopBar')}>
                                        <Text style={styles.mainHeading}>Saved Lecture</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Ionicons name='ios-videocam-outline' size={45} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('StudentBlogPost', {
                                            teacher: false
                                        })}>
                                        <Text style={styles.mainHeading}>Questions</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <SimpleLineIcons name='info' size={40} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{marginTop: 20}}></View>
                            <View style={styles.mainRow}>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('StudentCourseAssignment')}>
                                        <Text style={styles.mainHeading}>Assignments</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Feather name='edit' size={40} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('StudentSeperateExam')}>
                                        <Text style={styles.mainHeading}>Exam</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Feather name='clipboard' size={40} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
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
    liveNowStyle: {
        padding: 15, 
        marginTop: '1%', 
        backgroundColor: Colors.headerFontColor(), 
        height: 120, 
        borderRadius: 15, 
        borderTopRightRadius: 0
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
    categoryScreen: {},
    categoryViewStyle: {
        backgroundColor: '#F2F2FA',
        width: '47%',
        height: 160,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: Colors.shadowWhite(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    mainRow: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    mainHeading: {
        fontSize: 16, 
        color: Colors.black(), 
        fontWeight: '700'
    },
    description: {
        fontSize: 12, 
        paddingTop: 4
    },
    iconDiv: {
        width: '100%', 
        height: 70,
        alignItems: 'center',
    },
    mainIcon: {
        textAlign: 'left', 
        marginLeft: 5
    },
});
