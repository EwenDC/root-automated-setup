import type { SetupStepDefinition } from '..'

import { MIN_PLAYERS_NO_FLOOD } from '../../constants'
import { getEnabled } from '../../functions/filtering'
import { type SetupClearing, solveMapBalanced, solveMapRandom } from '../../functions/mapSolvers'
import { takeRandom } from '../../functions/random'
import {
  lockMap,
  massComponentLock,
  selectMapArray,
  setClearings,
  setErrorMessage,
  setMap,
} from '../../store'
import { SetupStep } from '../../types'
import ChooseMapStep from '../components/chooseMapStep'

export const chooseMap: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { setup } = getState()
    // Exclude maps that don't support bots (if we wish to do bot setup)
    dispatch(
      massComponentLock(
        selectMapArray,
        ({ botPriorities }) => setup.includeBots && !botPriorities && 'error.mapBotsUnsupported',
        lockMap,
      ),
    )
    return null
  },

  component: ChooseMapStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const mapPool = getEnabled(selectMapArray(state))

    // Check that at least one map is available for selection
    if (mapPool.length < 1) {
      dispatch(setErrorMessage('error.noMap'))
      return null
    }

    // Choose a random map
    const map = takeRandom(mapPool)
    dispatch(setMap(map))

    // Assign the map suits based on player preferences
    const floodClearings = state.setup.playerCount < MIN_PLAYERS_NO_FLOOD
    let clearings: SetupClearing[]

    if (map.fixedSuits && map.defaultSuits) {
      clearings = map.clearings.map((clearing, index) => ({
        ...clearing,
        suit: map.defaultSuits![index]!,
      }))
    } else if (state.setup.balancedSuits) {
      clearings = solveMapBalanced(map, floodClearings)
    } else {
      clearings = solveMapRandom(map, floodClearings)
    }

    dispatch(setClearings(clearings))
    return SetupStep.setUpMap
  },
}
