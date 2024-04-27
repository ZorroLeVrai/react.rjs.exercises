export const TaskGroupAction = Object.freeze({
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  EDIT_TASK: "EDIT_TASK",
  MOVE_UP_TASK: "MOVE_UP_TASK",
  MOVE_DOWN_TASK: "MOVE_DOWN_TASK"
});

/**
 * 
 * @param {TaskType[]} state - Action state
 * @param {{type: string, payload: TaskType}} action - the dispatched action
 * @returns {*} the computed state
 */
export function tasksReducer(state, action) {
  switch (action.type) {
    case TaskGroupAction.ADD_TASK:
      return [...state, action.payload];
    case TaskGroupAction.DELETE_TASK:
      return state.filter(task => task.id !== action.payload.id);
    case TaskGroupAction.EDIT_TASK: {
      const taskIndex = state.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      return [...state.slice(0, taskIndex), action.payload, ...state.slice(taskIndex + 1)];
    }
    case TaskGroupAction.MOVE_UP_TASK: {
      const taskIndex = state.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex === 0)
        throw new Error("Bad task id");

      return handleSwapTasks(state, taskIndex, taskIndex - 1);
    }
    case TaskGroupAction.MOVE_DOWN_TASK: {
      const taskIndex = state.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex + 1 >= state.length)
        throw new Error("Bad task id");

      return handleSwapTasks(state, taskIndex, taskIndex + 1);
    }
  }

  function handleSwapTasks(tasks, firstId, secondId) {
    const tempTasks = [...tasks];
    //exchange indexes
    [tempTasks[firstId], tempTasks[secondId]] = [tempTasks[secondId], tempTasks[firstId]];
    return tempTasks;
  }
}