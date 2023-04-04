import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  SafeAreaView, 
  Dimensions,
} from 'react-native';

import CreateLedger from './src/containers/CreateLedger';
import TaskList from './src/containers/TaskList'

export default function App() {


  return (
    <SafeAreaView style={{flex:1}}>
        <StatusBar style='auto' />
        <CreateLedger />
        <TaskList />
    </SafeAreaView>
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
