import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import CommonHeader from './StudentCommonHeader';
import Colors from '../utils/Color';
import BottomRightFab from './StudentBottomRightFab';
import QuesctionCard from './QuesctionCard';
import SecondHeader from '../components/SecondHeader';

const {width, height} = Dimensions.get('screen');
const SubjectBlogPost = ({ route, navigation }: any) => {
    const { teacher } = route.params;
    return (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={true}
                backgroundColor={Colors.headerBlue()}
                title="Subject Quesctions"
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                mainText='By Teacher Name'
                secondText='Last Activity: 25th May 2020'
            />
            <View style={styles.mainBody}>
                <ScrollView style={{}}>
                        <View style={styles.categoryBody}>

                            <View style={styles.mainListBody}>
                                <QuesctionCard navigation={navigation} />
                                <QuesctionCard navigation={navigation} />
                                <QuesctionCard navigation={navigation} />
                            </View>

                        </View>
                </ScrollView>
            </View>
            <BottomRightFab
                backgroundColor={Colors.darkColor()}
                navigation={navigation}
                teacher={teacher}
            />
        </SafeAreaView>
        </>
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
    mainListBody: {
        padding: 15,
    },
    categoryBody: {
        marginBottom: 130
    },
});

export default SubjectBlogPost;