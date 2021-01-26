import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

const VideoUploadDialog = (props: any) => {
    const {visible, setVisible} = props;
    const hideDialog = () => setVisible(false);
    const handleUpload = () => {
        console.log('Uploaded')
        setVisible(false)
    }
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Upload Video</Dialog.Title>
                    <Dialog.Content>
                        <Text>This is simple dialog to Upload Video</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => console.log('Cancel')}>Cancel</Button>
                        <Button onPress={handleUpload}>Upload</Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
  container: {}
});

export default VideoUploadDialog;