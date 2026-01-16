import type { SetupStepDefinition } from '.'

import { SetupStep } from '../types'
import { chooseDeck } from './definitions/chooseDeck'
import { chooseExpansions } from './definitions/chooseExpansions'
import { chooseFactions } from './definitions/chooseFactions'
import { chooseHand } from './definitions/chooseHand'
import { chooseHirelings } from './definitions/chooseHirelings'
import { chooseLandmarks } from './definitions/chooseLandmarks'
import { chooseMap } from './definitions/chooseMap'
import { drawCards } from './definitions/drawCards'
import { placeScoreMarkers } from './definitions/placeScoreMarkers'
import { postHirelingSetup } from './definitions/postHirelingSetup'
import { seatPlayers } from './definitions/seatPlayers'
import { selectFaction } from './definitions/selectFaction'
import { setUpBots } from './definitions/setUpBots'
import { setUpDeck } from './definitions/setUpDeck'
import { setupEnd } from './definitions/setupEnd'
import { setUpFaction } from './definitions/setUpFaction'
import { setUpHireling } from './definitions/setUpHireling'
import { setUpLandmark } from './definitions/setUpLandmark'
import { setUpMap } from './definitions/setUpMap'

export const stepMap: Record<SetupStep, SetupStepDefinition> = {
  [SetupStep.chooseExpansions]: chooseExpansions,
  [SetupStep.seatPlayers]: seatPlayers,
  [SetupStep.chooseMap]: chooseMap,
  [SetupStep.setUpMap]: setUpMap,
  [SetupStep.chooseDeck]: chooseDeck,
  [SetupStep.setUpDeck]: setUpDeck,
  [SetupStep.setUpBots]: setUpBots,
  [SetupStep.chooseLandmarks]: chooseLandmarks,
  [SetupStep.setUpLandmark]: setUpLandmark,
  [SetupStep.chooseHirelings]: chooseHirelings,
  [SetupStep.setUpHireling]: setUpHireling,
  [SetupStep.postHirelingSetup]: postHirelingSetup,
  [SetupStep.drawCards]: drawCards,
  [SetupStep.chooseFactions]: chooseFactions,
  [SetupStep.selectFaction]: selectFaction,
  [SetupStep.setUpFaction]: setUpFaction,
  [SetupStep.placeScoreMarkers]: placeScoreMarkers,
  [SetupStep.chooseHand]: chooseHand,
  [SetupStep.setupEnd]: setupEnd,
}
