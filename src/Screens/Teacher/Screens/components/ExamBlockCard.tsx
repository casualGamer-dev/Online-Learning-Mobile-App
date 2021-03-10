import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCurrentDate, getCurrentTime } from '../../../../utils/Utilities';
import Colors from '../../../../utils/Color';

const ExamBlockCard = (props: any) => {
    const {navigation, assignmentDetails} = props;

    const compareDate = (examDate, startTime, endTime) => {
        const current = getCurrentTime();
        const currentDate = getCurrentDate();
        if(examDate === currentDate) {
            if((startTime <= current) && (endTime > current))
                return true;
            return false;
        }
        return false;
    }

    return (
        <View style={styles.whiteBody}>
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ParticularExamView', {
                    assignmentDetails: assignmentDetails
                })}
                >
                <View style={{padding: 15, paddingLeft: 15, paddingRight: 15}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 17, fontWeight: '700', color: Colors.extremeBlue()}}>{assignmentDetails.file_name}</Text>
                        {compareDate(assignmentDetails.published_on, assignmentDetails.start_time, assignmentDetails.end_time) ? 
                            <Text style={{color: 'green'}}>On going</Text>    
                        :
                            <Text style={{color: 'red'}}>Completed / Not Started</Text> 
                        }
                    </View>
                    <Text style={{marginTop: 10}}>{'Published on : ' + assignmentDetails.published_on}</Text>
                    <Text style={{marginTop: 3}}>{'Start Time : ' + assignmentDetails.start_time}</Text>
                    <Text style={{marginTop: 3}}>{'Due Time : ' + assignmentDetails.end_time}</Text>
                    <Text numberOfLines={5}>{assignmentDetails.details}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ExamBlockCard;

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
