import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import Header from "./components/header";
import StepList from "./components/stepList";
import Toolbar from "./components/toolbar";
import Toast from "./components/toast";
import { store } from "./store";
import { registerServiceWorker } from "./swSetup";

import "@csstools/normalize.css";
import "./index.scss";
import "./i18nSetup";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div className="loading" />}>
      <Provider store={store}>
        <Header />
        <StepList />
        <Toolbar />
        <Toast />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);

registerServiceWorker({
  onUpdate: (registration) => {
    if (registration.waiting) {
      // It's safe to skip waiting because at this point we've already served all the application
      // code and localization, which are the two things that break the app when out of sync
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  },
});
