import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MaterialMenu from '../components/MaterialMenu';
import Colors from '../utils/Color';

const LectureMaterial = (props: any) => {
  return (
    <>
        <View style={{padding: 15, paddingBottom: 0}}>
            <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 12, fontWeight: '600'}}>20th May 2020</Text>
            </View>
            <View style={styles.materialContent}>
                <MaterialMenu />
                <MaterialMenu />
                <MaterialMenu />
            </View>
        </View>

        <View style={{padding: 15, paddingBottom: 0}}>
            <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 12, fontWeight: '600'}}>20th May 2020</Text>
            </View>
            <View style={styles.materialContent}>
                <MaterialMenu />
                <MaterialMenu />
                <MaterialMenu />
            </View>
        </View>

    </>
  );
};

export default LectureMaterial;

const styles = StyleSheet.create({
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
});
