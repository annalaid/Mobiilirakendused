import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import Entry from '../types/Entry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';


type importType = { Title: string, Date: string, Time: string };
type Day = {
    entryList: Entry[],
    time: Date
};

const entryList: Entry[] = [];

export default function Calender() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dayList, setDayList] = useState<Day[]>([]);
    const [storage, setStorage] = useState<importType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. useEffect for importing data from device storage
    useEffect(() => {
        const importData = async () => {
            entryList.splice(0, entryList.length);      // Prevents stacking of data
            const keyArray: any[] = [];
            const dataArray: importType[] = [];
            try {
                const keys: any = await AsyncStorage.getAllKeys()
                keys.forEach(async (element: string) => {
                    // correct data is sorted out by the "id" substring at the front of the keys
                    if (element.substring(0, 2) === "id") {
                        keyArray.push(element);
                        let data = await AsyncStorage.getItem(element);
                        let Data: importType = JSON.parse(data || '{}');
                        dataArray.push(Data);
                    }

                }
                );
                setStorage(dataArray);
            } catch (error) {
                console.log(error)
            }
        }

        importData();


    }, [])

    // 2. useEffect for processing data
    useEffect(() => {
        // Importing stored data into the entryList array
        try {
            storage.forEach(entry => {
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

        let dayList: Day[] = [];

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
        setIsLoading(false);
    }, [currentDate, entryList, storage]);

    // Traversing weeks:
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
            <View style={styles.calendarWrapper}>
                <View style={styles.calendarTitleListList}>
                    <View style={styles.calendarTitleList}>
                        <View style={styles.calendarTitle}>
                            <Text style={styles.calendarTitleText}>
                                {new Date().toLocaleDateString("et-EE", { weekday: "long" })}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.calendarTitleList}>
                        <View style={styles.calendarTitle}>
                            <Button title={"eelmine"} onPress={onPressPreviousWeek} >

                            </Button>
                        </View>
                        <View style={styles.calendarTitle}>
                            <Text style={styles.calendarTitleText} onPress={onPressCurrentWeek}>
                                {currentDate.toLocaleDateString("et-EE", {})}
                            </Text>
                        </View>
                        <View style={styles.calendarTitle}>
                            <Button title={"j??rgmine"} onPress={onPressNextWeek} ></Button>
                        </View>
                    </View>
                </View>

                <View style={styles.calendarDayList}>
                    {dayList.map((day, index) =>
                        <View style={index % 2 === 0 ? styles.calendarDay : [styles.calendarDay, styles.calendarDayHighlight]} key={index}>
                            <View style={styles.calendarDayEntryList}>
                                {day.entryList.map((entry, index) =>
                                    <View style={styles.calendarEntry} key={index}>
                                        <Text style={styles.calendarText}>{entry.title}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.calendarDayInfo}>
                                <Text style={styles.calendarText}>
                                    {day.time.toLocaleDateString("et-EE", { weekday: "long" })}
                                </Text>
                                <Text style={styles.calendarText}>
                                    {day.time.toLocaleDateString("et-EE", { /* hour: "2-digit", minute: "2-digit"  */ })}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
