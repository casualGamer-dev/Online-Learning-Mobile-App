import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = (props) => {
    // const {url} = props;
    return (
        <View style={styles.container}>
          <WebView source={{ uri: 'https://www.youtube.com/watch?v=fawmSjP-7Wg' }} />
        </View>
    );
};

export default WebViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
