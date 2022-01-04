import React from "react";
import ExpansionList from "../expansionList";
import styles from "./app.module.css";

export const App: React.FC = () => (
  <div className={styles.container}>
    <ExpansionList />
    <div>
      Welcome to the Root automated setup! To get started, select which Root
      content you are playing with, and your player count. Automated factions
      are not currently supported, so please set them up manually using the
      setup instructions found in the respective manuals.
    </div>
  </div>
);
