import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Since we have to suspend for i18next anyway, may as well lazy load the entire app
const App = React.lazy(
  () => import(/* webpackPreload: true, webpackChunkName: "auset" */ "./components/app") // Preload since we require it ASAP
);

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div id="loading" />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
