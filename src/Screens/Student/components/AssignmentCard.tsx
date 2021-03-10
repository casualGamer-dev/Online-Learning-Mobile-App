import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context';
import AssignmentModal from './AssignmentModal';
import { getCurrentDate } from '../../../utils/Utilities';
import Colors from '../../../utils/Color';

const AssignmentCard = (props: any) => {
    const {setVisible, assignmentDetails, navigation, visible, setLoading, setDetails} = props;
    const {user} = useContext(AuthContext)
    const [assignmentRecord, setAssignmentRecord] = useState<any>();
    const [dueAssignmentDetails, setDueAssignmentDetails] = useState<any>();

    // 100 -> Submitted on time
    // 101 -> last date over and student has not submitted the assignment
    // 102 -> Not submitted and last date is not over

    const calculateAssignment = async (id, lastDate) => {
        try{
            // setLoading(true)
            const current = getCurrentDate();
            const checkAssignment: any = [];
            const assignment = 
                await firestore()
                    .collection('submitted_assignments')
                    .where('assignment_id', '==',id.toString())
                    .where('uid', '==', user.uid.toString())
                    .get();
            assignment.forEach((res: any) => {
                const { assignment_id } = res.data();
                checkAssignment.push({
                    assignment_id
                });
            })
            if(checkAssignment.length > 0) {
                console.log('100 called')
                return 100;
            } else if(checkAssignment.length === 0 && lastDate < current) {
                console.log('101 called')
                return 101;
            } else if(checkAssignment.length === 0 && lastDate > current) {
                console.log('102 called')
                return 102;
            }
            // setLoading(false)
            return 103;
        } catch(err) {
            console.log(err)
            Alert.alert('ERROR', 'An Error has occurred!');
        }
    }

    useEffect(() => {
        const assignmentCode = calculateAssignment(assignmentDetails.assignment_id, assignmentDetails.last_date);
        assignmentCode
        .then((code) => {
            setAssignmentRecord(code);
        })
        .catch(() => {
            Alert.alert('ERROR', 'Error while fetching the assignment data!');
        });
        console.log(assignmentCode)
    }, []);

    const submitAssignment = (details) => {
        setVisible(true)
        setDetails(details)
    }

    return (
        <View style={styles.whiteBody}> 
            <TouchableWithoutFeedback
                onPress={() => {
                    if(assignmentRecord === 102) {
                        submitAssignment(assignmentDetails)
                    }
                }}
                >
                <View style={{padding: 15, paddingLeft: 15, paddingRight: 15}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 17, fontWeight: '700', color: Colors.extremeBlue()}}>{assignmentDetails.file_name}</Text>
                        {assignmentRecord == 101 ? 
                            <Text style={{color: 'red'}}>Not Submitted (Over)</Text> 
                        : assignmentRecord == 102 ?
                            <Text style={{color: 'red'}}>Due</Text> 
                        : assignmentRecord == 100 ? 
                            <Text style={{color: 'green'}}>Submitted</Text> 
                        : null
                        }
                    </View>
                    <Text style={{marginTop: 10}}>{'Published on :' + assignmentDetails.published_on}</Text>
                    <Text style={{marginTop: 3}}>{'Due Date : ' + assignmentDetails.last_date}</Text>
                    <Text numberOfLines={5}>{assignmentDetails.details}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default AssignmentCard;

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
