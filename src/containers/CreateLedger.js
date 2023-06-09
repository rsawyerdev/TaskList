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
import { taskListContext } from '../context/TaskListProvider';
import AddTask from '../components/AddTask';
import LedgerItem from '../components/LedgerItem'

export default function CreateLedger() {

    const [ledgerList, setLedgerList] = useContext(ledgerListContext);
    const [taskList, setTaskList] = useContext(taskListContext);

    useEffect(() => {
        checkLedgerStorage()
    }, []);

    const checkLedgerStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Ledger')
            const storageLedgers = jsonValue != null ? JSON.parse(jsonValue) : null;
            setLedgerList(storageLedgers)
        } catch (e) {
            console.log('storage error', e)
        }
    }

    const storeLedger = async (ledgers) => {
        try {
            const ledgerValue = JSON.stringify(ledgers)
            await AsyncStorage.setItem('@storage_Ledger', ledgerValue)
        } catch (e) {
            console.log('error', e)
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

    const createLedger = (ledger) => {
        if (ledgerList) {
            const newLedgerList = ledgerList.concat();
            newLedgerList.push(ledger);
            setLedgerList(newLedgerList)
            storeLedger(newLedgerList)
        } else {
            setLedgerList(ledger)
            storeLedger(ledger)
        }
    };

    const updateLedger = (newLedger) => {
        const newLedgerList = ledgerList.concat()
        const index = newLedgerList.findIndex((ledger) => ledger.id === newLedger.id)
        newLedgerList.splice(index, 1, newLedger)
        setLedgerList(newLedgerList)
        storeLedger(newLedgerList)
    }

    const deleteLedger = (removeLedger) => {
        const newLedgerList = ledgerList.concat()
        const index = newLedgerList.findIndex((ledger) => ledger.id === removeLedger.id)
        newLedgerList.splice(index, 1)
        setLedgerList(newLedgerList)
        storeLedger(newLedgerList)
    }

    const moveLedger = (ledger) => {
        if (taskList) {
            const newTaskList = taskList.concat()
            newTaskList.push(ledger)
            setTaskList(newTaskList)
            taskStorage(newTaskList)
        } else {
            setTaskList(ledger)
            taskStorage(ledger)
        }
        const newLedgerList = ledgerList.concat()
        const index = newLedgerList.findIndex((item) => item.id === ledger.id)
        newLedgerList.splice(index, 1)
        setLedgerList(newLedgerList)
        storeLedger(newLedgerList)
    }

    return (
        <View style={styles.container}>
            <Text variant='headlineLarge' style={styles.headerText}>Ledger</Text>
            <FlatList
                data={ledgerList}
                renderItem={(ledger) => <LedgerItem
                    title={ledger.item.title}
                    id={ledger.item.id}
                    done={ledger.item.done}
                    updateLedger={updateLedger}
                    ledgerList={ledgerList}
                    deleteLedger={deleteLedger}
                    moveLedger={moveLedger}
                />}
                keyExtractor={(ledger) => ledger.id}
            />
            <AddTask createLedger={createLedger} />
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
