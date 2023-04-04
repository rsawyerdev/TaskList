import { useState, useEffect } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
    FlatList
} from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddTask from '../components/AddTask';
import Task from '../components/Task';

export default function CreateLedger() {

    const [taskList, updateTaskList] = useState([]);

    useEffect(() => {
        checkStorage()
    }, []);

    const checkStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Task')
            const storageTasks = jsonValue != null ? JSON.parse(jsonValue) : null;
            updateTaskList(storageTasks)
        } catch (e) {
            console.log('storage error', e)
        }
    }

    const taskStorage = async (tasks) => {
        try {
            const taskValue = JSON.stringify(tasks)
            await AsyncStorage.setItem('@storage_Task', taskValue)
        } catch (e) {
            console.log('error', e)
        }
    }

    const createTask = (task) => {
        const newTaskList = taskList.concat();
        newTaskList.push(task);
        updateTaskList(newTaskList)
        taskStorage(newTaskList)
    };

    const updateTask = (newTask) => {
        const newTaskList = taskList.concat()
        const index = newTaskList.findIndex((task) => task.id === newTask.id)
        newTaskList.splice(index, 1, newTask)
        updateTaskList(newTaskList)
        taskStorage(newTaskList)
    }

    const deleteTask = (removeTask) => {
        const newTaskList = taskList.concat()
        const index = newTaskList.findIndex((task) => task.id === removeTask.id)
        newTaskList.splice(index, 1)
        updateTaskList(newTaskList)
        taskStorage(newTaskList)
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Text variant='headlineLarge'>Task List</Text>
            <FlatList
                data={taskList}
                renderItem={(task) => <Task
                    title={task.item.title}
                    id={task.item.id}
                    done={task.item.done}
                    updateTask={updateTask}
                    taskList={taskList}
                    deleteTask={deleteTask}
                />}
                keyExtractor={(task) => task.id}
            />
            <AddTask createTask={createTask} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        width: Dimensions.get('screen').width

    },
});
