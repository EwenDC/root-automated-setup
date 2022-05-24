import { useTranslation } from "react-i18next";
import {
  enableMapLandmark,
  fixFirstPlayer,
  selectDeckArray,
  selectExpansionArray,
  selectFactionCodeArray,
  selectHirelingArray,
  selectLandmarkArray,
  selectEnabledLandmarkMaps,
  selectMapArray,
  selectSetupParameters,
  setLandmarkCount,
  setPlayerCount,
  skipSteps,
  toggleDeck,
  toggleExpansion,
  toggleHireling,
  toggleLandmark,
  toggleMap,
  selectFactionArray,
  toggleFaction,
  selectEnabledVagabondFactions,
  selectVagabondArray,
  toggleVagabond,
  selectFlowState,
  selectFactionPool,
  selectSetupMap,
} from "../../features";
import { SetupStep } from "../../types";
import Checkbox from "../checkbox";
import ComponentToggle from "../componentToggle";
import { FactionSelect } from "../factionSelect";
import { useAppDispatch, useAppSelector, useNthLastPlayer } from "../hooks";
import NumberSelector from "../numberSelector";
import Radiogroup from "../radiogroup";
import Step from "../step";
import styles from "./stepList.module.css";

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
  const map = useAppSelector(selectSetupMap);
  const { currentPlayerIndex, currentFactionIndex, vagabondSetUp } =
    useAppSelector(selectFlowState);
  const factionPool = useAppSelector(selectFactionPool);
  const { skippedSteps } = useAppSelector(selectFlowState);
  const landmarkMaps = useAppSelector(selectEnabledLandmarkMaps);
  const factionCodes = useAppSelector(selectFactionCodeArray);
  const vagabondFactions = useAppSelector(selectEnabledVagabondFactions);
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
          onChange={(checked) =>
            dispatch(skipSteps(SetupStep.setUpBots, !checked))
          }
        />
      </Step>
      <Step step={SetupStep.seatPlayers}>
        <NumberSelector
          id="playerCount"
          value={playerCount}
          minVal={skippedSteps[SetupStep.setUpBots] ? 2 : 1}
          maxVal={factionCodes.length - 1}
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
        {landmarkMaps.length > 0 ? (
          <Checkbox
            id="useMapLandmark"
            defaultValue={useMapLandmark}
            onChange={(checked) => dispatch(enableMapLandmark(checked))}
          />
        ) : null}
      </Step>
      <Step
        step={SetupStep.setUpMap}
        textKey={"map." + map?.code + ".setup"}
        translationOptions={{ map: map && t("map." + map.code + ".name") }}
      />
      <Step
        step={SetupStep.setUpMapLandmark}
        textKey={"map." + map?.code + ".landmarkSetup"}
        translationOptions={{
          landmark: map?.landmark && t("landmark." + map.landmark + ".name"),
        }}
      />
      <Step step={SetupStep.chooseDeck}>
        <ComponentToggle
          selector={selectDeckArray}
          toggleComponent={toggleDeck}
          getLabelKey={(deck) => "deck." + deck.code}
        />
      </Step>
      <Step
        step={SetupStep.setUpDeck}
        renderTitle={skippedSteps[SetupStep.chooseDeck]}
        renderSubtitle={!skippedSteps[SetupStep.chooseDeck]}
        translationOptions={{
          context: playerCount < 3 ? "twoPlayer" : undefined,
          deck: deck && t("deck." + deck),
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
        textKey={"landmark." + landmark1 + ".setup"}
        translationOptions={{
          context: map?.code,
          count: nthLastPlayer(1),
          landmark: landmark1 && t("landmark." + landmark1 + ".name"),
        }}
      />
      <Step
        step={SetupStep.setUpLandmark2}
        textKey={"landmark." + landmark2 + ".setup"}
        translationOptions={{
          context: map?.code,
          count: nthLastPlayer(2),
          landmark: landmark2 && t("landmark." + landmark2 + ".name"),
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
              hireling.factions.some((faction) =>
                factionCodes.includes(faction)
              )
                ? "error.factionHirelingExcluded"
                : null
            }
          />
        ) : null}
      </Step>
      <Step
        step={SetupStep.setUpHireling1}
        textKey={"hireling." + hireling1?.code + ".setup"}
        translationOptions={{
          context: hireling1?.demoted ? "demoted" : undefined,
          count: nthLastPlayer(1),
          hireling:
            hireling1 &&
            t("hireling." + hireling1.code + ".name", {
              context: hireling1.demoted ? "demoted" : undefined,
            }),
        }}
      />
      <Step
        step={SetupStep.setUpHireling2}
        textKey={"hireling." + hireling2?.code + ".setup"}
        translationOptions={{
          context: hireling2?.demoted ? "demoted" : undefined,
          count: nthLastPlayer(2),
          hireling:
            hireling2 &&
            t("hireling." + hireling2.code + ".name", {
              context: hireling2.demoted ? "demoted" : undefined,
            }),
        }}
      />
      <Step
        step={SetupStep.setUpHireling3}
        textKey={"hireling." + hireling3?.code + ".setup"}
        translationOptions={{
          context: hireling3?.demoted ? "demoted" : undefined,
          count: nthLastPlayer(3),
          hireling:
            hireling3 &&
            t("hireling." + hireling3.code + ".name", {
              context: hireling3.demoted ? "demoted" : undefined,
            }),
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
        {vagabondFactions.length > 0 ? (
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
        textKey={
          currentFactionIndex != null
            ? "faction." + factionPool[currentFactionIndex].key + ".setup"
            : undefined
        }
        translationOptions={{
          context: vagabondSetUp ? "vagabondSetUp" : undefined,
          faction:
            currentFactionIndex != null
              ? t("faction." + factionPool[currentFactionIndex].key + ".name")
              : undefined,
          vagabond:
            currentFactionIndex != null &&
            factionPool[currentFactionIndex].vagabond
              ? t(
                  "vagabond." +
                    factionPool[currentFactionIndex].vagabond?.code +
                    ".name"
                )
              : undefined,
        }}
      />
      <Step
        step={SetupStep.placeScoreMarkers}
        translationOptions={{
          context: vagabondSetUp ? "vagabondSetUp" : undefined,
        }}
      />
      <Step step={SetupStep.chooseHand} />
      <Step
        step={SetupStep.setupEnd}
        translationOptions={{ count: playerOrder[0] }}
      />
    </main>
  );
};
