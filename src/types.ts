import type { SetupState } from './store'

/** An object with an associated code. */
export interface CodeObject {
  code: string
}

export type DeepReadonly<T> = T extends object
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>
    }
  : T

/** A utility type for extracting the value types of a provided `Record`-like object. */
export type ValueOf<T> = NonNullable<T>[keyof T]

/** Adds the field "code" to an existing type. */
export type WithCode<T> = CodeObject & T

// ---------------------------------------------------------------------------------------------- //
//#region Game Components

/** A basic game component, with an associated image. */
export interface GameComponent {
  image: string
  defaultDisabled?: boolean
}

/** An object representing a game component that precludes the use of certain factions in setup. */
export interface FactionExcludingComponent extends GameComponent {
  excludeFactions?: FactionCode[]
}

/** A unique identifier for a Captain character. */
export type CaptainCode = string

/** A unique identifier for an Expansion. */
export type ExpansionCode = string

/** An object representing an Expansion or Base Box for the Root board game. */
export interface Expansion extends GameComponent {
  captains?: Record<CaptainCode, Vagabond>
  decks?: Record<DeckCode, GameComponent>
  factions?: Record<FactionCode, Faction>
  hirelings?: Record<HirelingCode, Hireling>
  landmarks?: Record<LandmarkCode, Landmark>
  maps?: Record<MapCode, LargeMap | StandardMap>
  vagabonds?: Record<VagabondCode, Vagabond>
  bots?: Record<BotCode, Bot>
}

/** A unique identifier for a Deck. */
export type DeckCode = string

/** Information for an individual game piece (e.g. a token, a meeple). */
export interface GamePiece {
  count: number
  image: string
}

/** The index of an entry in a 3 entry list. */
export type ThreeIndex = 0 | 1 | 2

/** A unique identifier for a Faction. */
export type FactionCode = string

/** An object representing a Faction from the Root board game. */
export interface Faction extends FactionExcludingComponent {
  /** An identifier for a faction that is used to group multiple instances of the same faction. */
  key: string
  militant?: boolean
  dealVagabond?: boolean
  dealCaptains?: boolean
  standardSetup: {
    order: number
    cornerSetup?: boolean
  }
  pieces: {
    warriors: number
    buildings?: GamePiece
    tokens?: GamePiece
  }
  stats: {
    complexity: ThreeIndex
    wealth: ThreeIndex
    aggression: ThreeIndex
    crafting: ThreeIndex
  }
}

/** A unique identifier for a Hireling. */
export type HirelingCode = string

/** A unique identifier for a Landmark. */
export type LandmarkCode = string

export type BotCode = string

export interface Bot extends GameComponent {
  baseFactionCode: FactionCode
  clockroot?: string
  excludeFactions?: FactionCode[]
}

/** An object representing a Landmark piece from the Root board game. */
export interface Landmark extends GameComponent {
  minPlayers: number
  isValidPlacement?: PlacementValidator
}

/** A shape that groups floodable clearings. */
export type FloodGroup = 'circle' | 'square' | 'triangle'

/**
 * An object representing a Map's Clearing and it's position in the Map Chart, alongside extra data
 * that may be relevant for setup.
 */
export interface Clearing {
  x: number
  y: number
  floodGroup?: FloodGroup
  ruin?: boolean
  fallbackRuin?: boolean
  corner?: boolean
  coastal?: boolean
  mapEdge?: boolean
  buildingSlots?: number
  suit?: ClearingSuit
  adjacentClearings?: number[]
}

/** The name of a map clearing suit. */
export type ClearingSuit = 'fox' | 'mouse' | 'none' | 'rabbit'

/** A number used to rank the priority of a clearing for bot actions. */
export type ClearingPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * A tuple representing a path connecting two clearings, as referenced by their index in the
 * clearing list.
 */
export type Path<ClearingIndex extends number = number> = [from: ClearingIndex, to: ClearingIndex]

/**
 * A tuple representing a path connecting two clearings, as referenced by their index in the
 * clearing list. Also indicates if the path floods alongside any clearings it connects.
 */
export type FloodablePath<ClearingIndex extends number = number> = [
  ...Path<ClearingIndex>,
  floods?: boolean,
]

/** Clearing Data for landmark/hireling clearing validation. */
export interface SetupClearing extends Clearing {
  suit: ClearingSuit
  flooded?: boolean
}

export interface SetupMapState {
  code: MapCode
  clearings: SetupClearing[]
  useLandmark?: boolean
  landmark?: {
    clearing: number
    x: number
    y: number
    angle?: number
    image: string
    code: string
  }
  useHireling?: boolean
  hireling?: {
    clearing: number
    x: number
    y: number
    angle?: number
    image: string
    code: string
  }
}

export type PlacementValidator = (
  clearingIndex: number,
  clearingData: SetupClearing,
  mapData: SetupMapState,
  setupState: SetupState,
) => boolean

export type LandmarkRule = 'corner' | 'fox' | 'mouse' | 'rabbit' | 'river' | 'ruin' | 'singleSlot'
export interface Landmark extends GameComponent {
  isValidPlacement?: PlacementValidator
  placementRules?: LandmarkRule[]
}
export type HirelingRule =
  | 'allClearings' // Forest Patrol: placed in every clearing
  | 'allRuins' // Warm Sun Prophets: placed in every ruin
  | 'forest' // (The Exile)
  | 'mapEdge'
  | 'matchFirstSuit' // Corvid Spies: 2nd placement must match 1st
  | 'openBuildingSlot'
  | 'path' // (Highway Bandits)
  | 'randomSuit' // Spring Uprising: Restricted to a randomly rolled suit
  | 'river'
  | 'ruin'

