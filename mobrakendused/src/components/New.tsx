import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigate  } from "react-router-dom";
import './StyleHF.css';

export default function New() {
    const [title, setTitle] = useState<any | null>();
    const [date, setDate] = useState<any | null>();
    const [time, setTime] = useState<any | null>();
    const [allDay, setAllDay] = useState<any | null>(false);
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    const setItemStorage = async (key: string, value: any) => {         // Data is saved into storage via randomly generated key
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error){
            console.log("Error")
        }
    }

    const handleChange = () => { 
        allDay ? setAllDay(false) : setAllDay(true); 
      };

    function makeKey(length: number) {                                  // Random key generator
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    const saveStorage = () => {                                         // Data gets saved and user gets routed back to Calender
        if(!title || !date){
            setError("Some fields are unfilled!");
        } else {
            if(!allDay && !time){
                setError("Some fields are unfilled!");
            } else {
                setItemStorage("id"+makeKey(6), {Title: title, Date: date, Time: time, allDay: allDay});
                navigate('/Calendar'); 
            }
        }
    }

    let array = [0];
    let timeContainer =array.map((i)=>{                                 // Time container toggled by the checkbox
        return (
            <View>
                <Text>Time:</Text>
                <input type="time" onChange={timeValue => setTime(timeValue.target.value)}></input>
            </View>
        )
    })

    return (
        <View style={styles.new}>
            <View style={{justifyContent: 'center'}}> 
                <Text>Title:</Text>
                <TextInput
                    placeholder='Title'
                    onChangeText={titleValue => setTitle(titleValue)}
                ></TextInput>
                <Text>Date:</Text>
                <input type="date" value={date} onChange={dateValue => {setDate(dateValue.target.value)}}></input>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <Text>All day:</Text>
                    </View>   
                    <View style={{flex:1}}>
                        <input type="checkbox" onChange={handleChange} />
                    </View> 
                </View>   
                {!allDay ? timeContainer : null}
                </View>

            <View style={{marginTop: 40}}>
                <Button title="Save" onPress={saveStorage}></Button>
            </View>
            <Text style={{fontSize:16, color:"#e51a3b"}}>{error}</Text>
        </View>
    );
    }


const styles = StyleSheet.create({
    new: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});