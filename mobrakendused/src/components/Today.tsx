import React, { useState, useEffect } from 'react';
import './StyleHF.css';
import Entry from '../types/Entry'
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type importType = {Title: string, Date: string, Time: string, allDay: boolean};

const Today = () => {
    const [storage, setStorage] = useState<importType[]>([]);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const formatMinutes = (minutes: number) => {
        if(minutes < 10){
            return "0" + minutes
        } else {
            return minutes
        }
    }
    useEffect(()=>{
        const importData = async () => {
                const keyArray: any[] = [];
                const dataArray: importType[] = [];
                try {
                    const keys:any = await AsyncStorage.getAllKeys()
                    keys.forEach(async (element: string) => {
                            // correct data is sorted out by the "id" substring at the front of the keys
                            if(element.substring(0,2)==="id"){
                                keyArray.push(element);
                                let data = await AsyncStorage.getItem(element);
                                let Data: importType = JSON.parse(data || '{}');
                                dataArray.push(Data);
                            }
                        }
                    );
                    setStorage(dataArray);

                    
                } catch (error){
                    console.log(error)
                }
            } 
        
        importData();
    },[])
    useEffect(()=>{
        let entryList: Entry[] = [];
        let dateToday: any = new Date()
        dateToday = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
        try {
            storage.forEach(entry => {
                let entryDate:any = entry.Date + " " + entry.Time
                entryDate = new Date(entryDate);
                if( entryDate.getDate() === dateToday.getDate() && entryDate.getMonth() === dateToday.getMonth() && entryDate.getFullYear() === dateToday.getFullYear() ){
                    entryList.push(
                        {
                        title: entry.Title,
                        time: new Date(entryDate),
                        allDay: entry.allDay
                        }
                    )
                }
                
            })
            setEntries(entryList);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    },[storage]);
    
    if(isLoading) {
        return (<></>)
    } else {
        return(
            <View style={styles.overhead}>
                <View style={styles.titleList}>
                    <View style={styles.titleTitle}>
                        <Text style={styles.titleText}>Entry:</Text>
                        <Text style={styles.titleText}>{new Date().toLocaleDateString("et-EE", { })}</Text>
                        <Text style={styles.titleText}>Time:</Text>
                    </View>
                    
                </View>
                <ScrollView style={styles.dayList}>
                    <View></View>
                    {entries.map((item,index) => 
                        <View style={styles.day} key={index}>
                            <View style={styles.dayEntryList}>
                                <View style={styles.entry}>
                                    <Text style={styles.text}>
                                        {item.title}
                                    </Text>
                                </View>

                            </View>

                            <View style={styles.dayInfo}>
                                {!item.allDay ? 
                                <Text style={styles.text}>{item.time.getHours()+ ":" + formatMinutes(item.time.getMinutes()) }</Text> : 
                                <Text style={styles.text}>All day</Text>
                                }
                            </View>
                        </View>

                    )}
                    
                </ScrollView>
            </View>
        ) 
    }
}
export default Today;

let colorMain = "#06c"
let colorSecond = "#666"
let colorText = "#ccc"

const styles = StyleSheet.create({
    overhead: {
        flexDirection: "column",
        backgroundColor: colorMain,
        marginBottom: "80px"
    },
    dayList: {
        flexDirection: "column",
        paddingBottom: "0.25em",
        backgroundColor: colorText,
        marginTop: "1em"
    },
    day: {
        flexDirection: "row",
        marginTop: "0.25em",
    },
    dayEntryList: {
        flex: 8,
        flexDirection: "column",
        backgroundColor: colorSecond
    },
    entry: {
        marginVertical: "0.25em"
    },
    dayInfo: {
        flex: 4,
        flexDirection: "column",
        marginLeft: "0.25em",
        backgroundColor: colorSecond
    },
    text: {
        paddingHorizontal: "1em",
        marginVertical: "0.25em",
        color: colorText,
        fontSize: 16
    },
    titleList: {
        flexDirection: "row",
        paddingTop: "1em",
    },
    titleTitle: {
        flex: 8,
        flexDirection: "row",
    },
    titleText: {
        flex: 4,
        justifyContent: "center",
        textAlign: "center",
        color: colorText,
        fontSize: 25
        
    },
    titleButton: {
        flex: 4,
        marginVertical: "0.25em",
    }
});

