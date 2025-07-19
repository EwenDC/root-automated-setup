import { useTranslation } from 'react-i18next'

import type { FlowSlice } from '../types'

import ChooseDeck from '../setupSteps/chooseDeck'
import ChooseExpansions from '../setupSteps/chooseExpansions'
import ChooseFactions from '../setupSteps/chooseFactions'
import ChooseHirelings from '../setupSteps/chooseHirelings'
import ChooseLandmarks from '../setupSteps/chooseLandmarks'
import ChooseMap from '../setupSteps/chooseMap'
import PlaceScoreMarkers from '../setupSteps/placeScoreMarkers'
import SeatPlayers from '../setupSteps/seatPlayers'
import SelectFaction from '../setupSteps/selectFaction'
import SetUpDeck from '../setupSteps/setUpDeck'
import SetupEnd from '../setupSteps/setupEnd'
import SetUpFaction from '../setupSteps/setUpFaction'
import SetUpHireling from '../setupSteps/setUpHireling'
import SetUpLandmark from '../setupSteps/setUpLandmark'
import SetUpMap from '../setupSteps/setUpMap'
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
