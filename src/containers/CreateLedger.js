import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList
} from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddTask from '../components/AddTask';
import LedgerItem from '../components/LedgerItem'

export default function CreateLedger() {

    const [ledgerList, updateLedgerList] = useState([]);

    useEffect(() => {
        checkStorage()
    }, []);

    const checkStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Ledger')
            const storageLedgers = jsonValue != null ? JSON.parse(jsonValue) : null;
            updateLedgerList(storageLedgers)
        } catch (e) {
            console.log('storage error', e)
        }
    }

    const ledgerStorage = async (ledgers) => {
        try {
            const ledgerValue = JSON.stringify(ledgers)
            await AsyncStorage.setItem('@storage_Ledger', ledgerValue)
        } catch (e) {
            console.log('error', e)
        }
    }

    const createLedger = (ledger) => {
        if (ledgerList) {
            const newLedgerList = ledgerList.concat();
            newLedgerList.push(ledger);
            updateLedgerList(newLedgerList)
            ledgerStorage(newLedgerList)
        } else {
            newLedgerList = new Array
            newLedgerList.push(ledger);
            updateLedgerList(newLedgerList)
            ledgerStorage(newLedgerList)
        }

    };

    const updateLedger = (newLedger) => {
        const newLedgerList = ledgerList.concat()
        const index = newLedgerList.findIndex((ledger) => ledger.id === newLedger.id)
        newLedgerList.splice(index, 1, newLedger)
        updateLedgerList(newLedgerList)
        ledgerStorage(newLedgerList)
    }

    const deleteLedger = (removeLedger) => {
        const newLedgerList = ledgerList.concat()
        const index = newLedgerList.findIndex((ledger) => ledger.id === removeLedger.id)
        newLedgerList.splice(index, 1)
        updateLedgerList(newLedgerList)
        ledgerStorage(newLedgerList)
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
                    deleteLedger={deleteLedger}
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
