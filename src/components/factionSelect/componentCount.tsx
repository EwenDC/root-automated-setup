import styles from "./componentCount.module.css";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";
import { selectFactionPool, selectFlowState } from "../../features";
import classNames from "classnames";
import { StepContext } from "../step";
import { useContext } from "react";
import defaultImage from "../../images/componentDefault.png";

const imageSource: {
  [component: string]: "image" | "buildingImage" | "tokenImage";
} = {
  warriors: "image",
  buildings: "buildingImage",
  tokens: "tokenImage",
};

interface ComponentCountProps {
  component: "warriors" | "buildings" | "tokens";
}

export const ComponentCount: React.FC<ComponentCountProps> = ({
  component,
}) => {
  const { currentFactionIndex } = useAppSelector(selectFlowState);
  const factionPool = useAppSelector(selectFactionPool);
  const { stepActive } = useContext(StepContext);
  const { t } = useTranslation();

  const componentCount =
    currentFactionIndex != null
      ? factionPool[currentFactionIndex][component]
      : 0;

  if (componentCount > 0) {
    // We know currentFactionIndex is not null because if it was componentCount defaults to 0
    const componentImage =
      factionPool[currentFactionIndex!][imageSource[component]];
    return (
      <div
        className={classNames(styles.container, {
          [styles.inactive]: !stepActive,
        })}
      >
        <img
          className={styles.image}
          src={
            componentImage
              ? process.env.PUBLIC_URL + "/images/" + componentImage
              : defaultImage
          }
          alt="" // Image is just decoration, so hide from screen readers
          aria-hidden="true"
        />{" "}
        &#215;
        {t("component." + component, {
          count: componentCount,
        })}
      </div>
    );
  }
  return null;
};
