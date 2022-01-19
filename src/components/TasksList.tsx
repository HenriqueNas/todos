import React from "react";
import { FlatList } from "react-native";

import { TaskItem } from "./TaskItem";

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem
            task={item}
            index={index}
            editTask={editTask}
            removeTask={removeTask}
            toggleTaskDone={toggleTaskDone}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
