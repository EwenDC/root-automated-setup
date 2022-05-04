import { Provider } from "react-redux";
import Header from "../header";
import StepList from "../stepList";
import { store } from "../store";
import Toast from "../toast";
import Toolbar from "../toolbar";

export const App: React.FC = () => (
  <Provider store={store}>
    <Header />
    <StepList />
    <Toolbar />
    <Toast />
  </Provider>
);
