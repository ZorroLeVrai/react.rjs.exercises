import { PersistGate } from "redux-persist/integration/react";
import { TaskGroup } from "./components/TaskGroup";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import LoadingView from "../commonComponents/LoadingView";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <h1 className="center-text">Gestion des tâches (étape 6)</h1>
        <TaskGroup groupName="Mon premier groupe"/>
      </PersistGate>
    </Provider>
  );
}

export const Etape6 = { App };