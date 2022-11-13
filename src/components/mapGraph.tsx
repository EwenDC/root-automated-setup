import { Fragment, memo } from "react";
import { selectSetupMap, selectSetupParameters, selectSkippedSteps } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { iconDict } from "./icon";
import hexIcon from "../images/icons/hex.png";
import { SetupStep } from "../types";

const MapGraph: React.FC = () => {
  const map = useAppSelector(selectSetupMap);
  const { clearingSuits } = useAppSelector(selectSetupParameters);
  const skippedSteps = useAppSelector(selectSkippedSteps);

  if (!map) return null;

  return (
    <svg className="map" viewBox="0 0 100 100">
      <image width="100" height="100" href={map.backImage} />
      {map.clearings.map(({ no, x, y }) => (
        <Fragment key={no}>
          <circle cx={x} cy={y} r="8.25" fill="none" stroke="#7E7C74" strokeWidth="0.3" />
          <image
            x={x - 4}
            y={y - 12}
            width="8"
            height="8"
            href={iconDict[clearingSuits[no]].image}
          />
          {!skippedSteps[SetupStep.setUpBots] ? (
            <>
              <image x={x - 6} y={y} width="6" height="6" href={hexIcon} />
              <text x={x - 3} y={y + 4} fontSize="3" textAnchor="middle" fill="#fff">
                {no}
              </text>
            </>
          ) : null}
        </Fragment>
      ))}
    </svg>
  );
};

export default memo(MapGraph);
