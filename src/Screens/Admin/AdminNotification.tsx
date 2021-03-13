import React, {useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, List } from 'react-native-paper';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import TextField from '../../components/TextInput';
import Loader from '../../components/Loader';
import {getCurrentDate} from '../../utils/Utilities';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const AdminNotification = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [allTeacher, setAllTeacher] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => setExpanded(!expanded);

    return (
        <>
        {loading ? (
        <Loader />
        ) : (
        <KeyboardAvoidingView>
            <SafeAreaView style={styles.container}>
                <CommonHeader
                    back={true}
                    backgroundColor="#4B83F2"
                    title="Send A Notification"
                    fontColor={'#F2F2F2'}
                    navigation={navigation}
                    bookmark={true}
                    notification={true}
                />
                <SecondHeader 
                    blank={true}
                />
                <View style={styles.mainBody}>
                    <View style={{marginTop: 20}}>
                    <View style={ styles.FormArea }>
                    <>
                        {/* FORM BODY */}
                        <Formik
                        initialValues={{
                            target: '',
                            notification_title: '',
                            notification_body: '',
                            date: getCurrentDate(),
                        }}
                        onSubmit={async (values) => {
                        try{
                        if(values.target === '' || values.notification_title === '' || values.notification_body === '') {
                            Alert.alert('Warning', 'Empty Field')
                        } else {
                            // console.log(values)
                            firestore()
                            .collection('notification')
                            .add(values)
                            .then(() => {
                                Alert.alert('Done', 'Notification Added Successfully!')
                            })
                            .catch((error) => {
                                console.log(error)
                                Alert.alert('ERROR', 'Send Notification')
                            });
                        }
                        } catch(e) {
                        console.log(e)
                        }
                    }}>
                    {({handleChange, handleSubmit, setFieldValue, values}) => (
                        <View>
                            <View>
                                <List.Section>
                                    <List.Accordion
                                        title="Select a Target"
                                        expanded={expanded}
                                        onPress={handlePress}
                                    >
                                    <List.Item 
                                        key={101} 
                                        title={'teacher'} 
                                        onPress={() => {
                                            values.target = 'teacher'
                                            console.log(values.target)
                                            handlePress()
                                        }}
                                    />
                                    <List.Item 
                                        key={102} 
                                        title={'student'} 
                                        onPress={() => {
                                            values.target = 'student'
                                            console.log(values.target)
                                            handlePress()
                                        }}
                                    />
                                    </List.Accordion>
                                </List.Section>

                                <TextField
                                    disabled={true}
                                    label="Target"
                                    value={values.target}
                                    style={styles.inputBackground}
                                />

                                <TextField
                                    label="Notification Title"
                                    handleChange={handleChange('notification_title')}
                                    value={values.notification_title}
                                    style={styles.inputBackground}
                                />

                                <TextField
                                    label="Notification Body"
                                    multiline={true}
                                    handleChange={handleChange('notification_body')}
                                    value={values.notification_body}
                                    style={styles.inputBackground}
                                />
                            </View>
                            <View>
                                <Button
                                    mode="contained"
                                    onPress={handleSubmit}
                                    style={styles.btn}>
                                    <Text style={styles.btnText}>Send Now</Text>
                                </Button>
                            </View>
                        </View>
                    )}
                    </Formik>
                </>
                </View>
                </View>
            </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
    )}
    </>
    );
};

const styles = StyleSheet.create({
  container: {},
  mainBody: {
    width,
    minHeight: height * .85, 
    backgroundColor: Colors.F9Background(), 
    borderTopRightRadius: 30, 
    position: 'relative', 
    top: -30,
    paddingLeft: 15,
    paddingRight: 15
  },
  submitBody: {},
  btn: { 
    backgroundColor: '#28AAD8', 
    width: width*.92, 
    borderRadius: 10,
    height: 45,
    marginTop: '10%',
    shadowColor: "#28AAD8",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    textTransform: 'uppercase',
    paddingLeft: '42.5%',
  },
  FormArea: {
    width: width - 30,
  },
  FormContent: {
    marginBottom: '1.5%',
  },
  accountText: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 16,
  },
  inputBackground: {
    backgroundColor: Colors.F9Background()
  },
});
