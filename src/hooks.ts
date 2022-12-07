import { createSelector } from "@reduxjs/toolkit";
import { useCallback, useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { selectFactionArray, selectVagabondArray } from "./features/selectors";
import type { RootState, AppDispatch } from "./store";
import { FactionEntry } from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Generates a redux selector for getting a stable-reference version of the faction pool
 * @param factionPool The raw faction entries that will be used to generate the faction pool
 * @returns The faction pool, with all faction and vagabond information included
 */
export const useSelectFactionPool = (factionPool: FactionEntry[]) =>
  useMemo(
    () =>
      createSelector(
        (state: RootState) => selectFactionArray(state),
        (state: RootState) => selectVagabondArray(state),
        (factionArray, vagabondArray) =>
          factionPool.map(({ code, vagabond }) => ({
            ...factionArray.find(({ code: factionCode }) => factionCode === code)!,
            vagabond:
              typeof vagabond === "string"
                ? vagabondArray.find(({ code: vagabondCode }) => vagabondCode === vagabond)
                : undefined,
          }))
      ),
    [factionPool]
  );

/** Returns a function for returning the player number for a specifed point in turn order */
export const useNthLastPlayer = () => {
  const playerOrder = useAppSelector((state) => state.setup.playerOrder);
  return useCallback(
    (position: number) => {
      if (playerOrder.length > 0) {
        let index = -position;
        do {
          index += playerOrder.length;
        } while (index < 0);
        return playerOrder[index];
      }
      return 0;
    },
    [playerOrder]
  );
};
