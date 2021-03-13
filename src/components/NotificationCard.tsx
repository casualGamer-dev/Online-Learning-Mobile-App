import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCurrentDate } from '../utils/Utilities';
import Colors from '../utils/Color';

const NotificationCard = (props: any) => {
    const {notificationDetails, navigation} = props;

    return (
        <View style={styles.whiteBody}> 
            <TouchableWithoutFeedback
                >
                <View style={{padding: 15, paddingLeft: 15, paddingRight: 15}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 17, fontWeight: '700', color: Colors.extremeBlue()}}>
                            {notificationDetails.notification_title}
                        </Text>
                    </View>
                    <Text style={{marginTop: 10}}>{'Published on :' + notificationDetails.date}</Text>
                    <Text numberOfLines={5}>{notificationDetails.notification_body}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default NotificationCard;

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
