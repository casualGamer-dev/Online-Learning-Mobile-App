import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Menu} from 'react-native-paper';
import CustomIcon from 'react-native-vector-icons/Entypo';
import Colors from '../utils/Color';

const MaterialMenu = () => {
    const [menu, toggle] = useState(false);
    return (
    <>
        <View style={styles.mainBody}>
            <View style={styles.mainRow}>
                <Text>Hello World!</Text>
                <Menu
                    anchor={
                        <CustomIcon
                            name='dots-three-vertical'
                            size={18}
                            color={Colors.extremeBlue()}
                            onPress={() => toggle(!menu)}
                        />
                    }
                    visible={menu}
                    onDismiss={() => {
                      toggle(!menu);
                    }}>
                    <Menu.Item
                      onPress={() => {
                        toggle(!menu);
                      }}
                      title="View"
                    />
                    <Menu.Item
                      onPress={() => {
                        toggle(!menu);
                      }}
                      title="Download"
                    />
                </Menu>
            </View>
        </View>
    </>
  );
};

export default MaterialMenu;

const styles = StyleSheet.create({
    mainBody: {
        paddingBottom: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: Colors.appWhite(),
        paddingTop: 15
    },
    mainRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    }
});
