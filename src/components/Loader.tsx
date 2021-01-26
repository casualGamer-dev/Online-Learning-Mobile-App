import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../utils/Color';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.darkBlue()} />
      <Text style={{textAlign: 'center'}}>Loading...</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});
