import type { Expansion } from './types'

// ---------------------------------------------------------------------------------------------- //
//#region Game Constants

/** The amount of captain cards to deal in setup. */
export const CAPTAIN_DEAL_COUNT = 4

/** The number of clearings on a large sized map. */
export const LARGE_MAP_SIZE = 15

/** The maximum amount of corner setups allowed for standard setup. */
export const MAX_CORNER_SETUPS = 4 // Duh.

/** The minimum number of players required to skip flooding a map. */
export const MIN_PLAYERS_NO_FLOOD = 5

/** The number of clearings on a standard sized map. */
export const STANDARD_MAP_SIZE = 12

/** The number of clearings assigned to each suit. */
export const SUIT_CLEARING_COUNT = 4

//#endregion
// ---------------------------------------------------------------------------------------------- //
//#region Internal Constants

/** A static list of Root game component types. */
export const COMPONENT_TYPES = [
  'captains',
  'decks',
  'factions',
  'hirelings',
  'landmarks',
  'maps',
  'vagabonds',
] as const satisfies (keyof Expansion)[]

/** The lookup key used to save and load the "fixed suits" persisted setting for a map. */
export const FIXED_SUIT_KEY = 'fixedSuits'

/** The lookup key used to save and load the "use landmark" persisted setting for a map. */
export const USE_LANDMARK_KEY = 'useLandmark'

//#endregion
// ---------------------------------------------------------------------------------------------- //
