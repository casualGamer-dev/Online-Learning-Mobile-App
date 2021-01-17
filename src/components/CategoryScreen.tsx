import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import CustomIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../utils/Color';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// Icons -> book-open (Feather), file-text (Feather), book, book-reader, book-open (Fontawesome5)
const CategoryScreen = (props: any) => {
  const {navigation, name} = props;
  return (
    <View style={styles.categoryScreen}>
        <View style={styles.mainRow}>
            <View style={styles.categoryViewStyle}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate({name})}>
                    <Text style={styles.subjectName}>Subject Name</Text>
                    <Text style={styles.teacherName}>Teacher Name</Text>
                    <Text></Text>
                    <View style={styles.iconView}>
                        <Text style={styles.icon}>
                            <MaterialIcon name='laptop' size={40} color={Colors.darkColor()} />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.categoryViewStyle}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate({name})}>
                    <Text style={styles.subjectName}>Subject Name</Text>
                    <Text style={styles.teacherName}>Teacher Name</Text>
                    <Text></Text>
                    <View style={styles.iconView}>
                        <Text style={styles.icon}>
                            <MaterialIcon name='cloud-outline' size={40} color={Colors.darkColor()} />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
        <View style={{marginTop: 30}}></View>
        <View style={styles.mainRow}>
            <View style={styles.categoryViewStyle}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate({name})}>
                    <Text style={styles.subjectName}>Subject Name</Text>
                    <Text style={styles.teacherName}>Teacher Name</Text>
                    <Text></Text>
                    <View style={styles.iconView}>
                        <Text style={styles.icon}>
                            <Fontisto name='laboratory' size={35} color={Colors.darkColor()} />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.categoryViewStyle}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate({name})}>
                    <Text style={styles.subjectName}>Subject Name</Text>
                    <Text style={styles.teacherName}>Teacher Name</Text>
                    <Text></Text>
                    <View style={styles.iconView}>
                        <Text style={styles.icon}>
                            <MaterialIcon name='math-compass' size={40} color={Colors.darkColor()} />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
        
        <View style={{marginTop: 30}}></View>
        <View style={styles.mainRow}>
            <View style={styles.categoryViewStyle}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate({name})}>
                    <Text style={styles.subjectName}>Subject Name</Text>
                    <Text style={styles.teacherName}>Teacher Name</Text>
                    <Text></Text>
                    <View style={styles.iconView}>
                        <Text style={styles.icon}>
                            <MaterialIcon name='format-letter-case' size={40} color={Colors.darkColor()} />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.categoryViewStyle}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate({name})}>
                    <Text style={styles.subjectName}>Subject Name</Text>
                    <Text style={styles.teacherName}>Teacher Name</Text>
                    <Text></Text>
                    <View style={styles.iconView}>
                        <Text style={styles.icon}>
                            <MaterialIcon name='earth' size={40} color={Colors.darkColor()} />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    categoryScreen: {
    },
    mainRow: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    subjectName: {
        fontSize: 16, 
        color: Colors.black(), 
        fontWeight: '700'
    },
    teacherName: {
        fontSize: 12, 
        paddingTop: 4
    },
    iconView: {
        width: '100%', 
        height: 70,
        alignItems: 'center'
    },
    icon: {
        textAlign: 'left', 
        marginLeft: 5,
    },
    categoryViewStyle: {
        backgroundColor: '#F2F2FA',
        width: '47%',
        height: 160,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: Colors.blueShadow(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
});

export default CategoryScreen;