import React, {useContext} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../../../utils/Color';
import { AuthContext } from '../../../../Context';

const LiveClassDialoge = (props: any) => {
    const {visible, setVisible, singleSubjectDetails, getLiveClass, setLoading} = props;
    const hideDialog = () => setVisible(false);
    const {user} = useContext(AuthContext)
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Go Live Now</Dialog.Title>
                    <Dialog.Content>
                        <Formik
                            initialValues={{
                                name: '',
                                subject_id: singleSubjectDetails.subject_id,
                                video_id: '',
                                batch_id: singleSubjectDetails.batch_id,
                                subject_name: singleSubjectDetails.subject_name,
                                teacher_id: user.uid
                            }}
                            onSubmit={values => {
                                if(values.name === '' || values.subject_id === '' || values.video_id === '') {
                                    Alert.alert('Warning', 'Please enter all the values');
                                    return;
                                } else {
                                    setLoading(true)
                                    console.log(values)
                                    try {
                                        firestore()
                                            .collection('live_now')
                                            .add(values)
                                            .then(() => {
                                                values.name=''
                                                values.video_id=''
                                                setVisible(false)
                                                Alert.alert('Success','Live Started Successfully!', 
                                                [
                                                    {
                                                    text: "DONE",
                                                    onPress: () => getLiveClass(),
                                                    style: "cancel"
                                                    }
                                                ],
                                                { cancelable: false }
                                                )
                                            })
                                            .catch(e => console.log(e));   
                                    } catch (error) {
                                        Alert.alert('ERROR', 'Internal Server Error!')
                                        console.log('LIVE',error)
                                    }
                                    setLoading(false)
                                }
                            }}
                        >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInput
                                keyboardType="default"
                                label="Give a Title"
                                multiline={true}
                                numberOfLines={2}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={styles.answerInput}
                            />
                            <TextInput
                                keyboardType="default"
                                label="Enter Meeting ID"
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={handleChange('video_id')}
                                onBlur={handleBlur('video_id')}
                                value={values.video_id}
                                style={styles.answerInput}
                            />
                            <Button 
                                mode="contained"
                                onPress={handleSubmit}
                                style={styles.btn}
                            >
                                Start Live
                            </Button>
                        </View>
                        )}
                        </Formik>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
  container: {},
  answerInput: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 15
},
btn: {
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: Colors.extremeBlue()
}
});

export default LiveClassDialoge;