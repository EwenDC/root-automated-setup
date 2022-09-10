/** Adds the field "code" to an existing type */
export type WithCode<T> = T & {
  code: string;
};

/** The name of a vagabond item */
export type Item =
  | "bag"
  | "boot"
  | "coin"
  | "crossbow"
  | "hammer"
  | "sword"
  | "tea"
  | "torch";

/** The name of a map clearing suit */
export type ClearingSuit = "fox" | "mouse" | "rabbit";

/** A basic game component, with an associated image */
export interface GameComponent {
  image?: string;
}

/** An object representing an Expansion or Base Box for the Root board game */
export interface Expansion extends GameComponent {
  base: boolean;
  decks?: Record<string, GameComponent>;
  factions?: Record<string, Faction>;
  hirelings?: Record<string, Hireling>;
  landmarks?: Record<string, Landmark>;
  maps?: Record<string, MapComponent>;
  vagabonds?: Record<string, Vagabond>;
}

/** An object representing a Faction from the Root board game */
export interface Faction extends GameComponent {
  key: string;
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

/** An object representing a Map from the Root board game */
export interface MapComponent extends GameComponent {
  landmark?: string;
}

/** An object representing a Vagabond character from the Root board game */
export interface Vagabond extends GameComponent {
  startingItems: Item[];
}

/** Generic information about an expansion, namely whether it is enabled and if it is a base copy */
export interface ExpansionInfo {
  enabled: boolean;
  base: boolean;
}

/** Generic information about a game component, namely whether it is enabled and what expansion it is from */
export interface ComponentInfo {
  enabled: boolean;
  expansionCode: string;
}

/** Object tracking which components are avaliable for selection */
export interface ComponentsState {
  expansions: Record<string, ExpansionInfo>;
  decks: Record<string, ComponentInfo>;
  factions: Record<string, ComponentInfo>;
  hirelings: Record<string, ComponentInfo>;
  landmarks: Record<string, ComponentInfo>;
  maps: Record<string, ComponentInfo>;
  vagabonds: Record<string, ComponentInfo>;
}

/** An object representing an promoted or demoted Hireling */
export interface HirelingEntry {
  code: string;
  demoted: boolean;
}

/** An object containing all variables used during the setup process */
export interface SetupState {
  playerCount: number;
  fixedFirstPlayer: boolean;
  playerOrder: number[];
  errorMessage: string | null;
  // Map
  map: string | null;
  useMapLandmark: boolean;
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
  setUpMapLandmark,
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

/** An object representing a faction in the faction pool, along with it's assigned vagabond character (if it has one) */
export interface FactionEntry {
  code: string;
  militant: boolean;
  vagabond?: string;
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
  skippedSteps: boolean[];
  futureSteps: FlowSlice[];
}
