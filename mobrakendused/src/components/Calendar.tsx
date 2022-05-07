import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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
        time: new Date("2022.05.07 19:00")
    },
    {
        title: "Homework: Inglisekeele ül. 1",
        time: new Date("2022.05.07"),
        allDay: true
    },
    {
        title: "Kokkusaamine Teet Kääpaga",
        time: new Date("2022.05.11 16:15")
    },
    {
        title: "Homework: Inglisekeele ül. 2",
        time: new Date("2022.05.12 16:15")
    }
];

/*
    construct a displayable list out of entryList
*/

let dayList: Day[] = [];

for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    dayList.push({
        entryList: [],
        time: date
    })
}

entryList.forEach(entry => {
    dayList.forEach(day => {
        if (day.time.getDate() == entry.time.getDate()) {
            day.entryList.push(entry)
        }
    });
});

/*
console.log(entryList);
console.log(dayList);
*/

export default function Calender() {
    return (
        <View style={styles.overhead}>
            <View style={styles.titleList}>
                <View style={styles.titleText}>
                    <Text style={styles.text}>
                        {new Date().toLocaleDateString("et-EE", { month: "long" })}
                    </Text>
                </View>
                <View style={styles.titleButton}>
                    <Button title={"new entry"} >

                    </Button>
                </View>
            </View>
            
            <View style={styles.dayList}>
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
                            {day.time.toLocaleDateString("et-EE", { })}
                        </Text>
                    </View>
                </View>
                )}
            </View>
        </View>
    );
}

let colorMain = "#06c"
let colorSecond = "#666"
let colorText = "#ccc"

const styles = StyleSheet.create({
    overhead: {
        flexDirection: "column",
        backgroundColor: colorMain        
    },
    dayList: {
        flexDirection: "column",
        paddingBottom: "0.25em",        
        backgroundColor: colorText
    },
    day: {        
        flexDirection: "row",
        marginTop: "0.25em",        
    },
    dayEntryList: {
        flex: 9,
        flexDirection: "column",
        backgroundColor: colorSecond
    },
    entry: {
        marginVertical: "0.25em"
    },
    dayInfo: {
        flex: 3,
        flexDirection: "column",
        marginLeft: "0.25em",
        backgroundColor: colorSecond
    },
    text: {
        paddingHorizontal: "1em",
        marginVertical: "0.25em",
        color: colorText,
        fontSize: 24
    },
    titleList: {
        flexDirection: "row",
        paddingVertical: "1em",
    },
    titleText: {
        flex: 9,
    },
    titleButton: {
        flex: 3,    
        marginVertical: "0.25em",        
    }
});
