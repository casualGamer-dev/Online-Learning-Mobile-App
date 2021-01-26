import React, {useState} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Button, Provider } from 'react-native-paper';
import SecondHeader from '../../../components/SecondHeader';
import BottomRightFab from '../components/TeacherBottomRightFab';
import Colors from '../../../utils/Color';
import VideoUploadDialog from './components/VideoUploadDialog';

const {width, height} = Dimensions.get('screen');
export const TeacherSavedVideo = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);
  const handleFiles = async () => {
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size
        );
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
    }
  }
  return (
    <Provider>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <SecondHeader 
          mainText='By Teacher Name'
          secondText='Last Updated on : 20th Jul 2020'
        />
        <View style={styles.mainBody}>
            <ScrollView style={{}}>
              <View style={styles.categoryBody}>

                <View style={styles.materialContent}>
                  <View style={styles.uploadSection}>
                    <Text style={styles.uploadText}>Want to upload ? </Text>
                    <Button onPress={() => setVisible(true)}>
                      Click Here
                    </Button>
                  </View>
                </View>
                <Button
                  onPress={handleFiles}
                  >
                  Click Here to Upload
                </Button>

              </View>
            </ScrollView>
        </View>
        <BottomRightFab
          backgroundColor={Colors.darkColor()}
          navigation={navigation}
        />
        <VideoUploadDialog visible={visible} setVisible={setVisible} />
      </SafeAreaView>
    </Provider>
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
});
