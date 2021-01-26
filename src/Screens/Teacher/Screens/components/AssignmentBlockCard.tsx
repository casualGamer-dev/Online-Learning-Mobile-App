import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from '../../../../utils/Color';

const AssignmentBlockCard = (props: any) => {
  const {navigation} = props;
  return (
    <View style={styles.whiteBody}>
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ParticularAssignmentView')}
            >
            <View style={{padding: 15, paddingLeft: 15, paddingRight: 15}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 17, fontWeight: '700', color: Colors.extremeBlue()}}>Assignment <Text>: 1</Text></Text>
                    {true ? 
                        <Text style={{color: 'red'}}>Completed</Text> 
                    :
                        <Text style={{color: 'green'}}>On going</Text> 
                    }
                </View>
                <Text style={{marginTop: 10}}>Published on : 25 - 02 - 2020</Text>
                <Text style={{marginTop: 3}}>Due Date : 25 - 02 - 2020</Text>
                <Text numberOfLines={5}>Assignment Description Goes Here </Text>
            </View>
        </TouchableWithoutFeedback>
    </View>
  );
};

export default AssignmentBlockCard;

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
