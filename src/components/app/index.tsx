import React from "react";
import {
  disableDeck,
  enableDeck,
  selectDeckArray,
} from "../../features/deck/deckSlice";
import {
  disableExpansion,
  enableExpansion,
  selectExpansionArray,
} from "../../features/expansion/expansionSlice";
import {
  disableFaction,
  enableFaction,
  selectFactionArray,
} from "../../features/faction/factionSlice";
import {
  disableHireling,
  enableHireling,
  selectHirelingArray,
} from "../../features/hireling/hirelingSlice";
import {
  disableLandmark,
  enableLandmark,
  selectLandmarkArray,
} from "../../features/landmark/landmarkSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const expansions = useAppSelector(selectExpansionArray);
  const decks = useAppSelector(selectDeckArray);
  const factions = useAppSelector(selectFactionArray);
  const hirelings = useAppSelector(selectHirelingArray);
  const landmarks = useAppSelector(selectLandmarkArray);

  return (
    <div>
      <div>
        Expansions:
        <ul>
          {expansions.map((expansion) => (
            <li key={expansion.code}>
              {expansion.name}{" "}
              {expansion.enabled ? (
                <button
                  onClick={() => dispatch(disableExpansion(expansion.code))}
                >
                  Disable
                </button>
              ) : (
                <button
                  onClick={() => dispatch(enableExpansion(expansion.code))}
                >
                  Enable
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Decks:
        <ul>
          {decks.map((deck) => (
            <li key={deck.code}>
              {deck.name}{" "}
              {deck.enabled ? (
                <button onClick={() => dispatch(disableDeck(deck.code))}>
                  Disable
                </button>
              ) : (
                <button onClick={() => dispatch(enableDeck(deck.code))}>
                  Enable
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Factions:
        <ul>
          {factions.map((faction) => (
            <li
              key={faction.code}
              style={{
                backgroundColor: faction.militant ? "red" : "white",
                width: "fit-content",
              }}
            >
              {faction.name}{" "}
              {faction.enabled ? (
                <button onClick={() => dispatch(disableFaction(faction.code))}>
                  Disable
                </button>
              ) : (
                <button onClick={() => dispatch(enableFaction(faction.code))}>
                  Enable
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {hirelings.length > 0 ? (
        <div>
          Hirelings:
          <ul>
            {hirelings.map((hireling) => (
              <li key={hireling.code}>
                {hireling.promoted.name} ({hireling.demoted.name}){" "}
                {hireling.enabled ? (
                  <button
                    onClick={() => dispatch(disableHireling(hireling.code))}
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(enableHireling(hireling.code))}
                  >
                    Enable
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {landmarks.length > 0 ? (
        <div>
          Landmarks:
          <ul>
            {landmarks.map((landmark) => (
              <li key={landmark.code}>
                {landmark.name}{" "}
                {landmark.enabled ? (
                  <button
                    onClick={() => dispatch(disableLandmark(landmark.code))}
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(enableLandmark(landmark.code))}
                  >
                    Enable
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
