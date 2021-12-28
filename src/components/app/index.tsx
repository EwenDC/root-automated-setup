import React from "react";
import { ExpansionList } from "../expansionList";
import style from "./index.module.css";

export const App: React.FC = () => {
  return (
    <div className={style.container}>
      <ExpansionList />
    </div>
  );
};
