import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Since we have to suspend for i18next anyway, may as well lazy load the app itself
const App = React.lazy(
  () => import(/* webpackPreload: true */ "./components/app") // Preload as it's required for app function
);

// Lazy load the i18next initialization code
import(/* webpackPreload: true */ "./i18n"); // Preload as it's required for app function

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div id="loading" />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);

// Lazy load the service worker initialization code as it is not critical
import("./serviceWorkerRegistration").then((module) => module.register());
