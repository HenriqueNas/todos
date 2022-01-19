import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import uuid from "react-native-uuid";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: String(uuid.v4()),
      title: newTaskTitle,
      done: false,
    };

    const taskWithSameTitle = tasks.filter(
      (task) => task.title === newTaskTitle
    );

    if (taskWithSameTitle.length > 0) {
      Alert.alert(
        `Você já tem a tarefa ${newTaskTitle}`,
        "Deseja mesmo criar mais uma tarefa?",
        [
          {
            text: "Sim",
            onPress: () => {
              return setTasks((oldTasks) => [...oldTasks, newTask]);
            },
          },
          {
            text: "Não",
            onPress: () => {
              return;
            },
          },
        ]
      );
      return;
    }

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: string) {
    const newTasks = tasks.map((task) => {
      return task.id === id ? { ...task, done: true } : task;
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: string) {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  }

  function handleEditTask(id: string, title: string) {
    const newTasks = tasks.map((task) => {
      return task.id === id ? { ...task, title } : task;
    });

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
