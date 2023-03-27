import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function AddTask() {

    const [taskText, updateText] = useState('')

    const addTask = () => {
        console.log("Add a task", taskText)
    }

    return (
        <View style={styles.addTaskContainer}>
            <TextInput 
            right={<TextInput.Icon icon="plus-circle-outline" onPress={addTask}/>}
            placeholder='What do you need to do?'
            mode='outlined'
            onChangeText={text => updateText(text)}
            value={taskText}
            style={styles.textInput}
            />
        </View>
    );s
}

const styles = StyleSheet.create({
    addTaskContainer: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    textInput: {
        width: '100%'
    }
})