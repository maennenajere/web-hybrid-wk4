import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ item, toggleTask, deleteTask }) => {
    return (
        <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.container}>
            <Text style={[styles.text, item.done && styles.done]}>{item.text}</Text>
            <Text style={styles.delete} onPress={() => deleteTask(item.id)}>X</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 18,
    },
    done: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    delete: {
        color: 'red',
        fontSize: 18,
        marginLeft: 10,
    },
});

export default TaskItem;