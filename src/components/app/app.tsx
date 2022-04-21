import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import Header from "../header";
import StepList from "../stepList";
import { store } from "../store";
import Toolbar from "../toolbar";

export const App: React.FC = () => {
  const { t } = useTranslation();
  // Ensure that we use the translated title (rather than the hardcoded english one)
  document.title = t("label.pageTitle");
  return (
    <Provider store={store}>
      <Header />
      <StepList />
      <Toolbar />
    </Provider>
  );
};
