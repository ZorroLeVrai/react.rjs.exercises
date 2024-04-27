import { createSlice } from "@reduxjs/toolkit";
import { idGenerator } from "../tools";
import { TaskStatus } from "../../taskStatus";

function handleSwapTasks(tasks, firstId, secondId) {
  const tempTasks = [...tasks];
  //exchange indexes
  [tempTasks[firstId], tempTasks[secondId]] = [tempTasks[secondId], tempTasks[firstId]];
  return tempTasks;
}

const initialTasks = [
  { id: idGenerator.next().value, totalTime: "3d", timeToComplete: "1d", status: TaskStatus.IN_PROGRESS, name: "Première tâche" },
  { id: idGenerator.next().value, totalTime: "5d", timeToComplete: "4d", status: TaskStatus.PAUSED, name: "Seconde tâche" }
];

export const taskGroupSlice = createSlice({
  name: "taskGroup",
  initialState: {
    tasks: initialTasks
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    },

    editTask: (state, action) => {
      let { tasks } = state;
      const taskIndex = tasks.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      state.tasks = [...tasks.slice(0, taskIndex), action.payload, ...tasks.slice(taskIndex + 1)];
    },

    moveUpTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex === 0)
        throw new Error("Bad task id");

      state.tasks = handleSwapTasks(state.tasks, taskIndex, taskIndex - 1);
    },

    moveDownTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex + 1 >= state.tasks.length)
        throw new Error("Bad task id");

      state.tasks = handleSwapTasks(state.tasks, taskIndex, taskIndex + 1);
    }
  }
});

//generation des action reducers
export const { addTask, deleteTask, editTask, moveUpTask, moveDownTask } = taskGroupSlice.actions;

export default taskGroupSlice.reducer;