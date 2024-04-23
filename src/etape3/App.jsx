import { useState } from "react";
import { TaskStatus } from "../taskStatus";
import TaskGroup from "./components/TaskGroup";
import { idGenerator } from "./tools";

const initialTasks = [
  {id: idGenerator.next().value, totalTime: "3d", timeToComplete: "1d", status: TaskStatus.IN_PROGRESS, name: "Première tâche"},
  {id: idGenerator.next().value, totalTime: "5d", timeToComplete: "4d", status: TaskStatus.PAUSED, name: "Seconde tâche"}
];

function App() {
  const [tasks, setTasks] = useState(() => initialTasks);

  return (
    <>
      <h1 className="center-text">Gestion des tâches  (étape 3)</h1>
      <TaskGroup groupName="Mon premier groupe" tasks={tasks} updateTasks={setTasks}/>
    </>
  )
}

export const Etape3 = { App };