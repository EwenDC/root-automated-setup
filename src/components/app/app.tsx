import { Provider } from "react-redux";
import StepList from "../stepList";
import { store } from "../store";
import Toolbar from "../toolbar";

export const App: React.FC = () => (
  <Provider store={store}>
    <StepList />
    <Toolbar />
  </Provider>
);
