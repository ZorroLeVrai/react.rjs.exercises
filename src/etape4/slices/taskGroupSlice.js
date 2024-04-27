import { createSlice } from "@reduxjs/toolkit";
import { TaskStatus } from "../../taskStatus";

/**
 * 
 * @param {TaskType[]} tasks - The array of tasks
 * @param {number} firstIndex - First index to swap
 * @param {number} secondIndex - Second index to swap
 * @returns {TaskType[]} The array with the swap tasks
 */
function handleSwapTasks(tasks, firstIndex, secondIndex) {
  const tempTasks = [...tasks];
  //exchange indexes
  [tempTasks[firstIndex], tempTasks[secondIndex]] = [tempTasks[secondIndex], tempTasks[firstIndex]];
  return tempTasks;
}

const initialTasks = [];

export const taskGroupSlice = createSlice({
  name: "taskGroup",
  initialState: {
    tasks: initialTasks,
    nextTaskId: 1
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, { ...action.payload, id: state.nextTaskId }];
      state.nextTaskId += 1;
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