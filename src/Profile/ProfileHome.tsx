import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions, Alert, Text } from 'react-native';
import { Button } from 'react-native-paper';
import CommonHeader from '../components/StudentCommonHeader';
import SecondHeader from '../components/SecondHeader';
import ProfileTop from './components/ProfileTopSection';
import SummarySectionTeacher from './components/SummarySectionTeacher';
import AboutMe from './components/AboutMe';
import DegreeSection from './components/DegreeSection';
import Colors from '../utils/Color';
import UserFab from './components/UserFab';
const {width, height} = Dimensions.get('screen');
import { AuthContext } from '../Context';
const ProfileHome = ({navigation}: any) => {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          back={false}
          backgroundColor={Colors.darkBlue()}
          title="My Profile"
          fontColor={Colors.appWhite()}
          navigation={navigation}
        />
        <SecondHeader 
          blank={true}
        />
        <View style={styles.mainBody}>
            <ScrollView style={{}}>
              <View style={styles.categoryBody}>
                <ProfileTop />
                <SummarySectionTeacher />
                <AboutMe />
                <Button onPress={() => signOut()}>
                  <Text>LOGOUT</Text>
                </Button>
                {/* <DegreeSection /> */}
              </View>
            </ScrollView>
        </View>
        <UserFab 
          backgroundColor={Colors.headerBlue()}
          navigation={navigation}
        />
      </SafeAreaView>
    </>
  );
};

export default ProfileHome;

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
    backgroundColor: Colors.white(), 
    borderTopRightRadius: 30, 
    position: 'relative', 
    top: -30
  },
  categoryBody: {
    marginTop: 25, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
});
