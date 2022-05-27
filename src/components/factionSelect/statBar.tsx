import styles from "./statBar.module.css";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";
import { selectFactionPool, selectFlowState } from "../../features";
import classNames from "classnames";

interface StatBarProps {
  stat: "complexity" | "wealth" | "aggression" | "crafting";
}

export const StatBar: React.FC<StatBarProps> = ({ stat }) => {
  const { currentFactionIndex } = useAppSelector(selectFlowState);
  const factionPool = useAppSelector(selectFactionPool);
  const { t } = useTranslation();

  const statValue = factionPool[currentFactionIndex ?? 0][stat];
  return (
    <div className={styles.container}>
      <span className={styles.label}>{t("label." + stat)}</span>
      <span
        className={classNames({
          [styles.barLow]: statValue < 1,
          [styles.barModerate]: statValue === 1,
          [styles.barHigh]: statValue > 1,
        })}
      >
        {t("label.factionRating." + statValue)}
      </span>
    </div>
  );
};
