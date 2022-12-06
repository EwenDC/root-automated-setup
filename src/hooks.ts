import { useCallback } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
