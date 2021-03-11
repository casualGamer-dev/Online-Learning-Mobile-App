import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { getData } from '../../AsyncActivities/getData';
import { AuthContext } from '../../Context';

export const StudentLiveClass = ({route, navigation}: any) => {
  const video_id = route.params.video_id;
  const {user} = useContext(AuthContext);
  const userDetails = getData('extra')
  const [name, setName] = useState('');

  userDetails
    .then(allDetails => {
      if(allDetails) setName(allDetails.name)
      else setName('Admin')
    })
    .catch(err => Alert.alert('ERROR', 'Error in ProfileHome'));

  console.log('ID', video_id)

  useEffect(() => {
    setTimeout(() => {
      const url = `https://meet.jit.si/${video_id}`;
      const userInfo = {
        displayName: name || 'User',
        email: user.email || 'info@padhai.com',
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
      JitsiMeet.call(url, userInfo);
    }, 1000);
  }, [])

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  const onConferenceTerminated = (nativeEvent) => {
    /* Conference terminated event */
    console.log(nativeEvent)
    navigation.goBack();
  }

  const onConferenceJoined = (nativeEvent) => {
    /* Conference joined event */
    console.log(nativeEvent)
  }

  const onConferenceWillJoin = (nativeEvent) => {
    /* Conference will join event */
    console.log(nativeEvent)
  }
  return (
    <JitsiMeetView
      onConferenceTerminated={() => navigation.goBack()}
      onConferenceJoined={e => onConferenceJoined(e)}
      onConferenceWillJoin={e => onConferenceWillJoin(e)}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
    />
  )
}