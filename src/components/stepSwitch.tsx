import { useTranslation } from 'react-i18next'

import type { FlowSlice } from '../types'

import ChooseDeck from '../steps/chooseDeck'
import ChooseExpansions from '../steps/chooseExpansions'
import ChooseFactions from '../steps/chooseFactions'
import ChooseHirelings from '../steps/chooseHirelings'
import ChooseLandmarks from '../steps/chooseLandmarks'
import ChooseMap from '../steps/chooseMap'
import PlaceScoreMarkers from '../steps/placeScoreMarkers'
import SeatPlayers from '../steps/seatPlayers'
import SelectFaction from '../steps/selectFaction'
import SetUpDeck from '../steps/setUpDeck'
import SetupEnd from '../steps/setupEnd'
import SetUpFaction from '../steps/setUpFaction'
import SetUpHireling from '../steps/setUpHireling'
import SetUpLandmark from '../steps/setUpLandmark'
import SetUpMap from '../steps/setUpMap'
import { SetupStep } from '../types'
import Section from './section'

export interface StepSwitchProps {
  flowSlice: FlowSlice
}

const StepSwitch: React.FC<StepSwitchProps> = ({ flowSlice }) => {
  const { i18n } = useTranslation()

  switch (flowSlice.step) {
    case SetupStep.chooseExpansions: {
      return <ChooseExpansions />
    }
    case SetupStep.seatPlayers: {
      return <SeatPlayers />
    }
    case SetupStep.chooseMap: {
      return <ChooseMap />
    }
    case SetupStep.setUpMap: {
      return <SetUpMap />
    }
    case SetupStep.chooseDeck: {
      return <ChooseDeck />
    }
    case SetupStep.setUpDeck: {
      return <SetUpDeck />
    }
    case SetupStep.chooseLandmarks: {
      return <ChooseLandmarks />
    }
    case SetupStep.setUpLandmark1: {
      return <SetUpLandmark number={1} />
    }
    case SetupStep.setUpLandmark2: {
      return <SetUpLandmark number={2} />
    }
    case SetupStep.chooseHirelings: {
      return <ChooseHirelings />
    }
    case SetupStep.setUpHireling1: {
      return <SetUpHireling number={1} />
    }
    case SetupStep.setUpHireling2: {
      return <SetUpHireling number={2} />
    }
    case SetupStep.setUpHireling3: {
      return <SetUpHireling number={3} />
    }
    case SetupStep.chooseFactions: {
      return <ChooseFactions />
    }
    case SetupStep.selectFaction: {
      return <SelectFaction flowSlice={flowSlice} />
    }
    case SetupStep.setUpFaction: {
      return <SetUpFaction flowSlice={flowSlice} />
    }
    case SetupStep.placeScoreMarkers: {
      return <PlaceScoreMarkers flowSlice={flowSlice} />
    }
    case SetupStep.setupEnd: {
      return <SetupEnd />
    }

    default: {
      const defaultTitleKey = `setupStep.${SetupStep[flowSlice.step]}.title`
      const defaultSubtitleKey = `setupStep.${SetupStep[flowSlice.step]}.subtitle`
      return (
        <Section
          titleKey={i18n.exists(defaultTitleKey) ? defaultTitleKey : undefined}
          subtitleKey={i18n.exists(defaultSubtitleKey) ? defaultSubtitleKey : undefined}
          textKey={`setupStep.${SetupStep[flowSlice.step]}.body`}
        />
      )
    }
  }
}

export default StepSwitch
