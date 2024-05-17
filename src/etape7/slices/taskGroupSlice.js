import { createSlice } from "@reduxjs/toolkit";

/**
 * 
 * @param {TaskType[]} tasks - The array of tasks
 * @param {number} firstIndex - First index to swap
 * @param {number} secondIndex - Second index to swap
 */
function handleSwapTasks(tasks, firstIndex, secondIndex) {
  //exchange indexes
  [tasks[firstIndex], tasks[secondIndex]] = [tasks[secondIndex], tasks[firstIndex]];
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
      state.tasks.push({ ...action.payload, id: state.nextTaskId });
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

      state.tasks[taskIndex] = action.payload;
    },

    moveUpTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex === 0)
        throw new Error("Bad task id");

      handleSwapTasks(state.tasks, taskIndex, taskIndex - 1);
    },

    moveDownTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex + 1 >= state.tasks.length)
        throw new Error("Bad task id");

      handleSwapTasks(state.tasks, taskIndex, taskIndex + 1);
    }
  }
});

//generation des action reducers
export const { addTask, deleteTask, editTask, moveUpTask, moveDownTask } = taskGroupSlice.actions;

export default taskGroupSlice.reducer;