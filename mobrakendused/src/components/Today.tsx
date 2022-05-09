import React from 'react';
import './StyleHF.css';
import Entry from '../types/Entry'
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const Today = () => {
    let entries: Entry[] = [
        {title: "Homework: Inglisekeele ül. 1",
         time: new Date("2022.05.07"),
         allDay: true       
        },
        {title: "Kristjan Jõekalda Loto kolmapäev",
        time: new Date("2022.05.07 19:00")   
        }
    ];
    
    const formatMinutes = (minutes: number) => {
        if(minutes < 10){
            return "0" + minutes
        } else {
            return minutes
        }
    }

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

