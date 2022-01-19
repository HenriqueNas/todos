import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import exitIcon from "../assets/icons/exit/exit.png";
import editIcon from "../assets/icons/edit/edit.png";

import { ItemWrapper } from "./ItemWrapper";
import { Task } from "./TasksList";

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) {
  const [isTexting, setIsTexting] = useState(false);
  const [taskText, setTaskText] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleToggleTexting() {
    editTask(task.id, task.title);
    isTexting ? textInputRef.current?.blur() : textInputRef.current?.focus();
    setIsTexting(!isTexting);
  }

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={handleToggleTexting}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsView}>
        <TouchableOpacity
          style={{ paddingRight: 24 }}
          onPress={handleToggleTexting}
        >
          <Image source={isTexting ? exitIcon : editIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingRight: 24 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
    padding: 0,
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
    padding: 0,
  },
  iconsView: {
    flexDirection: "row",
  },
});
