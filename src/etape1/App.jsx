import Task from "./components/Task"

function App() {
  return (
    <>
      <h1 className="center-text">Gestion des tâches  (étape 1)</h1>
      <Task id={1} totalTime="100" timeToComplete="70" status="En cours" taskName="Première tâche"/>
    </>
  )
}

export const Etape1 = { App };
