import Task from "./components/Task"
import { TaskStatus } from "../taskStatus";

function App() {
  return (
    <>
      <h1 className="center-text">Gestion des tâches  (étape 1)</h1>
      <Task id={1} totalTime="100s" timeToComplete="70s" status={TaskStatus.IN_PROGRESS} taskName="Première tâche"/>
    </>
  )
}

export const Etape1 = { App };
