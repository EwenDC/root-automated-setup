import { useTranslation } from "react-i18next";
import {
  enableMapLandmark,
  fixFirstPlayer,
  setLandmarkCount,
  setPlayerCount,
} from "../features/setupSlice";
import {
  selectDeckArray,
  selectExpansionArray,
  selectFactionArray,
  selectFactionCodeArray,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
  selectSetupParameters,
  selectFlowState,
  selectFactionPool,
  selectSetupMap,
  selectVagabondArray,
} from "../features/selectors";
import { skipSteps, resetFlow } from "../features/flowSlice";
import {
  toggleDeck,
  toggleExpansion,
  toggleHireling,
  toggleLandmark,
  toggleMap,
  toggleFaction,
  toggleVagabond,
} from "../features/componentsSlice";
import { SetupStep } from "../types";
import Checkbox from "./checkbox";
import ComponentToggle from "./componentToggle";
import { FactionSelect } from "./factionSelect";
import { useAppDispatch, useAppSelector, useNthLastPlayer } from "../hooks";
import NumberSelector from "./numberSelector";
import Radiogroup from "./radiogroup";
import Step from "./step";
import styles from "./css/stepList.module.css";
import { ReactComponent as RestartIcon } from "../images/icons/restart.svg";
import Button from "./button";
import IconList from "./iconList";
import Icon from "./icon";

