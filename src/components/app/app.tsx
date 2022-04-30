import { Provider } from "react-redux";
import Header from "../header";
import StepList from "../stepList";
import { store } from "../store";
import Toolbar from "../toolbar";

export const App: React.FC = () => (
  <Provider store={store}>
    <Header />
    <StepList />
    <Toolbar />
  </Provider>
);
