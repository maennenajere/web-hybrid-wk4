import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './components/TaskItem';
import TaskInput from './components/TaskInput';

export default function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                }
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        };

        loadTasks();
    }, []);

    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            } catch (error) {
                console.error('Failed to save tasks:', error);
            }
        };

        saveTasks();
    }, [tasks]);

    const addTask = (taskText) => {
        setTasks([...tasks, { id: Date.now().toString(), text: taskText, done: false }]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const pruneAllTasks = () => {
        setTasks([]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>What needs to be done?</Text>
                <Button title="Prune" onPress={pruneAllTasks} />
            </View>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TaskItem item={item} toggleTask={toggleTask} deleteTask={deleteTask} />
                )}
                keyExtractor={(item) => item.id}
            />
            <TaskInput addTask={addTask} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});