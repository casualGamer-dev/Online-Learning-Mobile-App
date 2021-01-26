import React, {useState} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Button, Provider } from 'react-native-paper';
import CommonHeader from '../components/TeacherCommonHeader';
import SecondHeader from '../../../components/SecondHeader';
import Colors from '../../../utils/Color';
import AssignmentDialog from './components/AssignmentDialog';
import AssignmentBlockCard from './components/AssignmentBlockCard';

const {width, height} = Dimensions.get('screen');
export const TeacherAssignment = ({navigation}: any) => {
    const [visible, setVisible] = useState(false);
    return (
        <Provider>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={true}
                backgroundColor={Colors.headerBlue()}
                title="All Assignments"
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                mainText='Subject Name'
                secondText='Last Updated on : 20th Jul 2020'
            />
            <View style={styles.mainBody}>
                <ScrollView style={{}}>
                    <View style={styles.categoryBody}>
                        {/* Upload View */}
                        <View style={styles.materialContent}>
                            <View style={styles.uploadSection}>
                                <Text style={styles.uploadText}>Want to upload ? </Text>
                                <Button onPress={() => setVisible(true)}>
                                    Click Here
                                </Button>
                            </View>
                        </View>
                        {/* Card */}
                        <AssignmentBlockCard navigation={navigation} />
                    </View>
                </ScrollView>
            </View>
            <AssignmentDialog visible={visible} setVisible={setVisible} />
        </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    materialContent: {
        backgroundColor: Colors.white(), 
        padding: 15,
        paddingTop: 0,
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
    uploadSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        top: 6,
    },
    uploadText: {
        position: 'relative', 
        top: 8
    },
});
