import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Entypo';
import Colors from '../../utils/Color';

const AboutMe = (props: object) => {
  return (
    <View style={styles.container}>
      <View style={styles.paddingFull}>
          <View style={{width: '10%'}}>
            <FeatherIcon name='user' size={25} color={Colors.darkBlue()} />
          </View>
          <View style={{width: '90%'}}>
            <Text>This is the dummy text of the my bio section of the bio section thsis is yhe huh bio</Text>
          </View>
      </View>
    </View>
  );
};

export default AboutMe;

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        borderRadius: 10,
        backgroundColor: Colors.appWhite(),
        height: 120,
    },
    paddingFull: {
        padding: 15, 
        paddingLeft: 15, 
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
