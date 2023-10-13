/** An object with an associated code */
export interface CodeObject {
  code: string;
}

/** Adds the field "code" to an existing type */
export type WithCode<T> = T & CodeObject;

/** The name of a vagabond item */
export type Item = "bag" | "boot" | "coin" | "crossbow" | "hammer" | "sword" | "tea" | "torch";

/** The name of a map clearing suit */
export type ClearingSuit = "fox" | "mouse" | "rabbit";

/** A basic game component, with an associated image */
export interface GameComponent {
  image: string;
}

/** An object representing an Expansion or Base Box for the Root board game */
export interface Expansion extends GameComponent {
  base: boolean;
  decks?: Record<string, GameComponent>;
  factions?: Record<string, Faction>;
  hirelings?: Record<string, Hireling>;
  landmarks?: Record<string, Landmark>;
  maps?: Record<string, Map>;
  vagabonds?: Record<string, Vagabond>;
}

/** An object representing a Faction from the Root board game */
export interface Faction extends GameComponent {
  key: string;
  order: number;
  cornerSetup: boolean;
  militant: boolean;
  isVagabond: boolean;
  warriors: number;
  buildings: number;
  buildingImage?: string;
  tokens: number;
  tokenImage?: string;
  complexity: number;
  wealth: number;
  aggression: number;
  crafting: number;
}

/** An object representing a physical Hireling card from the Root board game, which could be Promoted or Demoted */
export interface Hireling extends GameComponent {
  factions: string[];
}

/** An object representing a Landmark piece from the Root board game */
export interface Landmark extends GameComponent {
  minPlayers: number;
}

/** An object representing a Map Clearing and it's position in the Map Chart */
export interface Clearing {
  no: number;
  x: number;
  y: number;
}

/** A tuple representing a path connecting two clearings, as referenced by their priority numbers */
export type Path = [number, number];

/** An object representing details for a Landmark as it appears on a specific map */
export interface MapLandmark {
  code: string;
  clearing: number;
  x: number;
  y: number;
  angle?: number;
}

/** An object representing a Map from the Root board game */
export interface Map extends GameComponent {
  clearings: Clearing[];
  paths: Path[];
  backImage: string;
  printedSuits: boolean;
  landmark?: MapLandmark;
  defaultSuits?: Record<number, ClearingSuit>;
}

/** An object representing a Vagabond character from the Root board game */
export interface Vagabond extends GameComponent {
  startingItems: Item[];
}

/** Payload for Lock Component redux action */
export interface LockComponentPayload {
  componentCode: string;
  locked: string | false;
}

/** Payload for Map Fixed Suits redux action */
export interface MapFixedSuitsPayload {
  mapCode: string;
  fixedSuits: boolean;
}

/** Payload for Enable Map Landmark redux action */
export interface EnableMapLandmarkPayload {
  mapCode: string;
  enableLandmark: boolean;
}

/** An object with an associated enable/disable state */
export interface Togglable {
  enabled: boolean;
  locked: string | false;
}

/** Generic information about a game component, namely whether it is enabled and what expansion it is from */
export interface ComponentInfo extends Togglable {
  expansionCode: string;
}

/** Generic information about a map component, namely whether to use it's default suits or included landmark (if it has them) */
export interface MapInfo extends ComponentInfo {
  fixedSuits?: boolean;
  useLandmark?: boolean;
}

/** Object tracking which components are available for selection */
export interface ComponentsState {
  expansions: Record<string, Togglable & GameComponent>;
  decks: Record<string, ComponentInfo>;
  factions: Record<string, ComponentInfo>;
  hirelings: Record<string, ComponentInfo>;
  landmarks: Record<string, ComponentInfo>;
  maps: Record<string, MapInfo>;
  vagabonds: Record<string, ComponentInfo>;
}

/** Object storing information pertinent to solving map clearing suit distribution */
export interface ClearingSolveState {
  no: number;
  links: number[];
  options: ClearingSuit[];
}

/** An object representing an promoted or demoted Hireling */
export interface HirelingEntry {
  code: string;
  demoted: boolean;
}

/** Payload for Set Hireling redux action */
export interface SetHirelingPayload {
  number: number;
  hirelingEntry: HirelingEntry;
  factions: string[];
}

/** An object containing all variables used during the setup process */
export interface SetupState {
  playerCount: number;
  fixedFirstPlayer: boolean;
  playerOrder: number[];
  errorMessage: string | null;
  // Map
  map: string | null;
  balancedSuits: boolean;
  clearingSuits: Record<number, ClearingSuit>;
  // Deck
  deck: string | null;
  // Landmarks
  landmarkCount: 0 | 1 | 2;
  landmark1: string | null;
  landmark2: string | null;
  // Hirelings
  hireling1: HirelingEntry | null;
  hireling2: HirelingEntry | null;
  hireling3: HirelingEntry | null;
  // Factions
  excludedFactions: string[];
}

/** An enum of the individual steps in the setup process. The setup process will step through this list during execution */
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

/** Payload for Skip Steps redux action */
export interface SkipStepsPayload {
  steps: SetupStep[];
  skip: boolean;
}

/** An object representing a faction in the faction pool, along with it's assigned vagabond character (if it has one) */
export interface FactionEntry {
  code: string;
  order: number;
  militant: boolean;
  vagabond?: string | true;
}

/** An object representing a slice of history for the flow state */
export interface FlowSlice {
  step: SetupStep;
  factionPool: FactionEntry[];
  lastFactionLocked: boolean;
  vagabondSetUp: boolean;
  playerIndex: number;
  factionIndex: number | null;
}

/** An object representing the current flow state, including the current step, past and future steps, and what steps should be skipped */
export interface FlowState {
  pastSteps: FlowSlice[];
  currentStep: SetupStep;
  factionPool: FactionEntry[];
  lastFactionLocked: boolean;
  vagabondSetUp: boolean;
  currentPlayerIndex: number;
  currentFactionIndex: number | null;
  vagabondPool: string[];
  useDraft: boolean;
  skippedSteps: boolean[];
  futureSteps: FlowSlice[];
}
