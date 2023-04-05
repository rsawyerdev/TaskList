import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';

export default function AddTask(props) {

    const [taskText, updateText] = useState('');

    const addTask = () => {
        const key = uuid.v4();
        const newTask = {title: taskText, id: key, done: false};
        props.createLedger(newTask);
        updateText('');
    };

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
    );
}

const styles = StyleSheet.create({
    addTaskContainer: {
    },
    textInput: {
        width: '100%'
    }
})