import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, KeyboardAvoidingView, Dimensions } from 'react-native';

import AddTask from './src/components/AddTask';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <StatusBar style="auto" />
        <Text>Task List</Text>
        <AddTask />
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
