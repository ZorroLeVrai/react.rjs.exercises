import { useState } from "react";
import { TaskStatus } from "../taskStatus";
import TaskGroup from "./components/TaskGroup";

const initialTasks = [
  {id: 1, totalTime: "3d", timeToComplete: "1d", status: TaskStatus.IN_PROGRESS, name: "Première tâche"},
  {id: 2, totalTime: "5d", timeToComplete: "4d", status: TaskStatus.PAUSED, name: "Seconde tâche"}
];

function App() {
  const [tasks, setTasks] = useState(() => initialTasks);

  console.log(tasks);

  return (
    <>
      <h1 className="center-text">Gestion des tâches  (étape 3)</h1>
      <TaskGroup groupName="Mon premier groupe" tasks={tasks} updateTasks={setTasks}/>
    </>
  )
}



export const Etape3 = { App };
