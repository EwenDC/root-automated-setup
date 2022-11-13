import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";
import MapGraph from "../components/mapGraph";
import Section from "../components/section";
import { selectSetupMap, selectSkippedSteps } from "../features/selectors";
import { useAppSelector } from "../hooks";
import iconComponents from "../iconComponents";
import { SetupStep } from "../types";

const SetUpMapStep: React.FC = () => {
  const setupMap = useAppSelector(selectSetupMap);
  const skippedSteps = useAppSelector(selectSkippedSteps);
  const { t } = useTranslation();

  if (!setupMap) return null;

  const mapSetupSteps: string[] = t("map." + setupMap.code + ".setup", { returnObjects: true });
  return (
    <Section subtitleKey={"map." + setupMap.code + ".setupTitle"}>
      <ol>
        {mapSetupSteps.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
        {setupMap.useLandmark ? (
          <li>
            <Trans i18nKey={"map." + setupMap.code + ".landmarkSetup"} />
          </li>
        ) : null}
        <li>
          <Trans
            i18nKey="label.mapSetup.markers"
            context={skippedSteps[SetupStep.setUpBots] ? undefined : "botSetUp"}
          />
        </li>
        <li>
          <Trans i18nKey="label.mapSetup.ruins" />
        </li>
        <li>
          <Trans i18nKey="label.mapSetup.items" components={iconComponents} />
        </li>
        <li>
          <Trans i18nKey="label.mapSetup.dice" />
        </li>
      </ol>
      <MapGraph />
    </Section>
  );
};

export default memo(SetUpMapStep);
