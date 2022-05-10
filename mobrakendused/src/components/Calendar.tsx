import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import './StyleHF.css';
import Entry from '../types/Entry';
import AsyncStorage from '@react-native-async-storage/async-storage';


type myType = {Title: string, Date: string, Time: string};
type Day = {
    entryList: Entry[],
    time: Date
};

const entryList: Entry[] = [];

export default function Calender() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dayList, setDayList] = useState<Day[]>([]);
    
    const [mehh, setMehh] = useState<myType[] | null>(null);
    const [key, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    /*
    construct a displayable list out of entryList
    */
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

    useEffect(() => {
        let dayList: Day[] = [];

        importData();

        try {
            mehh.forEach(entry => {
                entryList.push(
                    {
                    title: entry.Title,
                    time: new Date(entry.Date)
                }
                )
            })
        } catch (err) {
            console.log(err);
        }
         
        
        // 1/2 pre-populating is necessary to only show tasks of the current week
        for (let i = 1; i < 8; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - date.getDay() + i);

            dayList.push({
                entryList: [],
                time: date
            })
        }

        // 2/2 only tasks that match with pre-populated days are used
        entryList.forEach(entry => {
            dayList.forEach(day => {
                let d = day.time;
                let e = entry.time;
                if (d.getFullYear() === e.getFullYear() &&
                    d.getMonth() === e.getMonth() &&
                    d.getDate() === e.getDate()) {
                    day.entryList.push(entry)
                }
            });
        });

        

        setDayList(dayList);

        
        setTimeout(() => {
            setIsLoading(false);
          }, 1000);
    }, [currentDate, entryList]);
    
    
    console.log(mehh)

    let addDaysToCurrentDate = (days: number) => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        setCurrentDate(date);
    }

    let onPressPreviousWeek = () => {
        entryList.splice(0, entryList.length);      // Prevents stacking of data
        addDaysToCurrentDate(-7);
    }

    let onPressNextWeek = () => {
        entryList.splice(0, entryList.length);
        addDaysToCurrentDate(7);
    }

    let onPressCurrentWeek = () => {
        entryList.splice(0, entryList.length);
        setCurrentDate(new Date());
    }
    if (isLoading) {
        return (<></>)
    } else {
    return (
        <View style={styles.overhead}>
            <View style={styles.titleList}>
                <View style={styles.titleTitle}>
                    <Text style={styles.text}>
                        {new Date().toLocaleDateString("et-EE", { weekday: "long" })}
                    </Text>
                </View>
                <View style={styles.titleButton}>
                    <Button title={"uus kirje"} >

                    </Button>
                </View>
            </View>
            <View style={styles.titleList}>
                <View style={styles.titleButton}>
                    <Button title={"eelmine"} onPress={onPressPreviousWeek} >

                    </Button>
                </View>
                <View style={styles.titleText}>
                    <Text style={styles.text} onPress={onPressCurrentWeek}>
                        {currentDate.toLocaleDateString("et-EE", {})}
                    </Text>
                </View>
                <View style={styles.titleButton}>
                    <Button title={"järgmine"} onPress={onPressNextWeek} >

                    </Button>
                </View>
            </View>

            <ScrollView style={styles.dayList}>
                {dayList.map(day =>
                    <View style={styles.day}>
                        <View style={styles.dayEntryList}>
                            {day.entryList.map(entry =>
                                <View style={styles.entry}>
                                    <Text style={styles.text}>{entry.title}</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.dayInfo}>
                            <Text style={styles.text}>
                                {day.time.toLocaleDateString("et-EE", { weekday: "long" })}
                            </Text>
                            <Text style={styles.text}>
                                {day.time.toLocaleDateString("et-EE", {})}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
    }
}

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
        textAlign: "center"
    },
    titleButton: {
        flex: 4,
        marginVertical: "0.25em",
    }
});
