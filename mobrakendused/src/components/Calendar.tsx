import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import './StyleHF.css';
import Entry from '../types/Entry';

type Day = {
    entryList: Entry[],
    time: Date
};

/*
    TODO This list should come from data storage, for now its hardcoded
*/

const entryList: Entry[] = [
    {
        title: "Kristjan Jõekalda Loto kolmapäev",
        time: new Date(2022, 4, 7, 19, 0)
    },
    {
        title: "Homework: Inglisekeele ül. 1",
        time: new Date(2055, 4, 7),
        allDay: true
    },
    {
        title: "Kokkusaamine Teet Kääpaga",
        time: new Date(2022, 4, 11, 16, 15)
    },
    {
        title: "Homework: Inglisekeele ül. 2",
        time: new Date(2022, 4, 12, 16, 15)
    }
];

console.log(entryList);

export default function Calender() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const [dayList, setDayList] = useState<Day[]>([]);

    /*
    construct a displayable list out of entryList
    */

    useEffect(() => {
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
    }, [currentDate]);



    let addDaysToCurrentDate = (days: number) => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        setCurrentDate(date);
    }

    let onPressPreviousWeek = () => {
        addDaysToCurrentDate(-7);
    }

    let onPressNextWeek = () => {
        addDaysToCurrentDate(7);
    }

    let onPressCurrentWeek = () => {
        setCurrentDate(new Date());
    }

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
