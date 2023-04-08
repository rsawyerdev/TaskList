import { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList
} from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ledgerListContext } from '../context/LedgerListProvider';
import AddTask from '../components/AddTask';
import LedgerItem from '../components/LedgerItem'

export default function CreateLedger() {

    const [ledgerList, setLedgerList] = useContext(ledgerListContext);

    useEffect(() => {
        checkStorage()
    }, []);

    const checkStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Task')
            const storageTasks = jsonValue != null ? JSON.parse(jsonValue) : null;
            setLedgerList(storageTasks)
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
        const newTaskList = ledgerList.concat();
        newTaskList.push(task);
        setLedgerList(newTaskList)
        taskStorage(newTaskList)
    };

    const updateTask = (newTask) => {
        const newTaskList = ledgerList.concat()
        const index = newTaskList.findIndex((task) => task.id === newTask.id)
        newTaskList.splice(index, 1, newTask)
        setLedgerList(newTaskList)
        taskStorage(newTaskList)
    }

    const deleteTask = (removeTask) => {
        const newTaskList = ledgerList.concat()
        const index = newTaskList.findIndex((task) => task.id === removeTask.id)
        newTaskList.splice(index, 1)
        setLedgerList(newTaskList)
        taskStorage(newTaskList)
    }

    return (
        <View style={styles.container}>
            <Text variant='headlineLarge' style={styles.headerText}>Ledger</Text>
                <FlatList
                    data={ledgerList}
                    renderItem={(task) => <LedgerItem
                        title={task.item.title}
                        id={task.item.id}
                        done={task.item.done}
                        updateTask={updateTask}
                        ledgerList={ledgerList}
                        deleteTask={deleteTask}
                    />}
                    keyExtractor={(task) => task.id}
                />
                <AddTask createTask={createTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 20,
        width: Dimensions.get('screen').width,
        paddingHorizontal: 10

    },
    headerText: {
        textAlign: 'center'
    }
});
