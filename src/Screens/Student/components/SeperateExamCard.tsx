import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context';
import { getCurrentDate, getCurrentTime } from '../../../utils/Utilities';
import Colors from '../../../utils/Color';

const SeperateExamCard = (props: any) => {
    const {setVisible, assignmentDetails, navigation, visible, setLoading, setDetails} = props;
    const {user} = useContext(AuthContext)
    const [examRecord, setExamRecord] = useState<any>();
    const [dueExamDetails, setDueExamDetails] = useState<any>();

    // 100 -> Submitted on time
    // 101 -> Time over and student has not submitted the exam
    // 102 -> Not submitted and time is not over

    const calculateExam = async (id, examDate, startTime, endTime) => {
        try{
            // setLoading(true)
            const current = getCurrentDate();
            const currentTime = getCurrentTime();
            const checkExamAnswerSheet: any = [];
            const exam = 
                await firestore()
                    .collection('submitted_exams')
                    .where('exam_id', '==',id.toString())
                    .where('uid', '==', user.uid.toString())
                    .get();
            exam.forEach((res: any) => {
                const { assignment_id } = res.data();
                checkExamAnswerSheet.push({
                    assignment_id
                });
            })
            if(examDate === current) {
                if(checkExamAnswerSheet.length > 0) {
                    console.log('100 called')
                    return 100;
                } else if(checkExamAnswerSheet.length === 0 && ((startTime <= currentTime) && (endTime > currentTime))) {
                    console.log('102 called')
                    return 102;
                } else if(checkExamAnswerSheet.length === 0 && ((startTime <= currentTime) && (endTime <= currentTime))) {
                    console.log('101 called')
                    return 101;
                } else {
                    console.log('ERROR')
                    return 205;
                }
            } else {
                if(checkExamAnswerSheet.length > 0) {
                    return 100;
                } else {
                    return 101;
                }
            }
            // setLoading(false)
            return 103;
        } catch(err) {
            console.log(err)
            Alert.alert('ERROR', 'An Error has occurred!');
        }
    }

    useEffect(() => {
        const examCode = calculateExam(assignmentDetails.exam_id, assignmentDetails.published_on, assignmentDetails.start_time, assignmentDetails.end_time);
        examCode
        .then((code) => {
            setExamRecord(code);
        })
        .catch(() => {
            Alert.alert('ERROR', 'Error while fetching the assignment data!');
        });
        console.log(examRecord)
    }, []);

    const submitExam = (details) => {
        setVisible(true)
        setDetails(details)
    }

    return (
        <View style={styles.whiteBody}>
            <TouchableWithoutFeedback
                onPress={() => {
                    if(examRecord === 102) {
                        submitExam(assignmentDetails)
                    }
                }}
                >
                <View style={{padding: 15, paddingLeft: 15, paddingRight: 15}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 17, fontWeight: '700', color: Colors.extremeBlue()}}>{assignmentDetails.file_name}</Text>
                        {examRecord == 101 ? 
                            <Text style={{color: 'red'}}>Not Submitted (Over)</Text> 
                        : examRecord == 102 ?
                            <Text style={{color: 'red'}}>Due</Text> 
                        : examRecord == 100 ? 
                            <Text style={{color: 'green'}}>Submitted</Text> 
                        : null
                        }
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{marginTop: 10}}>Exam Date : {assignmentDetails.published_on}</Text>
                    </View>
                    <Text style={{marginTop: 3}}>Due Time : {assignmentDetails.start_time}</Text>
                    <Text style={{marginTop: 3}}>Due Time : {assignmentDetails.end_time}</Text>
                    <Text numberOfLines={5}>{assignmentDetails.details}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default SeperateExamCard;

const styles = StyleSheet.create({
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
});
