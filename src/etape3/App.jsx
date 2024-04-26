import { useReducer } from "react";
import { TaskStatus } from "../taskStatus";
import { TaskGroup } from "./components/TaskGroup";
import { idGenerator } from "./tools";
import { tasksReducer } from "./tasksReducer";

const initialTasks = [
  {id: idGenerator.next().value, totalTime: "3d", timeToComplete: "1d", status: TaskStatus.IN_PROGRESS, name: "Première tâche"},
  {id: idGenerator.next().value, totalTime: "5d", timeToComplete: "4d", status: TaskStatus.PAUSED, name: "Seconde tâche"}
];

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <>
      <h1 className="center-text">Gestion des tâches  (étape 3)</h1>
      <TaskGroup groupName="Mon premier groupe" tasks={tasks} tasksDispatcher={dispatch}/>
    </>
  )
}

export const Etape3 = { App };