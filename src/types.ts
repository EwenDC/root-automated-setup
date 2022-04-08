/** An object that can be enabled or disabled */
export interface Disableable {
  enabled: boolean;
}

/** An object representing a game component, Storing it's originating expansion and whether it is enabled or disabled */
export interface ExpansionComponent extends Disableable {
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
export interface Expansion extends Disableable {
  base: boolean;
}

/** An object representing a Faction from the Root board game */
export interface Faction extends ExpansionComponent {
  name: string;
  militant: boolean;
  vagabond: boolean;
  warriors: number;
  buildings: number;
  tokens: number;
}

/** An object representing a Vagabond character from the Root board game */
export interface Vagabond extends ExpansionComponent {
  startingItems: string[];
}

/** An object representing a Map from the Root board game */
export interface MapComponent extends ExpansionComponent {
  printedSuits: boolean;
  landmark?: string;
}

/** An object representing a card Deck from the Root board game */
export interface Deck extends ExpansionComponent {
  name: string;
}

/** An object representing a Landmark peice from the Root board game */
export interface Landmark extends ExpansionComponent {
  name: string;
}

/** An object representing a Demoted Hireling from the Root board game */
export interface HirelingDemoted {
  name: string;
}

/** An object representing a Promoted Hireling from the Root board game */
export interface HirelingPromoted extends HirelingDemoted {
  warriors: number;
  components: number;
  componentName?: string;
}

/** An object representing a physical Hireling card from the Root board game, which contains both a Promoted and Demoted Hireling */
export interface Hireling extends ExpansionComponent {
  factions: string[];
  promoted: HirelingPromoted;
  demoted: HirelingDemoted;
}
