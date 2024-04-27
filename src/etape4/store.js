import { configureStore } from '@reduxjs/toolkit';
import taskGroupReducer from './slices/taskGroupSlice';

export const store = configureStore({
  reducer: {
    taskGroup: taskGroupReducer
  }
});