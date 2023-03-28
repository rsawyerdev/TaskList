import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, Card } from 'react-native-paper';

export default function Task(props) {

    return (
        <View style={styles.taskContainer}>
            <Card style={styles.card}>
                <Text style={styles.cardText}>{props.title}</Text>
            </Card>
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        paddingVertical: 5,
        paddingHorizontal: 2

    },
    card: {
        minHeight: 50,
        minWidth: 250,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingVertical: 10
    },
    cardText: {
        fontSize: 18,
    }
})