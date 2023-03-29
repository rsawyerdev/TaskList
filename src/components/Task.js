import React, { useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Card, TextInput, IconButton } from 'react-native-paper';

export default function Task(props) {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(props.title)
    const [taskComplete, isTaskComplete] = useState(false)

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    const removeTask = () => {
        props.deleteTask({ title: text, id: props.id })
    }

    const saveTask = () => {
        props.updateTask({ title: text, id: props.id })
        toggleEdit()
    }

    setTaskComplete = () => {
        isTaskComplete(!taskComplete)
    }

    return (
        <View style={styles.taskContainer}>
            {editMode ?
                <View style={styles.card} >
                    <TextInput
                        value={text}
                        onChangeText={text => setText(text)}
                        onBlur={toggleEdit}
                        right={<TextInput.Icon
                            icon='delete'
                            onPress={removeTask}
                        />}
                        left={<TextInput.Icon
                            icon='content-save'
                            onPress={saveTask}
                        />}
                        style={styles.editMode}
                    />
                </View>
                :
                <View style={styles.buttonWrapper}>
                    <IconButton
                        onPress={setTaskComplete}
                        icon={taskComplete ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                        iconColor={taskComplete ? 'green' : 'red'}
                        size={30}
                    />
                    <View style={styles.card}>
                        <TextInput
                            style={styles.cardText}
                            onFocus={toggleEdit}
                            value={props.title}

                        />
                    </View>
                </View>
            }
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
        paddingLeft: 5,
        paddingVertical: 10
    },
    cardText: {
        fontSize: 18,
        backgroundColor: 'none',


    },
    editMode: {
        width: '100%'
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})