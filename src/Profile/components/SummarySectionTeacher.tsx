import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const SummarySectionTeacher = (props: object) => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryDetails}>
            <View>
                <Text style={[styles.textCenter]}>125</Text>
                <Text>Courses</Text>
            </View>
            <View>
                <Text style={[styles.textCenter]}>5000</Text>
                <Text>Students</Text>
            </View>
            <View>
                <Text style={[styles.textCenter]}>125+</Text>
                <Text>Videos</Text>
            </View>
      </View>
    </View>
  );
};

export default SummarySectionTeacher;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    summaryDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textCenter: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
    },
});
