import { TaskGroup } from "./components/TaskGroup";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <h1 className="center-text">Gestion des tâches  (étape 4)</h1>
      <TaskGroup groupName="Mon premier groupe"/>
    </Provider>
  );
}

export const Etape4 = { App };