import type { Expansion } from './types'

// ---------------------------------------------------------------------------------------------- //
//#region Game Constants

/** The amount of captain cards to deal in setup. */
export const CAPTAIN_DEAL_COUNT = 4

/** The amount of hirelings to include in setup (when following official rules). */
export const HIRELING_SETUP_COUNT = 3

/** The number of clearings on a large sized map. */
export const LARGE_MAP_SIZE = 15

/** The maximum amount of corner setups allowed for standard setup. */
export const MAX_CORNER_SETUPS = 4 // Duh.

/** The maximum amount of landmarks that can be included (when following official rules). */
export const MAX_LANDMARKS = 2

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
//#region Local Storage Keys

export const SETTING_BALANCED_SUITS = 'balancedSuits'
export const SETTING_FIXED_FIRST_PLAYER = 'fixedFirstPlayer'
export const SETTING_HIRELING_COUNT = 'hirelingCount'
export const SETTING_INCLUDE_BOTS = 'includeBotStep'
export const SETTING_LANDMARK_COUNT = 'landmarkCount'
export const SETTING_PLAYER_COUNT = 'playerCount'
export const SETTING_USE_DRAFT = 'useDraft'

export const LEGACY_SETTING_INCLUDE_HIRELINGS = 'includeHirelings'

//#endregion
// ---------------------------------------------------------------------------------------------- //
