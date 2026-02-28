import type { SetupStepDefinition } from '..'

import { CAPTAIN_DEAL_COUNT, MAX_CORNER_SETUPS } from '../../constants'
import { countMatches, getEnabled } from '../../functions/filtering'
import { takeRandom } from '../../functions/random'
import {
  addToFactionPool,
  lockFaction,
  massComponentLock,
  massComponentToggle,
  resetFactionPool,
  selectCaptainArray,
  selectFactionArray,
  selectFactionCodes,
  selectVagabondArray,
  setCurrentIndex,
  setCurrentPlayerIndex,
  setErrorMessage,
  setLimitCaptains,
  setLimitVagabonds,
  setUseDraft,
  toggleCaptain,
  toggleVagabond,
} from '../../store'
import { type CaptainCode, type FactionCode, SetupStep, type VagabondCode } from '../../types'
import ChooseFactionsStep from '../components/chooseFactionsStep'

export const chooseFactions: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const state = getState()
    const playerCount = state.setup.playerCount

    // Don't allow draft setup if we can't spare an extra faction
    const factionCodes = selectFactionCodes(state)
    const noSpareFactions = playerCount >= factionCodes.size
    if (noSpareFactions) dispatch(setUseDraft(false))

    // Disable the factions that are mutually exclusive with the selected hirelings
    // Also disable insurgent factions if we're only playing with 2 people and no bots or hirelings
    dispatch(
      massComponentLock(
        selectFactionArray,
        ({ code, militant }) => {
          // Disable insurgent factions if we're only playing with 2 people and no bots or hirelings
          if (
            playerCount < 3 &&
            !militant &&
            state.setup.hirelingCount < 1 &&
            !state.setup.includeBots
          ) {
            return 'error.tooFewPlayerInsurgent'
          }
          // Disable a faction if it was replaced by an equivalent hireling
          if (state.setup.excludedFactions.includes(code)) return 'error.hirelingSelected'
          return false
        },
        lockFaction,
      ),
    )

    // Set limitVagabonds based on whether we previously limited the vagabond selection
    dispatch(setLimitVagabonds(selectVagabondArray(state).some(vagabond => !vagabond.enabled)))

    // Set limitCaptains based on whether we previously limited the captain selection
    dispatch(setLimitCaptains(selectCaptainArray(state).some(captain => !captain.enabled)))

    return null
  },

  component: ChooseFactionsStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const useDraft = state.flow.useDraft
    const playerCount = state.setup.playerCount

    // Clear the faction pool of any potential stale data from previous setups
    if (state.flow.factionPool.length > 0) dispatch(resetFactionPool())

    // Get our list of militant and insurgent factions which are available for selection
    const workingFactionPool = selectFactionArray(state).filter(
      ({ enabled, militant }) => enabled && militant,
    )
    const insurgentFactions = selectFactionArray(state).filter(
      ({ enabled, militant }) => enabled && !militant,
    )
    let vagabondPool: VagabondCode[] | undefined
    let captainPool: CaptainCode[] | undefined

    // Validate and set up the vagabond/captain pool for draft setup
    if (useDraft) {
      if (state.setup.limitVagabonds) {
        // To keep the previous steps clean, disable if no vagabonds were actually deselected
        if (selectVagabondArray(state).every(vagabond => vagabond.enabled)) {
          dispatch(setLimitVagabonds(false))
        }
      } else {
        // Make sure to enable all vagabonds if limitVagabonds is false to prevent confusion
        dispatch(massComponentToggle(selectVagabondArray, true, toggleVagabond))
      }
      vagabondPool = getEnabled(selectVagabondArray(getState())).map(({ code }) => code)

      // Get our vagabond faction count to validate our vagabondPool against
      const vagabondFactionCount = countMatches(
        workingFactionPool.concat(insurgentFactions),
        ({ dealVagabond }) => dealVagabond ?? false,
      )
      if (vagabondPool.length < vagabondFactionCount) {
        dispatch(setErrorMessage('error.tooFewVagabond'))
        return null
      }

      // Make sure to enable all captains if limitCaptains is false to prevent confusion
      if (state.setup.limitCaptains) {
        // To keep the previous steps clean, disable if no captains were actually deselected
        if (selectCaptainArray(state).every(captain => captain.enabled)) {
          dispatch(setLimitCaptains(false))
        }
      } else {
        // Make sure to enable all captains if limitCaptains is false to prevent confusion
        dispatch(massComponentToggle(selectCaptainArray, true, toggleCaptain))
      }
      captainPool = getEnabled(selectCaptainArray(getState())).map(({ code }) => code)

      // Get our knave faction count to validate our captainPool against
      const captainFactionCount = countMatches(
        workingFactionPool.concat(insurgentFactions),
        ({ dealCaptains }) => dealCaptains ?? false,
      )
      if (captainPool.length < captainFactionCount * CAPTAIN_DEAL_COUNT) {
        dispatch(setErrorMessage('error.tooFewCaptains'))
        return null
      }
    }

    // Set the appropriate number of factions for setup
    const factionCount = useDraft ? playerCount + 1 : playerCount

    // Check that there are enough factions available for setup
    if (
      workingFactionPool.length < 1 ||
      workingFactionPool.length + insurgentFactions.length < factionCount
    ) {
      // Set the correct error message
      dispatch(
        setErrorMessage(
          workingFactionPool.length < 1 ? 'error.noMilitantFaction' : 'error.tooFewFaction',
        ),
      )
      return null
    }

    // Start by adding a random militant faction
    const firstFaction = takeRandom(workingFactionPool)
    dispatch(addToFactionPool(firstFaction, vagabondPool, captainPool))
    // Add the insurgent factions to the mix
    workingFactionPool.push(...insurgentFactions)

    let factionsSetUp = 1
    // Keep track of if we've already used a corner in standard setup
    let cornerSetupCount = !useDraft && firstFaction.standardSetup.cornerSetup ? 1 : 0
    const incompatibleFactions = new Set<FactionCode>(firstFaction.excludeFactions)

    // Add enough factions to make the total pool equal factionCount
    while (factionsSetUp < factionCount && workingFactionPool.length > 0) {
      const candidateFaction = takeRandom(workingFactionPool)

      if (
        // Make sure we don't include more than 4 corner clearing factions in standard setup
        (useDraft ||
          !candidateFaction.standardSetup.cornerSetup ||
          cornerSetupCount < MAX_CORNER_SETUPS) &&
        // Don't include any factions that are incompatible with ones already chosen
        !incompatibleFactions.has(candidateFaction.code)
      ) {
        dispatch(addToFactionPool(candidateFaction, vagabondPool, captainPool))
        factionsSetUp++
        if (!useDraft && candidateFaction.standardSetup.cornerSetup) cornerSetupCount++
        if (candidateFaction.excludeFactions) {
          candidateFaction.excludeFactions.forEach(faction => incompatibleFactions.add(faction))
        }
      }
    }

    // Check if we were able to set up
    if (factionsSetUp < factionCount) {
      // Show appropriate error message
      dispatch(
        setErrorMessage(
          cornerSetupCount >= MAX_CORNER_SETUPS
            ? 'error.tooManyCornerSetup'
            : 'error.tooFewFaction',
        ),
      )
      return null
    }

    dispatch(setCurrentPlayerIndex(null))
    dispatch(setCurrentIndex(null))
    return SetupStep.selectFaction
  },
}
