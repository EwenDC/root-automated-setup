import { Trans } from "react-i18next";
import MapGraph from "../components/mapGraph";
import Section from "../components/section";
import { selectSetupMap, selectSkippedSteps } from "../features/selectors";
import { useAppSelector } from "../hooks";
import iconComponents from "../iconComponents";
import { SetupStep } from "../types";

const SetUpMapStep: React.FC = () => {
  const setupMap = useAppSelector(selectSetupMap);
  const skippedSteps = useAppSelector(selectSkippedSteps);

  if (!setupMap) return null;

  const markerKey =
    setupMap.fixedSuits && setupMap.printedSuits
      ? skippedSteps[SetupStep.setUpBots]
        ? null
        : "priority"
      : skippedSteps[SetupStep.setUpBots]
      ? "suit"
      : "suitPriority";

  return (
    <Section subtitleKey={"map." + setupMap.code + ".setupTitle"}>
      <ol>
        <Trans i18nKey={"map." + setupMap.code + ".setup"} />
        {setupMap.useLandmark ? (
          <Trans i18nKey={"map." + setupMap.code + ".landmarkSetup"} />
        ) : null}
        {markerKey && <Trans i18nKey={"label.placeMarkers." + markerKey} />}
        <Trans i18nKey="setupStep.setUpMap.body" components={iconComponents} />
      </ol>
      <MapGraph />
    </Section>
  );
};

// Memo intentionally omitted due to rendering bugs with switch language
export default SetUpMapStep;
