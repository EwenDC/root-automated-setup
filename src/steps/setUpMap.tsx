import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";
import MapChart from "../components/mapChart";
import Section from "../components/section";
import { selectSetupMap } from "../features/selectors";
import { useAppSelector } from "../hooks";
import iconComponents from "../iconComponents";
import { SetupStep } from "../types";

const SetUpMapStep: React.FC = () => {
  const setupMap = useAppSelector(selectSetupMap);
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  // Ensure the component re-renders when the language changes
  useTranslation();

  if (!setupMap) return null;

  let markerKey = null;
  if (!setupMap.fixedSuits || !setupMap.printedSuits) {
    markerKey = skippedSteps[SetupStep.setUpBots] ? "suit" : "suitPriority";
  } else if (!skippedSteps[SetupStep.setUpBots]) {
    markerKey = "priority";
  }

  return (
    <Section subtitleKey={`map.${setupMap.code}.setupTitle`}>
      <ol>
        <Trans i18nKey={`map.${setupMap.code}.setup`} />
        {setupMap.useLandmark ? <Trans i18nKey={`map.${setupMap.code}.landmarkSetup`} /> : null}
        {markerKey && <Trans i18nKey={`label.placeMarkers.${markerKey}`} />}
        <Trans i18nKey="setupStep.setUpMap.body" components={iconComponents} />
      </ol>
      <MapChart />
    </Section>
  );
};

export default memo(SetUpMapStep);
