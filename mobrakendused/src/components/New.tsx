import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import './StyleHF.css';

interface myType {Title: string, Date: string, Time: string};

export default function New() {
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState<any | null>(null);
    const [date, setDate] = useState<any | null>(null);
    const [time, setTime] = useState<any | null>(null);
    const [mehh, setMehh] = useState<myType[] | null>(null);
    const [key, setCount] = useState(0);
    const setItemStorage = async (key: string, value: any) => {
        try {
            console.log(value);
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error){
            console.log("Error")
        }
    }

    function makeKey(length: number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    const saveStorage = () => {
        // Key is randomly generated, JSON object can be changed if needed in the future :)
        setItemStorage("id"+makeKey(6), {Title: title, Date: date, Time: time})
    }

    // Getting data
    
    const importData = async () => {
        const keyArray: any[] = [];
        const dataArray: myType[] = [];
        try {
            const keys:any = await AsyncStorage.getAllKeys()
            keys.forEach(async (element: string) => {
                    // correct data is sorted out by the "id" substring at the front of the keys
                    if(element.substring(0,2)==="id"){
                        keyArray.push(element);
                        let data = await AsyncStorage.getItem(element);
                        //console.log(data);
                        let Data: myType = JSON.parse(data || '{}');
                        //console.log(data);
                        dataArray.push(Data);
                        setCount(key + 1);
                        //console.log(key)
                    }
                }
            );

            setMehh(dataArray);
        } catch (error){
            console.log(error)
        }
    } 
    useEffect(()=> {
        importData()
        setIsLoading(false);
    },[]);
    console.log(mehh)
    //console.log(mehh![1].Date)
    
    /* const importData =async () => {
        try {
            
            const itemsArray:any = await AsyncStorage.multiGet(keys)
            let object:any = {};
            itemsArray.map((item: any[]) => {
            object[`${item[0]}`] = item[1]
        })
        return object
        } catch (error){
            console.log(error)
        }
    }
    const dataArray: myType[] = [];
    importData().then((value)=>{
        dataArray.push(value);  
    }) */
    // console.log(dataArray[1]);
    if (isLoading) {
        return (<div>Loading..</div>)
    } else {
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
                    <Button title="Save" onPress={saveStorage}></Button>
                    <Button title="test" onPress={()=>{console.log(mehh)}}></Button>
                </View>
                <View>
                    <Text>{title}</Text>
                    <Text>{date}</Text>
                    <Text>{time}</Text>
                    <Text>{}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    new: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1aa'
    }
});