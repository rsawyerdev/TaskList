import React, { useState } from 'react';
import { View, StyleSheet  } from 'react-native';
import { Card, TextInput  } from 'react-native-paper';

export default function Task(props) {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(props.title)

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    const deleteTask = () => {
        console.log('edit')
    }

    return (
        <View style={styles.taskContainer}>
            {editMode ?
                <View style={styles.card} onPress={toggleEdit}>
                    <TextInput
                        value={text}
                        onChangeText={text => setText(text)}
                        onBlur={toggleEdit}
                        right={<TextInput.Icon 
                                icon='delete' 
                                onPress={deleteTask} />}
                        style={styles.editMode}
                    />
                </View>
                :
                <Card style={styles.card}>
                    <TextInput 
                        style={styles.cardText} 
                        onFocus={toggleEdit} 
                        value={props.title}
                        />
                </Card>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingVertical: 10
    },
    cardText: {
        fontSize: 18,
        backgroundColor: 'none',
        
    
    },
    editMode: {
        width: '100%'
    }
   
})