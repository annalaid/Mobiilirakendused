import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity, TouchableNativeFeedback, Alert, Button, BackHandler } from "react-native"

export default function Today() {
    const [i, setI] = useState(1);
    let [j, setJ] = useState(1);
    let [colorr, setColor] = useState("red");
    function handleYes() {
        setI(i + 1);
    }
    function handleNo() {
        setI(i - 1);
    }
    function changeColor() {
        setColor("blue");
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>Meeldimiste arv:</Text>
            <Text style={styles.titleText} numberOfLines={1}>{i}</Text>
            <TouchableNativeFeedback onPress={() => Alert.alert("Tähtis küsimus", "Kas on kena leht?", [
                { text: "Jah", onPress: handleYes },
                { text: "Ei", onPress: handleNo },
            ])}>
                <View style={styles.container2}>
                    <Text style={styles.titleText}>Meeldi</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={{ backgroundColor: colorr }} onPress={changeColor}>
                <View style={{
                    backgroundColor: colorr,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200, height: 70
                }}>
                    <Text style={styles.titleText}>Nupp</Text>
                </View>
            </TouchableNativeFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    today: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff1'
    },
    container: {
        flex: 1,
        backgroundColor: '#adecf4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        backgroundColor: '#1ecbe1',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200, height: 70
    },
    logo: {
        width: 200,
        height: 200
    },
    titleText: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});