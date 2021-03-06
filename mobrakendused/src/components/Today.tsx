import React, { useState, useEffect } from 'react';
import Entry from '../types/Entry'
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

type importType = { Title: string, Date: string, Time: string, allDay: boolean };

const Today = () => {
    const [storage, setStorage] = useState<importType[]>([]);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const formatMinutes = (minutes: number) => {        // Formatting the minute addition so single values would have a zero before them
        if (minutes < 10) {
            return "0" + minutes
        } else {
            return minutes
        }
    }

    // 1. useEffect for importing data from device storage
    useEffect(() => {
        const importData = async () => {                // Implementing AsyncStorage
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

        let entryList: Entry[] = [];
        let dateToday: any = new Date()
        dateToday = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
        // Converting to the correct formats and filtering out entries for current date
        try {                         
            storage.forEach(entry => {
                let entryDate;
                if (entry.Time !== undefined) {
                    entryDate = new Date(entry.Date + " " + entry.Time);
                }
                else {
                    entryDate = new Date(entry.Date);
                }
                
                if (entryDate.getDate() === dateToday.getDate() && entryDate.getMonth() === dateToday.getMonth() && entryDate.getFullYear() === dateToday.getFullYear()) {
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
    }, [storage]);

    if (isLoading) {
        return (<></>)
    } else {
        return (
            <View style={styles.calendarWrapper}>
                <View style={styles.calendarTitleListList}>
                    <View style={styles.calendarTitleList}>
                        <View style={styles.calendarTitle}>
                            <Text style={styles.calendarTitleText}>{new Date().toLocaleDateString("et-EE", {})}</Text>
                        </View>
                    </View>
                    <View style={styles.calendarTitleList}>
                        <View style={styles.calendarTitle}>
                            <Text style={styles.calendarTitleText}>Entry:</Text>
                        </View>
                        <View style={styles.calendarTitle}>
                            <Text style={styles.calendarTitleText}>Time:</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.calendarDayList}>
                    <View></View>
                    {entries.map((item, index) =>
                        <View style={index % 2 === 0 ? styles.calendarDay : [styles.calendarDay, styles.calendarDayHighlight]} key={index}>
                            <View style={styles.calendarDayEntryList}>
                                <View style={styles.calendarEntry}>
                                    <Text style={styles.calendarText}>
                                        {item.title}
                                    </Text>
                                </View>

                            </View>

                            <View style={styles.calendarDayInfo}>
                                {!item.allDay ?
                                    <Text style={styles.calendarText}>{item.time.getHours() + ":" + formatMinutes(item.time.getMinutes())}</Text> :
                                    <Text style={styles.calendarText}>All day</Text>
                                }
                            </View>
                        </View>

                    )}

                </View>
            </View>
        )
    }
}
export default Today;
