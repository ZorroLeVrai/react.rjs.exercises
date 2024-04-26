import { useReducer } from "react";
import { TaskStatus } from "../taskStatus";
import { TaskGroup } from "./components/TaskGroup";
import { idGenerator } from "./tools";

const initialTasks = [
  {id: idGenerator.next().value, totalTime: "3d", timeToComplete: "1d", status: TaskStatus.IN_PROGRESS, name: "Première tâche"},
  {id: idGenerator.next().value, totalTime: "5d", timeToComplete: "4d", status: TaskStatus.PAUSED, name: "Seconde tâche"}
];

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
function reducer(state, action) {
  switch (action.type) {
    case TaskGroupAction.ADD_TASK:
      return [...state, action.payload];
    case TaskGroupAction.DELETE_TASK:
      return state.filter(task => task.id !== action.payload.id);
    case TaskGroupAction.EDIT_TASK: {
      const taskIndex = state.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      return [...state.slice(0, taskIndex), action.payload, ...state.slice(taskIndex+1)];
    }
    case TaskGroupAction.MOVE_UP_TASK: {
      const taskIndex = state.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex === 0)
        throw new Error("Bad task id");

      return handleSwapTasks(state, taskIndex, taskIndex-1);
    }
    case TaskGroupAction.MOVE_DOWN_TASK: {
      const taskIndex = state.findIndex(t => t.id === action.payload.id);
      if (taskIndex < 0)
        throw new Error("Task id was not found");

      if (taskIndex + 1 >= state.length)
        throw new Error("Bad task id");
  
      return handleSwapTasks(state, taskIndex, taskIndex+1);
    }
  }

  function handleSwapTasks(tasks, firstId, secondId) {
    const tempTasks = [...tasks];
    //exchange indexes
    [tempTasks[firstId], tempTasks[secondId]] = [tempTasks[secondId], tempTasks[firstId]];
    return tempTasks;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, initialTasks);

  return (
    <>
      <h1 className="center-text">Gestion des tâches  (étape 3)</h1>
      <TaskGroup groupName="Mon premier groupe" tasks={tasks} tasksDispatcher={dispatch}/>
    </>
  )
}

export const Etape3 = { App };