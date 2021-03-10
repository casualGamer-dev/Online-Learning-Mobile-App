import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const StudentLiveClass = ({route, navigation}: any) => {
    const video_id = route.params.video_id;
    const [loading, setLoading] = useState(false);
    const [thumbnailURL, setThumbnail] = useState<any>();
    const [videoURL, setVideoURL] = useState<any>();
    const [video, setVideo] = useState<any>();
    console.log('ID', video_id)

    const getMp4 = () => {
        fetch(`https://player.vimeo.com/video/${video_id}/config`)
        .then(res => res.json())
        .then(res => {
            setThumbnail(res.video.thumbs['640'])
            setVideoURL(res.request.files.hls.cdns[res.request.files.hls.default_cdn].url)
            setVideo(res.video)
        });
    }


    useEffect(() => {
        setLoading(true)
        // getMp4()
        setLoading(false)
    },[]);

    return (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                x={true}
                notification={true}
                backgroundColor={Colors.headerBlue()}
                title="Live Class"
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                blank={true}
            />
            <View style={styles.mainBody}>
                <WebView source={{ uri: `https://video-call-padhai.herokuapp.com/${video_id}` }} />
            </View>
        </SafeAreaView>
        </>
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
        marginTop: 25, 
        paddingLeft: 15, 
        paddingRight: 15,
        marginBottom: 130
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
