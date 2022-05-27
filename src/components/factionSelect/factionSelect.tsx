import classNames from "classnames";
import { Trans, useTranslation } from "react-i18next";
import {
  selectFactionPool,
  selectFlowState,
  selectSetupParameters,
  setCurrentFactionIndex,
  setErrorMessage,
} from "../../features";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./factionSelect.module.css";
import defaultImage from "../../images/componentDefault.png";
import { useContext } from "react";
import { StepContext } from "../step";
import { ReactComponent as MilitantIcon } from "../../images/militant.svg";
import { StatBar } from "./statBar";

export const FactionSelect: React.FC = () => {
  const { currentFactionIndex, lastFactionLocked } =
    useAppSelector(selectFlowState);
  const factionPool = useAppSelector(selectFactionPool);
  const { errorMessage } = useAppSelector(selectSetupParameters);
  const dispatch = useAppDispatch();
  const { stepActive } = useContext(StepContext);
  const { t } = useTranslation();

  const onKeyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const focusedIndex = currentFactionIndex ?? 0;
    const maxIndex = factionPool.length - (lastFactionLocked ? 2 : 1);
    let newIndex: number | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      newIndex = focusedIndex + 1;
      if (newIndex > maxIndex) newIndex = 0;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      newIndex = focusedIndex - 1;
      if (newIndex < 0) newIndex = maxIndex;
    }

    if (newIndex != null) {
      event.preventDefault();
      dispatch(setCurrentFactionIndex(newIndex));
      // @ts-expect-error focus function is incorrectly excluded from children typing
      event.currentTarget.parentNode?.children[newIndex].focus();
    }
  };

  const lastIndex = factionPool.length - 1;
  const selectedFaction =
    currentFactionIndex != null ? factionPool[currentFactionIndex] : null;
  return (
    <>
      <div
        className={styles.carousel}
        role="radiogroup"
        aria-label={t("setupStep.selectFaction.subtitle")}
        aria-required="true"
        aria-invalid={stepActive && errorMessage ? true : undefined}
        aria-errormessage={stepActive && errorMessage ? "appError" : undefined}
        aria-disabled={!stepActive}
      >
        {factionPool.map((faction, index) => {
          // Prepare the faction name in advance as we need to incorporate the vagabond character name (if there is one)
          const factionName = faction.vagabond
            ? t("vagabond." + faction.vagabond.code + ".name") +
              " (" +
              t("faction." + faction.key + ".name") +
              ")"
            : t("faction." + faction.key + ".name");
          // Swap out the faction image for the vagabond image (if we have one)
          const factionImage = faction.vagabond
            ? faction.vagabond.image
            : faction.image;
          return (
            <button
              key={faction.code}
              className={classNames(styles.faction, {
                [styles.militant]: faction.militant,
                [styles.selected]: index === currentFactionIndex,
                [styles.locked]: lastFactionLocked && index === lastIndex,
              })}
              onClick={() => {
                if (index !== currentFactionIndex) {
                  if (!lastFactionLocked || index < lastIndex) {
                    dispatch(setCurrentFactionIndex(index));
                  } else {
                    dispatch(setErrorMessage("error.lockedFaction"));
                  }
                }
              }}
              disabled={!stepActive}
              title={
                stepActive && lastFactionLocked && index === lastIndex
                  ? t("error.lockedFaction")
                  : undefined
              }
              role="radio"
              aria-checked={index === currentFactionIndex}
              aria-disabled={
                stepActive
                  ? lastFactionLocked && index === lastIndex
                  : undefined
              }
              aria-label={
                stepActive
                  ? factionName + faction.militant
                    ? " " + t("label.militant")
                    : ""
                  : undefined
              }
              // We have to override the tabbing logic to meet the standard of role "radio"
              tabIndex={
                stepActive
                  ? index === (currentFactionIndex ?? 0)
                    ? 0
                    : -1
                  : undefined
              }
              onKeyDown={onKeyDownHandler}
            >
              <img
                className={styles.image}
                src={
                  factionImage
                    ? process.env.PUBLIC_URL + "/images/" + factionImage
                    : defaultImage
                }
                alt="" // We're including the alt text in the button itself so don't bother reading out the image
                aria-hidden="true"
              />
              <div className={styles.title}>
                <span className={styles.label}>
                  {faction.militant ? (
                    <>
                      <MilitantIcon
                        className={styles.icon}
                        title={t("label.militant")}
                      />{" "}
                    </>
                  ) : null}
                  {factionName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {selectedFaction && (
        <div className={styles.factionInfo}>
          <div className={styles.statContainer}>
            <StatBar stat="complexity" />
            <StatBar stat="wealth" />
            <StatBar stat="aggression" />
            <StatBar stat="crafting" />
          </div>
          <div>
            <h3 className={styles.summaryTitle}>
              {t("faction." + selectedFaction.key + ".summaryTitle")}
            </h3>
            <Trans i18nKey={"faction." + selectedFaction.key + ".summary"} />
          </div>
        </div>
      )}
    </>
  );
};
