import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import './StyleHF.css';

export default function Calender() {
    return (
        <View style={styles.calender}>
            <Text>Calender page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    calender: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1aa'
    }
});
