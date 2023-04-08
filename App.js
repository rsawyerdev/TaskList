import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  SafeAreaView, 
  Dimensions,
} from 'react-native';

import LedgerListProvider from './src/context/LedgerListProvider';
import CreateLedger from './src/containers/CreateLedger';
import TaskList from './src/containers/TaskList'

export default function App() {


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='auto' />
        <LedgerListProvider>
        <CreateLedger />
        <TaskList />
        </LedgerListProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
  },
});
