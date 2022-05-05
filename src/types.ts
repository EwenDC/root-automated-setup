/** A game component that can be enabled or disabled, and may have an associated image */
export interface GameComponent {
  enabled: boolean;
  image?: string;
}

/** An object representing a game component from an expansion. It holds the same information as a game component but also saves the expansion it is from */
export interface ExpansionComponent extends GameComponent {
  expansionCode: string;
}

/** A generic object where each key is the code of an underlying object */
export interface ComponentState<T> {
  [code: string]: T;
}

/** Adds the field "code" to an existing type */
export type WithCode<T> = T & {
  code: string;
};

/** An object representing an Expansion or Base Box for the Root board game */
export interface Expansion extends GameComponent {
  base: boolean;
}

/** An object representing a Faction from the Root board game */
export interface Faction extends ExpansionComponent {
  key: string;
  militant: boolean;
  isVagabond: boolean;
  warriors: number;
  buildings: number;
  tokens: number;
}

/** An object representing a physical Hireling card from the Root board game, which could be Promoted or Demoted */
export interface Hireling extends ExpansionComponent {
  factions: string[];
  warriors: number;
  components: number;
  componentName?: string;
}

/** An object representing a Landmark piece from the Root board game */
export interface Landmark extends ExpansionComponent {
  minPlayers: number;
}

/** An object representing a Map from the Root board game */
export interface MapComponent extends ExpansionComponent {
  printedSuits: boolean;
  landmark?: string;
}

/** An object representing a Vagabond character from the Root board game */
export interface Vagabond extends ExpansionComponent {
  startingItems: string[];
}

/** An object representing an promoted or demoted Hireling */
export interface HirelingEntry extends WithCode<Hireling> {
  demoted: boolean;
}

/** An object containing all variables used during the setup process */
export interface SetupState {
  playerCount: number;
  fixedFirstPlayer: boolean;
  playerOrder: number[];
  errorMessage: string | null;
  // Map
  map: WithCode<MapComponent> | null;
  useMapLandmark: boolean;
  // Deck
  deck: WithCode<ExpansionComponent> | null;
  // Landmarks
  landmarkCount: 0 | 1 | 2;
  landmark1: WithCode<Landmark> | null;
  landmark2: WithCode<Landmark> | null;
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
  chooseMap,
  setUpMap,
  setUpMapLandmark,
  chooseDeck,
  setUpDeck,
  setUpBots,
  seatPlayers,
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

export interface FactionEntry extends WithCode<Faction> {
  vagabond?: WithCode<Vagabond>;
}

/** An object representing a slice of history for the flow state */
export interface FlowSlice {
  step: SetupStep;
  factionPool: FactionEntry[];
  lastFactionLocked: boolean;
  playerIndex: number;
  factionIndex: number | null;
}

/** An object representing the current flow state, including the current step, past and future steps, and what steps should be skipped */
export interface FlowState {
  pastSteps: FlowSlice[];
  currentStep: SetupStep;
  factionPool: FactionEntry[];
  lastFactionLocked: boolean;
  currentPlayerIndex: number;
  currentFactionIndex: number | null;
  skippedSteps: boolean[];
  futureSteps: FlowSlice[];
}
