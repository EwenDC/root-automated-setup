import { useAppSelector } from '../hooks'
import priorityToken from '../images/tokens/priority.svg'
import { selectSetupMap } from '../store'
import { SetupStep } from '../types'
import { iconDict } from './icon'
import LocaleText from './localeText'

const MapChart: React.FC = () => {
  const map = useAppSelector(selectSetupMap)
  const skippedSteps = useAppSelector(state => state.flow.skippedSteps)

  if (!map) return null

  const floodedClearings = map.clearings.filter(clearing => clearing.flooded)
  return (
    <svg
      className="map"
      viewBox="0 0 1000 1000"
    >
      <desc>
        <LocaleText i18nKey="label.mapChart" />
      </desc>

      <image
        className="background"
        href={map.backImage}
      />
      {floodedClearings.length > 0 ? (
        <>
          <mask id="flooded-mask">
            {floodedClearings.map((clearing, index) => (
              <circle
                key={index}
                cx={clearing.x}
                cy={clearing.y}
                r="90"
              />
            ))}
          </mask>
          <image
            className="background"
            href={map.floodImage}
            mask="url(#flooded-mask)"
          />
        </>
      ) : null}

      {map.clearings.map(({ x, y, suit, suitLandmark, flooded }, index) => (
        <g key={index}>
          <title>
            <LocaleText i18nKey={flooded ? `label.clearing.flooded` : `label.clearing.${suit}`} />
          </title>

          {/* Bounding circle for the clearing, allowing browser tooltips to display the title more easily */}
          <circle
            key={index}
            cx={x}
            cy={y}
            r="90"
            fill="transparent"
          />

          {suitLandmark ? (
            <image
              className="landmark"
              x={x - 60}
              y={y - 150}
              width="120"
              height="120"
              href={suitLandmark.image}
            >
              <title>
                <LocaleText i18nKey={`landmark.${suitLandmark.code}.name`} />
              </title>
            </image>
          ) : !flooded ? (
            <image
              x={x - 40}
              y={y - 120}
              width="80"
              height="80"
              href={iconDict[suit].image}
            >
              <title>
                <LocaleText i18nKey={`label.suitMarker.${suit}`} />
              </title>
            </image>
          ) : null}

          {!skippedSteps[SetupStep.setUpBots] && map.botPriorities ? (
            <g>
              <title>
                <LocaleText
                  i18nKey="label.priority"
                  count={map.botPriorities[index]}
                />
              </title>
              <image
                x={x}
                y={y}
                width="60"
                height="60"
                href={priorityToken}
              />
              <text
                x={x + 30}
                y={y + 40}
                fontSize="30"
                textAnchor="middle"
                fill="#fff"
              >
                {map.botPriorities[index]}
              </text>
            </g>
          ) : null}

          {map.useLandmark && map.landmark?.clearing === index ? (
            <image
              className="landmark"
              x={map.landmark.x}
              y={map.landmark.y}
              width="100"
              height="100"
              transform={
                map.landmark.angle != null
                  ? `rotate(${map.landmark.angle} ${map.landmark.x + 50} ${map.landmark.y + 50})`
                  : undefined
              }
              href={map.landmark.image}
            >
              <title>
                <LocaleText i18nKey={`landmark.${map.landmark.code}.name`} />
              </title>
            </image>
          ) : null}
        </g>
      ))}
    </svg>
  )
}

export default MapChart
