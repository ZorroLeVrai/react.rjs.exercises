import Task from "./components/Task"
import { TaskStatus } from "../taskStatus";

function App() {
  return (
    <>
      <h1 className="center-text">Gestion des tâches (étape 0)</h1>
      <Task totalTime="100" timeToComplete="70" status={TaskStatus.IN_PROGRESS} taskName="Première tâche"/>
    </>
  )
}

export const Etape0 = { App };
