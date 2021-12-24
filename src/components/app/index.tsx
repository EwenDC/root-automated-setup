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
import { useAppDispatch, useAppSelector } from "../hooks";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const expansions = useAppSelector(selectExpansionArray);
  const decks = useAppSelector(selectDeckArray);
  const factions = useAppSelector(selectFactionArray);

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
    </div>
  );
};
