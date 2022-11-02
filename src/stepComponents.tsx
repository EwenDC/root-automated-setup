import { useTranslation } from "react-i18next";
import {
  enableMapLandmark,
  toggleDeck,
  toggleExpansion,
  toggleFaction,
  toggleHireling,
  toggleLandmark,
  toggleMap,
  toggleVagabond,
} from "./features/componentsSlice";
import { resetFlow, skipSteps } from "./features/flowSlice";
import {
  selectDeckArray,
  selectEnabledLandmarkMaps,
  selectExpansionArray,
  selectFactionArray,
  selectFactionCodes,
  selectFactionPoolEntry,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
  selectSetupMap,
  selectSetupParameters,
  selectSkippedSteps,
  selectVagabondArray,
} from "./features/selectors";
import { fixFirstPlayer, setLandmarkCount, setPlayerCount } from "./features/setupSlice";
import { useAppDispatch, useAppSelector, useNthLastPlayer } from "./hooks";
import { FlowSlice, SetupStep } from "./types";
import Button from "./components/button";
import Checkbox from "./components/checkbox";
import ComponentToggle from "./components/componentToggle";
import FactionSelect from "./components/factionSelect";
import Icon from "./components/icon";
import IconList from "./components/iconList";
import NumberSelector from "./components/numberSelector";
import Radiogroup from "./components/radiogroup";
import Step from "./components/step";
import { ReactComponent as RestartIcon } from "./images/icons/restart.svg";
import { memo } from "react";

interface StepComponentProps {
  flowSlice: FlowSlice;
  active?: boolean;
}

