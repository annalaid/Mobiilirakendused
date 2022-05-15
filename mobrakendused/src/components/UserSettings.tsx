import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserSettings() {
    const [text, setText] = useState<any | null>(null);

    const saveName = async () => {  // Implementing AsyncStorage to save the Name of the Calendar entry
        try {
            AsyncStorage.setItem("appData", text)
        } catch (err) {
            console.log(err);
        }
    }

    const getName = async () => {  // Getting the name of the Calendar entry
        try {
            const name = await AsyncStorage.getItem("appData");
            setText(name);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        getName();
    },[]);

    return (
        <View style={styles.userSettings}>
            
            <View style={{justifyContent: 'center'}}> 
                <Text style={styles.nameText}>Name:</Text>
                <TextInput
                    placeholder='Input Name'
                    onChangeText={value => setText(value)}
                    style={styles.nameInput}
                ></TextInput>
                <Text style={styles.nameText}>Age:</Text>
                <TextInput
                    placeholder='Age'
                    onChangeText={value => setText(value)}
                    style={styles.ageInput}
                ></TextInput>
            </View>
            <View>
                <Button title="Save name" onPress={saveName}></Button>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    userSettings: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 100,
        paddingHorizontal: 20
    },
    nameInput: {
        height: 50,
        borderColor: '#888',
        borderWidth: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
        textAlign: 'center',
        borderRadius: 8,
        fontSize: 16
    },
    ageInput: {
        height: 50,
        borderColor: '#888',
        borderWidth: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
        textAlign: 'center',
        borderRadius: 8,
        fontSize: 16,
        width: 100
    },
    nameText: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,
        fontWeight: 'bold',
    }
});