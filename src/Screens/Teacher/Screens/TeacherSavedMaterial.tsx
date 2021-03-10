import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import { Provider, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import SecondHeader from '../../../components/SecondHeader';
import BottomRightFab from '../components/TeacherBottomRightFab';
import MaterialMenu from '../../../components/MaterialMenu';
import MaterialDialog from './components/MaterialUploadDialog';
import Loader from '../../../components/Loader';
import Colors from '../../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const TeacherSavedMaterial = ({route, navigation}: any) => {
    const {subject_details} = route.params; 
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    const getParticularCourseDetails = async () => {
        setLoading(true)
        try{
            setLoading(true);
            console.log('CALLED')
            const particularSubject: any = [];
            const fullSubjectDetails = 
                await firestore()
                    .collection('saved_material')
                    .where('subject_id', '==',subject_details.subject_id.toString())
                    .get();
        
            fullSubjectDetails.forEach((res: any) => {
                const { file_url, file_name } = res.data();
                particularSubject.push({
                    file_name,
                    file_url
                });
            })
            // console.log(particularSubject)
            if(particularSubject.length === 0) setEmpty(true)
            setSingleSubjectdetails(particularSubject)
            setLoading(false);
            } catch(e) {
            console.log(e)
        }
        setLoading(false)
    }   
    
    useEffect(() => {
        setLoading(true)
        getParticularCourseDetails()
        setLoading(false);
    }, []);

    return (
        <>
        {loading ?
            <Loader />
        :
        <Provider>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <SecondHeader 
                mainText='Lecture Material (Except Video)'
            />
            <View style={styles.mainBody}>
                {/* <ScrollView style={{}}> */}
                    <View style={styles.categoryBody}>
                        <View style={styles.materialContent}>
                            <View style={styles.uploadSection}>
                                <Text style={styles.uploadText}>Want to upload ? </Text>
                                <Button onPress={() => setVisible(true)}>
                                    Click Here
                                </Button>
                            </View>
                        </View>
                         {/* Uploads will show here */}
                        <View style={{marginTop: 10}}>
                            {/* <View style={{marginBottom: 10}}>
                                <Text style={{fontSize: 12, fontWeight: '600'}}>25th May 2020</Text>
                            </View> */}
                            <View style={styles.materialContent}>
                                {empty ?
                                    <View style={styles.zeroQuestion}>
                                        <Text>No Material Found!</Text>
                                        <Text>If you have uploaded any material, Please reopen the tab!</Text>
                                    </View>
                                :
                                <FlatList 
                                    data={singleSubjectDetails}
                                    showsVerticalScrollIndicator={false}
                                    horizontal={false}
                                    refreshing={refresh}
                                    onRefresh={getParticularCourseDetails}
                                    renderItem={ ({ item: materialDetails }) => {
                                    return(
                                        <MaterialMenu 
                                            materialDetails={materialDetails}  
                                            navigation={navigation}
                                        />
                                    )
                                    }}
                                    keyExtractor={ (item, index) => index.toString() }
                                    />
                                }
                            </View>
                        </View>
                        {/*  */}
                    </View>
                {/* </ScrollView> */}
            </View>
            <BottomRightFab
                backgroundColor={Colors.darkColor()}
                navigation={navigation}
                singleSubjectDetails={subject_details}
            />
            <MaterialDialog 
                visible={visible} 
                setVisible={setVisible} 
                loading={loading}
                setLoading={setLoading}
                subject_details={subject_details}
                getParticularCourseDetails={getParticularCourseDetails}
            />
        </SafeAreaView>
        </Provider>
    }
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
        top: 10
    },
    zeroQuestion: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
