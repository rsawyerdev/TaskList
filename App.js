import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Dimensions,
  FlatList
} from 'react-native';
import { Text } from 'react-native-paper'

import AddTask from './src/components/AddTask';
import Task from './src/components/Task';

export default function App() {

  const [taskList, updateTaskList] = useState([]);

  const createTask = (props) => {
    const newTaskList = taskList.concat();
    newTaskList.push(props);
    updateTaskList(newTaskList)
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <StatusBar style='auto' />
        <Text variant='headlineLarge'>Task List</Text>
        <FlatList 
          data={taskList}
          renderItem={(task) => <Task title={task.item.title} />}
          keyExtractor={(task) => task.id}
        />
        <AddTask createTask={createTask}/>
      </KeyboardAvoidingView>
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
