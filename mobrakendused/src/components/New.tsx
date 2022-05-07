import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import './StyleHF.css';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name:'MainDB',
        location:'default'
    }, 
    () => {},
    error => { console.log(error) }
)



export default function New() {
    const [title, setTitle] = useState<any | null>(null);
    const [date, setDate] = useState<any | null>(null);
    const [time, setTime] = useState<any | null>(null);
    
    useEffect(() => {
        createTable();
    },[]);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Entries "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Date TEXT, Time TEXT);"
            )
        })
    }

    const setData = async () => {
        try {
            db.transaction((tx)=>{
                tx.executeSql(
                    "INSERT INTO Entries (Title, Date, Time) VALUES (?,?,?)",
                    [title, date, time]
                );
            });
            // Navigate to main page
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.new}>
            <View style={{justifyContent: 'center'}}> 
                <Text>Title:</Text>
                <TextInput
                    placeholder='Title'
                    onChangeText={titleValue => setTitle(titleValue)}
                ></TextInput>
                <Text>Date:</Text>
                <TextInput
                    placeholder='Date'
                    onChangeText={dateValue => setDate(dateValue)}
                ></TextInput>
                <Text>Time:</Text>
                <TextInput
                    placeholder='Time'
                    onChangeText={timeValue => setTime(timeValue)}
                ></TextInput>
            </View>
            <View style={{marginTop: 40}}>
                <Button title="Save" onPress={setData}></Button>
            </View>
            <View>
                <Text>{title}</Text>
                <Text>{date}</Text>
                <Text>{time}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    new: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1aa'
    }
});