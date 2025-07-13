/** A utility type for extracting the value types of a provided `Record`-like object. */
export type ValueOf<T> = NonNullable<T>[keyof T]

/** An object with an associated code. */
export interface CodeObject {
  code: string
}

/** Adds the field "code" to an existing type. */
export type WithCode<T> = CodeObject & T

/** The name of a vagabond item. */
export type Item = 'bag' | 'boot' | 'coin' | 'crossbow' | 'hammer' | 'sword' | 'tea' | 'torch'

/** The name of a map clearing suit. */
export type ClearingSuit = 'fox' | 'mouse' | 'rabbit'

/** An identifier for a component, which is unique within it's component type. */
/* eslint-disable @typescript-eslint/no-duplicate-type-constituents 
-- This type definition is semantic, so the redundant union is used to convey intent */
export type ComponentCode =
  | DeckCode
  | FactionCode
  | HirelingCode
  | LandmarkCode
  | MapCode
  | VagabondCode
/* eslint-enable @typescript-eslint/no-duplicate-type-constituents */

/** A basic game component, with an associated image. */
export interface GameComponent {
  image: string
}

/** A unique identifier for an Expansion. */
export type ExpansionCode = string

/** An object representing an Expansion or Base Box for the Root board game. */
export interface Expansion extends GameComponent {
  base?: boolean
  decks?: Record<DeckCode, GameComponent>
  factions?: Record<FactionCode, Faction>
  hirelings?: Record<HirelingCode, Hireling>
  landmarks?: Record<LandmarkCode, Landmark>
  maps?: Record<MapCode, Map>
  vagabonds?: Record<VagabondCode, Vagabond>
}

/** A unique identifier for a Deck. */
export type DeckCode = string

/** An identifier for a faction that is used to group multiple instances of the same faction. */
export type FactionKey = string

/** A unique identifier for a Faction. */
/* eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents 
-- This type definition is semantic, so the redundant union is used to convey intent */
export type FactionCode = FactionKey | string

/** An object representing a Faction from the Root board game. */
export interface Faction extends GameComponent {
  key: FactionKey
  order: number
  cornerSetup?: boolean
  militant?: boolean
  isVagabond?: boolean
  warriors: number
  buildings: number
  buildingImage?: string
  tokens: number
  tokenImage?: string
  complexity: number
  wealth: number
  aggression: number
  crafting: number
}

/** A unique identifier for a Hireling. */
export type HirelingCode = string

/**
 * An object representing a physical Hireling card from the Root board game, which could be Promoted
 * or Demoted.
 */
export interface Hireling extends GameComponent {
  factions: FactionCode[]
}

/** A unique identifier for a Landmark. */
export type LandmarkCode = string

/** An object representing a Landmark piece from the Root board game. */
export interface Landmark extends GameComponent {
  minPlayers: number
}

/** The index of a clearing in it's map's clearing list. */
export type ClearingIndex = number

/** An object representing a Map Clearing and it's position in the Map Chart. */
export interface Clearing {
  x: number
  y: number
}

/** A number used to rank the priority of a clearing for bot actions. */
export type ClearingPriority = number

/**
 * An object representing a Map Clearing and it's position in the Map Chart, as well as it's
 * priority for bot actions.
 */
export interface ClearingWithPriority extends Clearing {
  no: ClearingPriority
}

/**
 * A tuple representing a path connecting two clearings, as referenced by their index in the
 * clearing list.
 */
export type Path = [ClearingIndex, ClearingIndex]

/** An object representing details for a Landmark as it appears on a specific map. */
export interface MapLandmark {
  code: LandmarkCode
  clearing: ClearingIndex
  x: number
  y: number
  angle?: number
}

/** A unique identifier for a Map. */
export type MapCode = string

/** An object representing a Map from the Root board game. */
export interface Map extends GameComponent {
  clearings: Clearing[] | ClearingWithPriority[]
  paths: Path[]
  backImage: string
  printedSuits?: boolean
  landmark?: MapLandmark
  defaultSuits?: ClearingSuit[]
}

