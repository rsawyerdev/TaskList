import React, { useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

export default function LedgerItem(props) {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(props.title)

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    const removeLedger = () => {
        props.deleteLedger({ title: text, id: props.id, done: props.done })
    }

    const saveLedger = () => {
        props.updateLedger({ title: text, id: props.id, done: props.done })
        toggleEdit()
    }

    const passToTask = () => {
        props.moveLedger({ title: text, id: props.id, done: props.done })
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
                            onPress={removeLedger}
                        />}
                        left={<TextInput.Icon
                            icon='content-save'
                            onPress={saveLedger}
                        />}
                        style={styles.editMode}
                    />
                </View>
                :
                <View style={styles.buttonWrapper}>
                    <IconButton
                        onPress={passToTask}
                        icon={'arrow-down-bold-box'}
                        iconColor='grey'
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
        paddingVertical: 2,
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