export const StepList: React.FC = () => {
  const {
    playerCount,
    fixedFirstPlayer,
    useMapLandmark,
    deck,
    landmarkCount,
    landmark1,
    landmark2,
    hireling1,
    hireling2,
    hireling3,
    excludedFactions,
    playerOrder,
  } = useAppSelector(selectSetupParameters);
  const { currentPlayerIndex, currentFactionIndex, vagabondSetUp } =
    useAppSelector(selectFlowState);
  const { skippedSteps } = useAppSelector(selectFlowState);

  const factions = useAppSelector(selectFactionArray);
  const maps = useAppSelector(selectMapArray);
  const map = useAppSelector(selectSetupMap);
  const factionCodes = useAppSelector(selectFactionCodeArray);
  const factionPool = useAppSelector(selectFactionPool);
  const selectedVagabond =
    currentFactionIndex != null ? factionPool[currentFactionIndex].vagabond : undefined;

  const dispatch = useAppDispatch();
  const nthLastPlayer = useNthLastPlayer();
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <Step step={SetupStep.chooseExpansions}>
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
          onChange={(checked) => dispatch(skipSteps(SetupStep.setUpBots, !checked))}
        />
      </Step>
      <Step step={SetupStep.seatPlayers}>
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
      <Step step={SetupStep.chooseMap}>
        <ComponentToggle
          selector={selectMapArray}
          toggleComponent={toggleMap}
          getLabelKey={(map) => "map." + map.code + ".name"}
        />
        {maps.some((map) => map.landmark && map.enabled) ? (
          <Checkbox
            id="useMapLandmark"
            defaultValue={useMapLandmark}
            onChange={(checked) => dispatch(enableMapLandmark(checked))}
          />
        ) : null}
      </Step>
      <Step
        step={SetupStep.setUpMap}
        subtitleKey={"map." + map?.code + ".setupTitle"}
        textKey={"map." + map?.code + ".setup"}
      />
      <Step
        step={SetupStep.setUpMapLandmark}
        subtitleKey={"landmark." + map?.landmark + ".setupTitle"}
        textKey={"map." + map?.code + ".landmarkSetup"}
        translationOptions={{ context: map?.code }}
      />
      <Step step={SetupStep.chooseDeck}>
        <ComponentToggle
          selector={selectDeckArray}
          toggleComponent={toggleDeck}
          getLabelKey={(deck) => "deck." + deck.code + ".name"}
        />
      </Step>
      <Step
        step={SetupStep.setUpDeck}
        renderTitle={skippedSteps[SetupStep.chooseDeck]}
        renderSubtitle={!skippedSteps[SetupStep.chooseDeck]}
        subtitleKey={"deck." + deck + ".setupTitle"}
        textKey={"deck." + deck + ".setup"}
        translationOptions={{
          context: playerCount < 3 ? "twoPlayer" : undefined,
        }}
      />
      <Step step={SetupStep.setUpBots} />
      <Step
        step={SetupStep.chooseLandmarks}
        translationOptions={{
          context: useMapLandmark && map?.landmark ? "mapLandmark" : undefined,
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
                useMapLandmark && landmark.code === map?.landmark
                ? "error.mapLandmarkUsed"
                : null
            }
          />
        ) : null}
      </Step>
      <Step
        step={SetupStep.setUpLandmark1}
        subtitleKey={"landmark." + landmark1 + ".setupTitle"}
        textKey={"landmark." + landmark1 + ".setup"}
        translationOptions={{
          context: map?.code,
          count: nthLastPlayer(1),
        }}
      />
      <Step
        step={SetupStep.setUpLandmark2}
        subtitleKey={"landmark." + landmark2 + ".setupTitle"}
        textKey={"landmark." + landmark2 + ".setup"}
        translationOptions={{
          context: map?.code,
          count: nthLastPlayer(2),
        }}
      />
      <Step step={SetupStep.chooseHirelings}>
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
      <Step
        step={SetupStep.setUpHireling1}
        subtitleKey={"hireling." + hireling1?.code + ".setupTitle"}
        textKey={"hireling." + hireling1?.code + ".setup"}
        translationOptions={{
          context: hireling1?.demoted ? "demoted" : undefined,
          count: nthLastPlayer(1),
        }}
      />
      <Step
        step={SetupStep.setUpHireling2}
        subtitleKey={"hireling." + hireling2?.code + ".setupTitle"}
        textKey={"hireling." + hireling2?.code + ".setup"}
        translationOptions={{
          context: hireling2?.demoted ? "demoted" : undefined,
          count: nthLastPlayer(2),
        }}
      />
      <Step
        step={SetupStep.setUpHireling3}
        subtitleKey={"hireling." + hireling3?.code + ".setupTitle"}
        textKey={"hireling." + hireling3?.code + ".setup"}
        translationOptions={{
          context: hireling3?.demoted ? "demoted" : undefined,
          count: nthLastPlayer(3),
        }}
      />
      <Step step={SetupStep.postHirelingSetup} />
      <Step step={SetupStep.drawCards} />
      <Step step={SetupStep.chooseFactions}>
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
      <Step
        step={SetupStep.selectFaction}
        translationOptions={{ count: playerOrder[currentPlayerIndex] }}
      >
        <FactionSelect />
      </Step>
      <Step
        step={SetupStep.setUpFaction}
        subtitleKey={
          currentFactionIndex != null
            ? "faction." + factionPool[currentFactionIndex].key + ".setupTitle"
            : undefined
        }
        textKey={
          currentFactionIndex != null
            ? "faction." + factionPool[currentFactionIndex].key + ".setup"
            : undefined
        }
        translationOptions={{
          context: vagabondSetUp ? "vagabondSetUp" : undefined,
          vagabond: selectedVagabond && t("vagabond." + selectedVagabond.code + ".name"),
        }}
        components={
          selectedVagabond && {
            InitialStartingItems: <IconList list={selectedVagabond.startingItems.slice(0, -1)} />,
            FinalStartingItem: (
              <Icon
                icon={selectedVagabond.startingItems[selectedVagabond.startingItems.length - 1]}
              />
            ),
          }
        }
      />
      <Step
        step={SetupStep.placeScoreMarkers}
        translationOptions={{
          context: vagabondSetUp ? "vagabondSetUp" : undefined,
        }}
      />
      <Step step={SetupStep.chooseHand} />
      <Step step={SetupStep.setupEnd} translationOptions={{ count: playerOrder[0] }}>
        <Button Icon={RestartIcon} iconLeft={true} onClick={() => dispatch(resetFlow())}>
          {t("label.restartSetup")}
        </Button>
      </Step>
    </main>
  );
};

export default StepList;
