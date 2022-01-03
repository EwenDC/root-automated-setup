import React from "react";
import { ExpansionList } from "../expansionList";
import styles from "./index.module.css";

export const App: React.FC = () => (
  <div className={styles.container}>
    <ExpansionList />
  </div>
);
