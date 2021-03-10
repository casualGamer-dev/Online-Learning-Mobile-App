import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'; 
import RNFetchBlob from 'rn-fetch-blob';
import { getCurrentDate, idGenerator } from '../../../utils/Utilities';
import Colors from '../../../utils/Color';
import { getData } from '../../../AsyncActivities/getData';
import { AuthContext } from '../../../Context';

const ExamDetailDesc = (props: any) => {
    const {visible, setVisible, setLoading, assignmentDetails, navigation} = props;
    const {user} = useContext(AuthContext)
    const [studentInfo, setStudent] = useState({});
    const [assignmentSubmitted, setAssignmentSubmitted] = useState<any>();
    const hideDialog = () => setVisible(false);

    console.log(assignmentDetails)

    const getStudentData = async () => {
      const studentDetails = await getData('extra')
      setStudent(studentDetails)
    }

    useEffect(() => {
      getStudentData()
    }, []);

    const handleFiles = async () => {
        try {
            setLoading(true)
            const file = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            const path = await normalizePath(file.uri);
            const result = await RNFetchBlob.fs.readFile(path, 'base64');
            await uploadFileToFirebaseStorage(result, file);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              console.log('CANCEL BY USER')
              setLoading(false)
            } else {
                setLoading(false)
                Alert.alert('ERROR', 'In Upload File Dialog Box');
                throw err;
            }
        }
    }

    const uploadFileToFirebaseStorage = async(result, file) => {
        const uploadTask = storage()
            .ref(`${assignmentDetails.subject_id}/exams/${assignmentDetails.assignment_id}/${file.name}`)
            .putString(result, 'base64', {contentType: file.type});

        uploadTask.on('state_changed', 
            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                Alert.alert('ERROR', 'There is a problem while uploading the file')
                console.log(error)
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                // Add Data to Firestore DB
                //   file: downloadURL, file
                storeDataToDatabase(downloadURL)
            });
        });
    }

    const normalizePath = async (path) => {
        if(Platform.OS === 'ios' || Platform.OS === 'android') {
            const filePrefix = 'file://';
            if(path.startsWith(filePrefix)) {
                try{
                    path = path.substring(filePrefix.length)
                } catch(e) {
                    console.log('ERROR IN NORMALIZE FUNC, MATERIALUPLOADDIALOG',e)
                    Alert.alert('ERROR', 'FILE ISSUE');
                }
            } 

        }
        return path;
    }

    const storeDataToDatabase = (url) => {
        firestore()
            .collection('submitted_exams')
            .add({
                exam_id: assignmentDetails.exam_id,
                file_url: url,
                student_name: studentInfo.name,
                roll_number: studentInfo.roll_number,
                uid: user.uid
            })
            .then(() => {
                setVisible(false)
                setLoading(false)
                Alert.alert('Success', 'Solution Uploaded');
            })
            .catch(e => {
                setVisible(false)
                setLoading(false)
                Alert.alert('ERROR', 'Error in Uploading the Data to DB');
                console.log(e)
            });
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Upload Solution</Dialog.Title>
                    <Dialog.Content>
                        <View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Button
                                    style={styles.uploadBtn}
                                    onPress={() => {
                                        setVisible(false)
                                        navigation.navigate('WebViewComponent', {
                                            url: assignmentDetails.file_url
                                        })}
                                    }
                                    >
                                    <Text style={{color: Colors.darkBlue()}}>
                                        View Exam Question
                                    </Text>
                                </Button>
                            </View>
                            <Text></Text>
                            <Button 
                                onPress={handleFiles} 
                                mode="contained"
                                style={styles.submitBtn}
                                >
                                <Text>Choose And Auto Upload</Text>
                            </Button>
                        </View>
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
    textInputStyle: {
        borderTopRightRadius: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    submitBtn: {
        position: 'relative',
        bottom: 0,
        backgroundColor: Colors.darkBlue(),
        height: 40,
        borderRadius: 5,
    },
    chooseFileStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    uploadBtn: {
        paddingLeft: 15,
        position: 'relative',
        left: -25
    },
});

export default ExamDetailDesc;
