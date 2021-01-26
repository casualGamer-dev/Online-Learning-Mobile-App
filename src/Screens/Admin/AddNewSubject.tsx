import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const AddNewSubject = () => {
      // useEffect(() => {
  //   firestore()
  //     .collection('subject_details')
  //     .add({
  //       batch_id: 125,
  //       teacher_id: 156,
  //       subject_name: 'abcd'
  //     })
  //     .then(() => {
  //       console.log('DONE')
  //     })
  //     .catch((error) => console.log(error));
  // });
  return (
    <View style={styles.container}>
      <Text>AddNewSubject</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {}
});
