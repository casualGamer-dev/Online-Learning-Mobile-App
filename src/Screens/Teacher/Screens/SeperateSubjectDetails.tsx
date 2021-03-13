import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions, Alert } from 'react-native';
import {Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CommonHeader from '../components/TeacherCommonHeader';
import SecondHeader from '../../../components/SecondHeader';
import BottomRightFab from '../components/TeacherBottomRightFab';
import Loader from '../../../components/Loader';
import Colors from '../../../utils/Color';
import LiveClassDialoge from './components/LiveClassDialoge';
import { getData } from '../../../AsyncActivities/getData';
const {width, height} = Dimensions.get('screen');

export const SeperateSubjectDetails = ({route, navigation}: any) => {
    const subjectId = route.params.subjectId;
    const userDetails = getData('extra')
    const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [liveOnline, setLiveOnline] = useState([]);
    const [name, setName] = useState('');

    const getLiveClass = async() => {
        setLoading(true)
        try {
            const liveArray: any = []
            const subjectLive = 
                await firestore()
                .collection('live_now')
                .where('subject_id', '==',subjectId.toString())
                .get();

            subjectLive.forEach((res: any) => {
                const { teacher_id, subject_id, video_id } = res.data();
                liveArray.push({
                    teacher_id,
                    subject_id,
                    video_id,
                    id: res._ref._documentPath._parts[1]
                });
            })
            setLiveOnline(liveArray);
        } catch (error) {
            Alert.alert('ERROR', 'Internal Server Error!');
            console.log('GETTING DATA LIVE',error)
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true)
        userDetails
            .then(allDetails => {
            if(allDetails) setName(allDetails.name)
            else setName('Admin')
            })
            .catch(err => Alert.alert('ERROR', 'Error in ProfileHome'));
        getLiveClass()
        setLoading(false)
    },[]);

    const getParticularCourseDetails = async () => {
        try{
            setLoading(true);
            const particularSubject: any = [];
            const fullSubjectDetails = 
                await firestore()
                    .collection('subject_details')
                    .where('subject_id', '==',subjectId.toString())
                    .get();

            fullSubjectDetails.forEach((res: any) => {
                const { subject_name, subject_id, teacher_name, batch_id } = res.data();
                particularSubject.push({
                    subject_name,
                    subject_id,
                    teacher_name,
                    batch_id
                });
            })
            // console.log(particularSubject)
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

    const removeLiveClass = async() => {
        const _deleteID = liveOnline[0].id;
        try {
            await firestore()
                .collection('live_now')
                .doc(_deleteID)
                .delete()
                .then(() => {
                    setLiveOnline([])
                    Alert.alert('Success', 'Live Class has been Stopped!')
                });
        } catch (error) {
            Alert.alert('ERROR', 'Internal Server Error!');
            console.log(error)
        }
    }

    const joinFromMobile = () => {
        console.log(liveOnline[0].video_id)
        navigation.navigate('TeacherLiveClassNow', {
            video_id: liveOnline[0].video_id
        })
    }

    return (
        !loading && !singleSubjectDetails.length ? <Loader /> : (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={true}
                backgroundColor={Colors.headerBlue()}
                title={singleSubjectDetails ? singleSubjectDetails[0].subject_name : 'Loading...'}
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                mainText={singleSubjectDetails ? `By ${singleSubjectDetails[0].teacher_name}` : 'Not Available'}
            />
            <View style={styles.mainBody}>
                <ScrollView style={{}}>
                    <View style={styles.categoryBody}>
                        <View style={{}}>
                            <View style={[styles.liveNowStyle]}>
                                <Text>Live class Details</Text>
                                {liveOnline.length === 1 ?
                                <>
                                <TouchableWithoutFeedback 
                                    onPress={() => removeLiveClass()}
                                    style={styles.liveView}
                                    >
                                    <Button 
                                        style={styles.liveBtn}
                                        >
                                        <Text style={styles.liveBtnTextRed}>Stop Live</Text>
                                    </Button>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback 
                                    onPress={() => joinFromMobile()}
                                    >
                                    <Button 
                                        style={styles.liveBtn}
                                        >
                                        <Text style={styles.liveBtnTextRed}>Join from Mobile</Text>
                                    </Button>
                                </TouchableWithoutFeedback>
                                </>
                                :
                                <TouchableWithoutFeedback 
                                    style={styles.liveView}
                                    onPress={() => setVisible(true)}
                                    >
                                    <Button 
                                        style={styles.liveBtn}
                                        >
                                        <Text style={styles.liveBtnText}>Start Now (meet.jit.si)</Text>
                                    </Button>
                                </TouchableWithoutFeedback>
                                }
                            </View>
                        </View>
                        <View style={{padding: 15, marginTop: 10}}>
                            <View style={styles.mainRow}>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherSavedLectureTopBar', {
                                        subject_details: singleSubjectDetails[0]
                                    })}>
                                        <Text style={styles.mainHeading}>Upload Lecture</Text>
                                        <Text style={styles.description}>{name}</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Ionicons name='ios-videocam-outline' size={45} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherBlogPost', {
                                        teacher: true,
                                        subject_details: singleSubjectDetails[0]
                                        })}>
                                        <Text style={styles.mainHeading}>Subject Doubts</Text>
                                        <Text style={styles.description}>{name}</Text>
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
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherAssignment', {
                                        subject_details: singleSubjectDetails[0]
                                    })}>
                                        <Text style={styles.mainHeading}>Assignments</Text>
                                        <Text style={styles.description}>{name}</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Feather name='edit' size={40} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.categoryViewStyle}>
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherExam', {
                                    subject_details: singleSubjectDetails[0]
                                })}>
                                        <Text style={styles.mainHeading}>Exam</Text>
                                        <Text style={styles.description}>{name}</Text>
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
                {/* Live Class Dialog */}
                <LiveClassDialoge 
                    visible={visible} 
                    setVisible={setVisible}
                    singleSubjectDetails={singleSubjectDetails[0]}
                    getLiveClass={getLiveClass}
                    setLoading={setLoading}
                />
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
    liveView: {
        paddingTop: 10
    },
    liveBtn: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        position: 'relative',
        left: -15
    },
    liveBtnText: {
        color: Colors.darkBlue()
    },
    liveBtnTextRed: {
        color: 'red'
    }
});