export interface Hireling extends FactionExcludingComponent {
  isValidPlacement?: PlacementValidator
  placementRules?: HirelingRule[]
  placementCount?: number
  allowSameClearing?: boolean
  autoPlacement?: 'allClearings' | 'allRuins'
}

/** An object representing details for a Landmark as it appears on a specific map. */
export interface MapLandmark<ClearingIndex extends number = number> {
  code: LandmarkCode
  clearing: ClearingIndex
  x: number
  y: number
  angle?: number
}
export interface MapHireling<ClearingIndex extends number = number> {
  code: HirelingCode
  clearing: ClearingIndex
  x: number
  y: number
  angle?: number
}

/** A unique identifier for a Map. */
export type MapCode = string

/** An object representing a Map of any size from the Root board game. */
export interface Map extends GameComponent {
  clearings: Clearing[]
  botPriorities?: ClearingPriority[]
  defaultSuits?: ClearingSuit[]
  printedSuits?: boolean
  paths: FloodablePath[]
  backImage: string
  landmark?: MapLandmark
  floodImage?: string
  suitLandmarks?: Record<ClearingSuit, LandmarkCode>
  hireling?: MapHireling
}

/** A list with exactly 12 entries. */
export type TwelveList<T> = [T, T, T, T, T, T, T, T, T, T, T, T]

/** The index of an entry in a 12 entry list. */
export type TwelveIndex = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | ThreeIndex

/**
 * An object representing a Clearing that can appear on a standard sized map. Such clearings cannot
 * flood so lack data related to flooding.
 */
export interface StandardClearing extends Clearing {
  floodGroup?: never
  ruin?: boolean
  fallbackRuin?: false
}

/** An object representing a standard size Map from the Root board game. */
export interface StandardMap extends Map {
  clearings: TwelveList<StandardClearing>
  botPriorities?: TwelveList<ClearingPriority>
  defaultSuits?: TwelveList<ClearingSuit>
  paths: Path<TwelveIndex>[]
  landmark?: MapLandmark<TwelveIndex>
  floodImage?: never
  suitLandmarks?: never
  hireling?: MapHireling<TwelveIndex>
}

/**
 * An object representing a Clearing that can appear on a large sized map. Such clearings can either
 * match standard clearings, or have extra data related to flooding.
 */
export type LargeClearing =
  | (Clearing & {
      floodGroup: FloodGroup
    } & (
        | {
            ruin?: boolean
            fallbackRuin?: false
          }
        | {
            ruin?: false
            fallbackRuin?: boolean
          }
      ))
  | StandardClearing

/** A list with exactly 15 entries. */
export type FifteenList<T> = [...TwelveList<T>, T, T, T]

/** The index of an entry in a 15 entry list. */
export type FifteenIndex = 12 | 13 | 14 | TwelveIndex

/** An object representing a large size Map from the Root board game. */
export interface LargeMap extends Map {
  clearings: FifteenList<LargeClearing>
  botPriorities?: never
  defaultSuits?: never
  paths: FloodablePath<FifteenIndex>[]
  landmark?: never
  floodImage: string
  suitLandmarks: Record<ClearingSuit, LandmarkCode>
  hireling?: never
}

/** The name of a vagabond item. */
export type Item = 'bag' | 'boot' | 'coin' | 'crossbow' | 'hammer' | 'sword' | 'tea' | 'torch'

/** A unique identifier for a Vagabond character. */
export type VagabondCode = string

/** An object representing a Vagabond character from the Root board game. */
export interface Vagabond extends GameComponent {
  startingItems: Item[]
}

//#endregion
// ---------------------------------------------------------------------------------------------- //
//#region Setup State

/** An object with an associated enable/disable state. */
export interface Togglable {
  enabled: boolean
  locked: false | string
}

/**
 * Generic information about a game component, namely whether it is enabled and what expansion it is
 * from.
 */
export interface ComponentInfo extends Togglable {
  expansionCode: ExpansionCode
}

/**
 * Generic information about a map component, namely whether to use it's default suits or included
 * landmark (if it has them)
 */
export interface MapInfo extends ComponentInfo {
  fixedSuits?: boolean
  useLandmark?: boolean
  useHireling?: boolean
}

/** An enum of the individual steps in the setup process. */
export const enum SetupStep {
  chooseExpansions,
  seatPlayers,
  chooseMap,
  setUpMap,
  chooseDeck,
  setUpDeck,
  setUpBots,
  selectBots,
  chooseLandmarks,
  selectLandmark,
  setUpLandmark,
  chooseHirelings,
  selectHireling,
  setUpHireling,
  postHirelingSetup,
  drawCards,
  chooseFactions,
  selectFaction,
  setUpFaction,
  placeScoreMarkers,
  chooseHand,
  setupEnd,
}

/**
 * An object representing a faction in the faction pool, along with it's assigned vagabond character
 * (if it has one)
 */
export interface FactionEntry {
  code: FactionCode
  order: number
  militant: boolean
  vagabond?: true | VagabondCode
  captains?: [CaptainCode, CaptainCode, CaptainCode, CaptainCode]
}

/** An object representing an promoted or demoted Hireling. */
export interface HirelingEntry {
  code: HirelingCode
  demoted: boolean
}

/** An object representing a slice of history for the flow state. */
export interface FlowSlice {
  botPool: BotCode[]
  factionPool: FactionEntry[]
  hirelingPool: HirelingEntry[]
  index: number | null
  landmarkPool: LandmarkCode[]
  lastFactionLocked: boolean
  playerIndex: number | null
  step: SetupStep
  vagabondSetUp: boolean
  selectedBots: BotCode[]
  placedLandmarks: Record<string, number>
  placedHirelings: Record<string, number>
}

//#endregion
// ---------------------------------------------------------------------------------------------- //