const getStepComponent = (step: SetupStep) => {
  let StepComponent: React.FC<StepComponentProps>;

  switch (step) {
    case SetupStep.chooseExpansions:
      StepComponent = ({ active }) => {
        const skippedSteps = useAppSelector(selectSkippedSteps);
        const dispatch = useAppDispatch();
        return (
          <Step step={SetupStep.chooseExpansions} active={active}>
            <ComponentToggle
              selector={selectExpansionArray}
              toggleComponent={toggleExpansion}
              getLabelKey={(expansion) => "expansion." + expansion.code}
              getLockedKey={(expansion) =>
                // Prevent the player from deselecting the Root base game
                expansion.base ? "error.baseExpansionRequired" : null
              }
              unsorted={true}
            />
            <Checkbox
              id="includeBotStep"
              defaultValue={!skippedSteps[SetupStep.setUpBots]}
              onChange={(checked) =>
                dispatch(skipSteps([SetupStep.setUpMapPriority, SetupStep.setUpBots], !checked))
              }
            />
          </Step>
        );
      };
      break;

    case SetupStep.seatPlayers:
      StepComponent = ({ active }) => {
        const { playerCount, fixedFirstPlayer } = useAppSelector(selectSetupParameters);
        const skippedSteps = useAppSelector(selectSkippedSteps);
        const factions = useAppSelector(selectFactionArray);
        const dispatch = useAppDispatch();
        return (
          <Step step={SetupStep.seatPlayers} active={active}>
            <NumberSelector
              id="playerCount"
              value={playerCount}
              minVal={skippedSteps[SetupStep.setUpBots] ? 2 : 1}
              maxVal={factions.length - 1}
              onChange={(value) => dispatch(setPlayerCount(value))}
            />
            <Radiogroup
              id="fixedFirstPlayer"
              defaultValue={fixedFirstPlayer}
              onChange={(value) => dispatch(fixFirstPlayer(value))}
            />
          </Step>
        );
      };
      break;

    case SetupStep.chooseMap:
      StepComponent = ({ active }) => {
        const landmarkMaps = useAppSelector(selectEnabledLandmarkMaps);
        const { t, i18n } = useTranslation();
        const dispatch = useAppDispatch();
        return (
          <Step step={SetupStep.chooseMap} active={active}>
            <ComponentToggle
              selector={selectMapArray}
              toggleComponent={toggleMap}
              getLabelKey={(map) => "map." + map.code + ".name"}
            />
            {landmarkMaps
              .map(({ code, useLandmark }) => ({
                code,
                label: t("map." + code + ".name"),
                useLandmark,
              }))
              .sort((a, b) => {
                return a.label.localeCompare(b.label, i18n.language);
              })
              .map(({ code, useLandmark }) => (
                <Checkbox
                  key={code}
                  id={code + "UseLandmark"}
                  labelKey={"map." + code + ".useLandmark"}
                  defaultValue={useLandmark}
                  onChange={(checked) => dispatch(enableMapLandmark(code, checked))}
                />
              ))}
          </Step>
        );
      };
      break;

    case SetupStep.setUpMap:
      StepComponent = ({ active }) => {
        const setupMap = useAppSelector(selectSetupMap);
        return (
          <Step
            step={SetupStep.setUpMap}
            active={active}
            subtitleKey={"map." + setupMap?.code + ".setupTitle"}
            textKey={"map." + setupMap?.code + ".setup"}
          />
        );
      };
      break;

    case SetupStep.setUpMapLandmark:
      StepComponent = ({ active }) => {
        const setupMap = useAppSelector(selectSetupMap);
        return (
          <Step
            step={SetupStep.setUpMapLandmark}
            active={active}
            subtitleKey={"landmark." + setupMap?.landmark + ".setupTitle"}
            textKey={"map." + setupMap?.code + ".landmarkSetup"}
            translationOptions={{ context: setupMap?.code }}
          />
        );
      };
      break;

    case SetupStep.chooseDeck:
      StepComponent = ({ active }) => (
        <Step step={SetupStep.chooseDeck} active={active}>
          <ComponentToggle
            selector={selectDeckArray}
            toggleComponent={toggleDeck}
            getLabelKey={(deck) => "deck." + deck.code + ".name"}
          />
        </Step>
      );
      break;

    case SetupStep.setUpDeck:
      StepComponent = ({ active }) => {
        const { playerCount, deck } = useAppSelector(selectSetupParameters);
        const skippedSteps = useAppSelector(selectSkippedSteps);
        return (
          <Step
            step={SetupStep.setUpDeck}
            active={active}
            renderTitle={skippedSteps[SetupStep.chooseDeck]}
            renderSubtitle={!skippedSteps[SetupStep.chooseDeck]}
            subtitleKey={"deck." + deck + ".setupTitle"}
            textKey={"deck." + deck + ".setup"}
            translationOptions={{
              context: playerCount < 3 ? "twoPlayer" : undefined,
            }}
          />
        );
      };
      break;

    case SetupStep.chooseLandmarks:
      StepComponent = ({ active }) => {
        const { playerCount, landmarkCount } = useAppSelector(selectSetupParameters);
        const setupMap = useAppSelector(selectSetupMap);
        const dispatch = useAppDispatch();
        return (
          <Step
            step={SetupStep.chooseLandmarks}
            active={active}
            translationOptions={{
              context: setupMap?.useLandmark ? "mapLandmark" : undefined,
            }}
          >
            <NumberSelector
              id="landmarkCount"
              value={landmarkCount}
              minVal={0}
              maxVal={2}
              onChange={(value) => dispatch(setLandmarkCount(value))}
            />
            {landmarkCount > 0 ? (
              <ComponentToggle
                selector={selectLandmarkArray}
                toggleComponent={toggleLandmark}
                getLabelKey={(landmark) => "landmark." + landmark.code + ".name"}
                getLockedKey={(landmark) =>
                  // Disable this landmark if it requires more players to include
                  landmark.minPlayers > playerCount
                    ? "error.landmarkNotEnoughPlayers"
                    : // Disable this landmark if it was already used in map setup
                    setupMap?.useLandmark && landmark.code === setupMap?.landmark
                    ? "error.mapLandmarkUsed"
                    : null
                }
              />
            ) : null}
          </Step>
        );
      };
      break;

    case SetupStep.setUpLandmark1:
      StepComponent = ({ active }) => {
        const { landmark1 } = useAppSelector(selectSetupParameters);
        const setupMap = useAppSelector(selectSetupMap);
        const nthLastPlayer = useNthLastPlayer();
        return (
          <Step
            step={SetupStep.setUpLandmark1}
            active={active}
            subtitleKey={"landmark." + landmark1 + ".setupTitle"}
            textKey={"landmark." + landmark1 + ".setup"}
            translationOptions={{
              context: setupMap?.code,
              count: nthLastPlayer(1),
            }}
          />
        );
      };
      break;

    case SetupStep.setUpLandmark2:
      StepComponent = ({ active }) => {
        const { landmark2 } = useAppSelector(selectSetupParameters);
        const setupMap = useAppSelector(selectSetupMap);
        const nthLastPlayer = useNthLastPlayer();
        return (
          <Step
            step={SetupStep.setUpLandmark2}
            active={active}
            subtitleKey={"landmark." + landmark2 + ".setupTitle"}
            textKey={"landmark." + landmark2 + ".setup"}
            translationOptions={{
              context: setupMap?.code,
              count: nthLastPlayer(2),
            }}
          />
        );
      };
      break;

    case SetupStep.chooseHirelings:
      StepComponent = ({ active }) => {
        const { playerCount } = useAppSelector(selectSetupParameters);
        const skippedSteps = useAppSelector(selectSkippedSteps);
        const factionCodes = useAppSelector(selectFactionCodes);
        const dispatch = useAppDispatch();
        return (
          <Step step={SetupStep.chooseHirelings} active={active}>
            <Checkbox
              id="includeHirelings"
              defaultValue={!skippedSteps[SetupStep.setUpHireling1]}
              onChange={(checked) =>
                dispatch(
                  skipSteps(
                    [
                      SetupStep.setUpHireling1,
                      SetupStep.setUpHireling2,
                      SetupStep.setUpHireling3,
                      SetupStep.postHirelingSetup,
                    ],
                    !checked
                  )
                )
              }
            />
            {!skippedSteps[SetupStep.setUpHireling1] ? (
              <ComponentToggle
                selector={selectHirelingArray}
                toggleComponent={toggleHireling}
                getLabelKey={(hireling) => "hireling." + hireling.code + ".name"}
                getLockedKey={(hireling) =>
                  // Are we at the max player count (i.e. there are no factions to spare for an equivilent hireling)?
                  playerCount >= factionCodes.length - 1 &&
                  // Is this hireling one of the faction equivilents?
                  hireling.factions.some((faction) => factionCodes.includes(faction))
                    ? "error.factionHirelingExcluded"
                    : null
                }
              />
            ) : null}
          </Step>
        );
      };
      break;

    case SetupStep.setUpHireling1:
      StepComponent = ({ active }) => {
        const { hireling1 } = useAppSelector(selectSetupParameters);
        const nthLastPlayer = useNthLastPlayer();
        return (
          <Step
            step={SetupStep.setUpHireling1}
            active={active}
            subtitleKey={"hireling." + hireling1?.code + ".setupTitle"}
            textKey={"hireling." + hireling1?.code + ".setup"}
            translationOptions={{
              context: hireling1?.demoted ? "demoted" : undefined,
              count: nthLastPlayer(1),
            }}
          />
        );
      };
      break;

    case SetupStep.setUpHireling2:
      StepComponent = ({ active }) => {
        const { hireling2 } = useAppSelector(selectSetupParameters);
        const nthLastPlayer = useNthLastPlayer();
        return (
          <Step
            step={SetupStep.setUpHireling2}
            active={active}
            subtitleKey={"hireling." + hireling2?.code + ".setupTitle"}
            textKey={"hireling." + hireling2?.code + ".setup"}
            translationOptions={{
              context: hireling2?.demoted ? "demoted" : undefined,
              count: nthLastPlayer(2),
            }}
          />
        );
      };
      break;

    case SetupStep.setUpHireling3:
      StepComponent = ({ active }) => {
        const { hireling3 } = useAppSelector(selectSetupParameters);
        const nthLastPlayer = useNthLastPlayer();
        return (
          <Step
            step={SetupStep.setUpHireling3}
            active={active}
            subtitleKey={"hireling." + hireling3?.code + ".setupTitle"}
            textKey={"hireling." + hireling3?.code + ".setup"}
            translationOptions={{
              context: hireling3?.demoted ? "demoted" : undefined,
              count: nthLastPlayer(3),
            }}
          />
        );
      };
      break;

    case SetupStep.chooseFactions:
      StepComponent = ({ active }) => {
        const { playerCount, excludedFactions } = useAppSelector(selectSetupParameters);
        const skippedSteps = useAppSelector(selectSkippedSteps);
        const factions = useAppSelector(selectFactionArray);
        const { t } = useTranslation();
        return (
          <Step step={SetupStep.chooseFactions} active={active}>
            <ComponentToggle
              selector={selectFactionArray}
              toggleComponent={toggleFaction}
              getLabelKey={(faction) => "faction." + faction.key + ".name"}
              getLockedKey={(faction) =>
                // Disable insurgent factions if we're only playing with 2 people and no bots or hirelings
                playerCount < 3 &&
                !faction.militant &&
                skippedSteps[SetupStep.setUpHireling1] &&
                skippedSteps[SetupStep.setUpBots]
                  ? "error.tooFewPlayerInsurgent"
                  : // Disable a faction if it was replaced by an equivilent hireling
                  excludedFactions.includes(faction.code)
                  ? "error.hirelingSelected"
                  : null
              }
            />
            {factions.some((faction) => faction.isVagabond && faction.enabled) ? (
              <>
                {t("label.selectVagabonds")}
                <ComponentToggle
                  selector={selectVagabondArray}
                  toggleComponent={toggleVagabond}
                  getLabelKey={(vagabond) => "vagabond." + vagabond.code + ".name"}
                />
              </>
            ) : null}
          </Step>
        );
      };
      break;

    case SetupStep.selectFaction:
      StepComponent = ({ flowSlice, active }) => {
        const { playerIndex } = flowSlice;
        const { playerOrder } = useAppSelector(selectSetupParameters);
        return (
          <Step
            step={SetupStep.selectFaction}
            active={active}
            translationOptions={{ count: playerOrder[playerIndex] }}
          >
            <FactionSelect flowSlice={flowSlice} />
          </Step>
        );
      };
      break;

    case SetupStep.setUpFaction:
      StepComponent = ({ flowSlice, active }) => {
        const { factionIndex, factionPool, vagabondSetUp } = flowSlice;
        const factionPoolEntry = useAppSelector((state) =>
          selectFactionPoolEntry(state, factionPool[factionIndex ?? 0])
        );
        const { t } = useTranslation();
        return (
          <Step
            step={SetupStep.setUpFaction}
            active={active}
            subtitleKey={
              factionIndex != null ? "faction." + factionPoolEntry.key + ".setupTitle" : undefined
            }
            textKey={
              factionIndex != null ? "faction." + factionPoolEntry.key + ".setup" : undefined
            }
            translationOptions={{
              context: vagabondSetUp ? "vagabondSetUp" : undefined,
              vagabond:
                factionPoolEntry.vagabond &&
                t("vagabond." + factionPoolEntry.vagabond.code + ".name"),
            }}
            components={
              factionPoolEntry.vagabond && {
                InitialStartingItems: (
                  <IconList list={factionPoolEntry.vagabond.startingItems.slice(0, -1)} />
                ),
                FinalStartingItem: (
                  <Icon
                    icon={
                      factionPoolEntry.vagabond.startingItems[
                        factionPoolEntry.vagabond.startingItems.length - 1
                      ]
                    }
                  />
                ),
              }
            }
          />
        );
      };
      break;

    case SetupStep.placeScoreMarkers:
      StepComponent = ({ flowSlice, active }) => (
        <Step
          step={SetupStep.placeScoreMarkers}
          active={active}
          translationOptions={{
            context: flowSlice.vagabondSetUp ? "vagabondSetUp" : undefined,
          }}
        />
      );
      break;

    case SetupStep.setupEnd:
      StepComponent = ({ active }) => {
        const { playerOrder } = useAppSelector(selectSetupParameters);
        const dispatch = useAppDispatch();
        const { t } = useTranslation();
        return (
          <Step
            step={SetupStep.setupEnd}
            active={active}
            translationOptions={{ count: playerOrder[0] }}
          >
            <Button Icon={RestartIcon} iconLeft={true} onClick={() => dispatch(resetFlow())}>
              {t("label.restartSetup")}
            </Button>
          </Step>
        );
      };
      break;

    default:
      StepComponent = ({ active }) => <Step step={step} active={active} />;
  }

  return memo(StepComponent);
};

export default getStepComponent;
