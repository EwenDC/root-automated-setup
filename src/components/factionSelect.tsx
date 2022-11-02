import classNames from "classnames";
import { Trans, useTranslation } from "react-i18next";
import { selectFactionPool, selectSetupParameters } from "../features/selectors";
import { setCurrentFactionIndex } from "../features/flowSlice";
import { setErrorMessage } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createContext, memo, useContext } from "react";
import { stepContext } from "./step";
import { ReactComponent as MilitantIcon } from "../images/icons/militant.svg";
import StatBar from "./statBar";
import iconComponents from "../iconComponents";
import IconList from "./iconList";
import ComponentCount from "./componentCount";
import { Faction, FlowSlice } from "../types";

interface FactionSelectContextType {
  selectedFaction: Faction | null;
}

const factionSelectContextValue: FactionSelectContextType = {
  selectedFaction: null,
};

export const factionSelectContext = createContext(factionSelectContextValue);

interface FactionSelectProps {
  flowSlice: FlowSlice;
}

const FactionSelect: React.FC<FactionSelectProps> = ({ flowSlice }) => {
  const factionPool = useAppSelector((state) => selectFactionPool(state, flowSlice.factionPool));
  const { errorMessage } = useAppSelector(selectSetupParameters);
  const dispatch = useAppDispatch();
  const { stepActive } = useContext(stepContext);
  const { t } = useTranslation();

  const onKeyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    const focusedIndex = flowSlice.factionIndex ?? 0;
    const maxIndex = factionPool.length - (flowSlice.lastFactionLocked ? 2 : 1);
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
    flowSlice.factionIndex != null ? factionPool[flowSlice.factionIndex] : null;
  return (
    <>
      <div
        className="faction-select"
        role="radiogroup"
        aria-label={t("setupStep.selectFaction.subtitle")}
        aria-required="true"
        aria-invalid={stepActive && errorMessage ? true : undefined}
        aria-errormessage={stepActive && errorMessage ? "appError" : undefined}
        aria-disabled={!stepActive}
      >
        {factionPool.map(({ code, key, image, militant, vagabond }, index) => {
          // Prepare the faction name in advance as we need to incorporate the vagabond character name (if there is one)
          let factionName = t("faction." + key + ".name");
          if (vagabond)
            factionName = t("vagabond." + vagabond.code + ".name") + " (" + factionName + ")";

          // Swap out the faction image for the vagabond image (if we have one)
          const factionImage = vagabond ? vagabond.image : image;
          return (
            <button
              key={code}
              className={classNames({
                militant: militant,
                selected: index === flowSlice.factionIndex,
                locked: flowSlice.lastFactionLocked && index === lastIndex,
              })}
              onClick={() => {
                if (index !== flowSlice.factionIndex) {
                  if (!flowSlice.lastFactionLocked || index < lastIndex) {
                    dispatch(setCurrentFactionIndex(index));
                  } else {
                    dispatch(setErrorMessage("error.lockedFaction"));
                  }
                }
              }}
              disabled={!stepActive}
              title={
                stepActive && flowSlice.lastFactionLocked && index === lastIndex
                  ? t("error.lockedFaction")
                  : undefined
              }
              role="radio"
              aria-checked={index === flowSlice.factionIndex}
              aria-disabled={
                stepActive ? flowSlice.lastFactionLocked && index === lastIndex : undefined
              }
              aria-label={
                stepActive
                  ? factionName + militant
                    ? " (" + t("label.militant") + ")"
                    : ""
                  : undefined
              }
              // We have to override the tabbing logic to meet the standard of role "radio"
              tabIndex={stepActive ? (index === (flowSlice.factionIndex ?? 0) ? 0 : -1) : undefined}
              onKeyDown={onKeyDownHandler}
            >
              <img
                src={factionImage}
                alt="" // We're including the alt text in the button itself so don't bother reading out the image
                aria-hidden="true"
              />
              <div className="title">
                <span className="label">
                  {militant ? (
                    <>
                      <MilitantIcon className="militant-icon" title={t("label.militant")} />{" "}
                    </>
                  ) : null}
                  {factionName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {stepActive && selectedFaction ? (
        <div className="faction-info">
          <factionSelectContext.Provider value={{ selectedFaction }}>
            <div className="stat-list">
              <StatBar stat="complexity" />
              <StatBar stat="wealth" />
              <StatBar stat="aggression" />
              <StatBar stat="crafting" />
            </div>
            <div>
              <div className="count-list">
                <ComponentCount component="warriors" />
                <ComponentCount component="buildings" />
                <ComponentCount component="tokens" />
              </div>
              {selectedFaction.vagabond && (
                <>
                  <p>
                    <strong>{t("label.startingItems")}.</strong>{" "}
                    <IconList list={selectedFaction.vagabond.startingItems} />.
                  </p>
                  <p>
                    <strong>
                      {t("label.specialAction")}:{" "}
                      {t("vagabond." + selectedFaction.vagabond.code + ".action")}.
                    </strong>{" "}
                    <Trans
                      i18nKey={"vagabond." + selectedFaction.vagabond.code + ".effect"}
                      components={iconComponents}
                    />
                  </p>
                </>
              )}
              <h4 className="summary-title">
                {t("faction." + selectedFaction.key + ".summaryTitle")}
              </h4>
              <Trans i18nKey={"faction." + selectedFaction.key + ".summary"} />
            </div>
          </factionSelectContext.Provider>
        </div>
      ) : null}
    </>
  );
};

export default memo(FactionSelect);
