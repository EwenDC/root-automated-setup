import { memo } from "react";
import { selectSetupMap, selectSetupParameters, selectSkippedSteps } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { iconDict } from "./icon";
import hexIcon from "../images/tokens/priority.png";
import { SetupStep } from "../types";
import { useTranslation } from "react-i18next";

const MapChart: React.FC = () => {
  const map = useAppSelector(selectSetupMap);
  const { clearingSuits } = useAppSelector(selectSetupParameters);
  const skippedSteps = useAppSelector(selectSkippedSteps);
  const { t } = useTranslation();

  if (!map) return null;

  return (
    <svg className="map" viewBox="-1 -1 102 102">
      <desc>{t("label.mapChart")}</desc>
      <image width="100" height="100" href={map.backImage} />
      {map.clearings.map(({ no, x, y }) => {
        const suit = clearingSuits[no];
        return (
          <g key={no}>
            <title>{t("label.clearing." + suit)}</title>
            <circle cx={x} cy={y} r="8.25" fill="none" stroke="#7E7C74" strokeWidth="0.3" />
            <image x={x - 4} y={y - 12} width="8" height="8" href={iconDict[suit].image} />
            {!skippedSteps[SetupStep.setUpBots] ? (
              <g>
                <title>{t("label.priority", { count: no })}</title>
                <image x={x} y={y} width="6" height="6" href={hexIcon} />
                <text x={x + 3} y={y + 4} fontSize="3" textAnchor="middle" fill="#fff">
                  {no}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
      {map.useLandmark && map.landmark ? (
        <image
          x={map.landmark.x}
          y={map.landmark.y}
          width="10"
          height="10"
          href={map.landmark.image}
        >
          <title>{t("landmark." + map.landmark.code + ".name")}</title>
        </image>
      ) : null}
    </svg>
  );
};

export default memo(MapChart);
