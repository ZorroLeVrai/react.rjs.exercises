export const TaskGroupAction = Object.freeze({
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  EDIT_TASK: "EDIT_TASK",
  MOVE_UP_TASK: "MOVE_UP_TASK",
  MOVE_DOWN_TASK: "MOVE_DOWN_TASK"
});

/**
 * 
 * @param {TaskType[]} tasks - Action state
 * @param {{type: string, payload: TaskType}} action - the dispatched action
 * @returns {*} the computed state
 */
export function tasksReducer(tasks, action) {
  const copyTasks = [...tasks];

  switch (action.type) {
    case TaskGroupAction.ADD_TASK:
      return [...tasks, action.payload];

    case TaskGroupAction.DELETE_TASK:
      return tasks.filter(task => task.id !== action.payload.id);

    case TaskGroupAction.EDIT_TASK: {
      const modifiedTask = action.payload;
      const taskIndex = copyTasks.findIndex(t => t.id === modifiedTask.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      copyTasks[taskIndex] = modifiedTask;
      return copyTasks;
    }

    case TaskGroupAction.MOVE_UP_TASK: {
      const taskIndex = tasks.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex === 0)
        throw new Error("Bad task id");

      return handleSwapTasks(tasks, taskIndex, taskIndex - 1);
    }

    case TaskGroupAction.MOVE_DOWN_TASK: {
      const taskIndex = tasks.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex + 1 >= tasks.length)
        throw new Error("Bad task id");

      return handleSwapTasks(tasks, taskIndex, taskIndex + 1);
    }
  }

  function handleSwapTasks(tasks, firstId, secondId) {
    const tempTasks = [...tasks];
    //exchange indexes
    [tempTasks[firstId], tempTasks[secondId]] = [tempTasks[secondId], tempTasks[firstId]];
    return tempTasks;
  }
}