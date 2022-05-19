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
  const { currentPlayerIndex, currentFactionIndex } =
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
        subtitleOptions={{ map: map && t("map." + map.code + ".name") }}
        textKey={"map." + map?.code + ".setup"}
      />
      <Step
        step={SetupStep.setUpMapLandmark}
        subtitleOptions={{
          landmark: map?.landmark && t("landmark." + map.landmark + ".name"),
        }}
        textKey={"map." + map?.code + ".landmarkSetup"}
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
        subtitleOptions={{ deck: deck && t("deck." + deck) }}
        textOptions={{ deck: deck && t("deck." + deck) }}
      />
      <Step step={SetupStep.setUpBots} />
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
      <Step step={SetupStep.chooseLandmarks}>
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
        subtitleOptions={{
          landmark: landmark1 && t("landmark." + landmark1 + ".name"),
        }}
        textKey={"landmark." + landmark1 + ".setup"}
        textCount={nthLastPlayer(1)} // Last player in turn order
      />
      <Step
        step={SetupStep.setUpLandmark2}
        subtitleOptions={{
          landmark: landmark2 && t("landmark." + landmark2 + ".name"),
        }}
        textKey={"landmark." + landmark2 + ".setup"}
        textCount={nthLastPlayer(2)} // Second last player in turn order
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
        subtitleOptions={{
          hireling:
            hireling1 &&
            t("hireling." + hireling1.code + ".name", {
              context: hireling1.demoted ? "demoted" : undefined,
            }),
        }}
        textKey={"hireling." + hireling1?.code + ".setup"}
        textCount={nthLastPlayer(1)} // Last player in turn order
        textOptions={{ context: hireling1?.demoted ? "demoted" : undefined }}
      />
      <Step
        step={SetupStep.setUpHireling2}
        subtitleOptions={{
          hireling:
            hireling2 &&
            t("hireling." + hireling2.code + ".name", {
              context: hireling2.demoted ? "demoted" : undefined,
            }),
        }}
        textKey={"hireling." + hireling2?.code + ".setup"}
        textCount={nthLastPlayer(2)} // Second last player in turn order
        textOptions={{ context: hireling2?.demoted ? "demoted" : undefined }}
      />
      <Step
        step={SetupStep.setUpHireling3}
        subtitleOptions={{
          hireling:
            hireling3 &&
            t("hireling." + hireling3.code + ".name", {
              context: hireling3.demoted ? "demoted" : undefined,
            }),
        }}
        textKey={"hireling." + hireling3?.code + ".setup"}
        textCount={nthLastPlayer(3)} // Third last player in turn order
        textOptions={{ context: hireling3?.demoted ? "demoted" : undefined }}
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
        textCount={playerOrder[currentPlayerIndex]}
      >
        <FactionSelect />
      </Step>
      <Step
        step={SetupStep.setUpFaction}
        subtitleOptions={{
          faction:
            currentFactionIndex != null
              ? t("faction." + factionPool[currentFactionIndex].key + ".name")
              : undefined,
        }}
        textKey={
          currentFactionIndex != null
            ? "faction." + factionPool[currentFactionIndex].key + ".setup"
            : undefined
        }
        textOptions={{
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
      <Step step={SetupStep.placeScoreMarkers} />
      <Step step={SetupStep.chooseHand} />
      <Step step={SetupStep.setupEnd} textCount={playerOrder[0]} />
    </main>
  );
};
