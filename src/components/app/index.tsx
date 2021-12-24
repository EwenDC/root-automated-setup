import React from "react";
import {
  disableDeck,
  enableDeck,
  selectDecks,
} from "../../features/deck/deckSlice";
import {
  disableExpansion,
  enableExpansion,
  selectExpansions,
} from "../../features/expansion/expansionSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const expansions = useAppSelector(selectExpansions);
  const decks = useAppSelector(selectDecks);

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
    </div>
  );
};
