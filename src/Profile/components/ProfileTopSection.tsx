import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from '../../utils/Color';

const ProfileTopSection = (props: any) => {
//   const {} = props;
  return (
    <View style={styles.container}>
        <View style={{marginBottom: 5}}>
            <Image 
              style={{width: 100, height: 100}}
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKAow4o83Lcyh1oR4Huj3F837w8DKc0s6-wg&usqp=CAU'}}
            />
          </View>
          <Text style={{textAlign: 'center'}}>Teacher Name</Text>
          <Text>Work Expericnce uyuiyi</Text>
          <Text style={{marginTop: 3}}></Text>
          <Text>
            <Button 
              mode="contained"
              style={styles.btnFill}
              >
              <Text style={{color: Colors.appWhite()}}>E-mail Me</Text>
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <View style={styles.btnIcon}>
              <FeatherIcon name="phone" size={22} style={styles.btnIconInside} />
            </View>
          </Text>
    </View>
  );
};

export default ProfileTopSection;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white(),
        height: 240,
    },
    btnFill: {
        borderRadius: 30, 
        borderColor: Colors.darkBlue(), 
        borderWidth: 1,
        backgroundColor: Colors.darkBlue(),
    },
    btnIcon: {
        width: 45, 
        height: 40, 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: Colors.darkBlue(),
    },
    btnIconInside: {
        position: 'relative', 
        top: 7, 
        paddingLeft: 10, 
        color: Colors.darkBlue()
    },
});
