import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from './StudentCommonHeader';
import Colors from '../utils/Color';
import BottomRightFab from './StudentBottomRightFab';
import QuesctionCard from './QuesctionCard';
import SecondHeader from '../components/SecondHeader';
import Loader from '../components/Loader';
const {width, height} = Dimensions.get('screen');

const SubjectBlogPost = ({ route, navigation }: any) => {
    const { teacher, subject_details } = route.params;
    const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(false);

    const guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    const getParticularCourseDetails = async () => {
        try{
            setLoading(true);
            // console.log('TYPE', subject_details.subject_id.toString(), typeof subject_details.subject_id.toString())
            const particularSubject: any = [];
            const fullSubjectDetails = 
                await firestore()
                    .collection('subject_q_and_a')
                    .where('subject_id', '==',subject_details.subject_id.toString())
                    .get();

            fullSubjectDetails.forEach((res: any) => {
                const { subject_id, question, question_id } = res.data();
                particularSubject.push({
                    subject_id,
                    question_id,
                    question
                });
            })
            // console.log(particularSubject)
            if(particularSubject.length === 0) setEmpty(true)
            // console.log(empty, particularSubject.length)
            setSingleSubjectdetails(particularSubject)
            setLoading(false);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setLoading(true)
        getParticularCourseDetails()
        setLoading(false);
    }, []);
    

    return (
        !empty && !loading && !singleSubjectDetails.length ? <Loader /> : (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={true}
                backgroundColor={Colors.headerBlue()}
                title={subject_details.subject_name}
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                mainText={'By ' + subject_details.teacher_name}
            />
            <View style={styles.mainBody}>
                {/* <ScrollView style={{}}> */}
                        <View style={styles.categoryBody}>
                            <View style={styles.mainListBody}>
                                {console.log(empty)}
                                {empty ?
                                    <View style={styles.zeroQuestion}>
                                        <Text>No Question Found!</Text>
                                    </View>
                                :
                                <FlatList 
                                    data={singleSubjectDetails}
                                    showsVerticalScrollIndicator={false}
                                    horizontal={false}
                                    renderItem={ ({ item: questionDetails }) => {
                                        return(
                                            <>
                                                <QuesctionCard questionDetails={questionDetails} navigation={navigation} />
                                            </>
                                        )
                                    }}
                                    keyExtractor={ (item, index) => index.toString() }
                                />
                                }
                            </View>
                        </View>
                {/* </ScrollView> */}
            </View>
            <BottomRightFab
                backgroundColor={Colors.darkColor()}
                navigation={navigation}
                teacher={teacher}
            />
        </SafeAreaView>
        </>
        )
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
    zeroQuestion: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SubjectBlogPost;