/** A unique identifier for a Vagabond character. */
export type VagabondCode = string

/** An object representing a Vagabond character from the Root board game. */
export interface Vagabond extends GameComponent {
  startingItems: Item[]
}

/** Payload for Lock Component redux action. */
export interface LockComponentPayload {
  componentCode: ComponentCode
  locked: false | string
}

/** Payload for Map Fixed Suits redux action. */
export interface MapFixedSuitsPayload {
  mapCode: MapCode
  fixedSuits: boolean
}

/** Payload for Enable Map Landmark redux action. */
export interface EnableMapLandmarkPayload {
  mapCode: MapCode
  enableLandmark: boolean
}

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
}

/** Object tracking which components are available for selection. */
export interface ComponentsState {
  expansions: Record<ExpansionCode, GameComponent & Togglable>
  decks: Record<DeckCode, ComponentInfo>
  factions: Record<FactionCode, ComponentInfo>
  hirelings: Record<HirelingCode, ComponentInfo>
  landmarks: Record<LandmarkCode, ComponentInfo>
  maps: Record<MapCode, MapInfo>
  vagabonds: Record<VagabondCode, ComponentInfo>
}

/** Object storing information pertinent to solving map clearing suit distribution. */
export interface ClearingSolveState {
  index: ClearingIndex
  links: number[]
  options: ClearingSuit[]
}

/** An object representing an promoted or demoted Hireling. */
export interface HirelingEntry {
  code: HirelingCode
  demoted: boolean
}

/** Payload for Set Hireling redux action. */
export interface SetHirelingPayload {
  number: number
  hirelingEntry: HirelingEntry
  factions: FactionCode[]
}

/** An object containing all variables used during the setup process. */
export interface SetupState {
  playerCount: number
  fixedFirstPlayer: boolean
  playerOrder: number[]
  errorMessage: string | null
  // Map
  map: MapCode | null
  balancedSuits: boolean
  clearingSuits: ClearingSuit[]
  // Deck
  deck: DeckCode | null
  // Landmarks
  landmarkCount: 0 | 1 | 2
  landmark1: LandmarkCode | null
  landmark2: LandmarkCode | null
  // Hirelings
  hireling1: HirelingEntry | null
  hireling2: HirelingEntry | null
  hireling3: HirelingEntry | null
  // Factions
  excludedFactions: FactionCode[]
}

/**
 * An ordered enum of the individual steps in the setup process. The setup process will step through
 * this list during execution.
 */
export enum SetupStep {
  chooseExpansions,
  seatPlayers,
  chooseMap,
  setUpMap,
  chooseDeck,
  setUpDeck,
  setUpBots,
  chooseLandmarks,
  setUpLandmark1,
  setUpLandmark2,
  chooseHirelings,
  setUpHireling1,
  setUpHireling2,
  setUpHireling3,
  postHirelingSetup,
  drawCards,
  chooseFactions,
  selectFaction,
  setUpFaction,
  placeScoreMarkers,
  chooseHand,
  setupEnd,
}

/** Payload for Skip Steps redux action. */
export interface SkipStepsPayload {
  steps: SetupStep[]
  skip: boolean
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
}

/** An object representing a slice of history for the flow state. */
export interface FlowSlice {
  step: SetupStep
  factionPool: FactionEntry[]
  lastFactionLocked: boolean
  vagabondSetUp: boolean
  playerIndex: number
  factionIndex: number | null
}

/**
 * An object representing the current flow state, including the current step, past and future steps,
 * and what steps should be skipped.
 */
export interface FlowState {
  pastSteps: FlowSlice[]
  currentStep: SetupStep
  factionPool: FactionEntry[]
  lastFactionLocked: boolean
  vagabondSetUp: boolean
  currentPlayerIndex: number
  currentFactionIndex: number | null
  vagabondPool: string[]
  useDraft: boolean
  skippedSteps: boolean[]
  futureSteps: FlowSlice[]
}
