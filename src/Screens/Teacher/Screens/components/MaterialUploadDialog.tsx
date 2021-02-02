import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';

const MaterialUploadDialog = (props: any) => {
    const {visible, setVisible, loading, setLoading, subject_details} = props;
    const hideDialog = () => setVisible(false);

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
            } else {
              throw err;
            }
        }
    }

    const uploadFileToFirebaseStorage = async(result, file) => {
        const uploadTask = storage()
            .ref(`allFiles/${file.name}`)
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
                storeDataToDatabase(downloadURL, file)
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

    const storeDataToDatabase = (url, file) => {
        firestore()
            .collection('saved_material')
            .add({
                subject_id: subject_details.subject_id,
                subject_name: subject_details.subject_name,
                file_name: file.name,
                file_url: url
            })
            .then(() => {
                setVisible(false)
                setLoading(false)
                Alert.alert('Success', 'File Uploaded');
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
                <Dialog.Title>Upload File</Dialog.Title>
                    <Dialog.Content>
                        <Text>This is simple dialog to Upload</Text>
                        <Button 
                            onPress={handleFiles}
                        >Click Here</Button>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
  container: {}
});

export default MaterialUploadDialog;