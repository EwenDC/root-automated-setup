import { useAppSelector } from '../hooks'
import priorityToken from '../images/tokens/priority.svg'
import { selectSetupMap } from '../store'
import { SetupStep } from '../types'
import { iconDict } from './icon'
import LocaleText from './localeText'

const MapChart: React.FC = () => {
  const map = useAppSelector(selectSetupMap)
  const clearingSuits = useAppSelector(state => state.setup.clearingSuits)
  const skippedSteps = useAppSelector(state => state.flow.skippedSteps)

  if (!map) return null
  return (
    <svg
      className="map"
      viewBox="0 0 100 100"
    >
      <desc>
        <LocaleText i18nKey="label.mapChart" />
      </desc>
      <image
        width="100"
        height="100"
        className="back"
        href={map.backImage}
      />
      {map.clearings.map((clearing, index) => {
        const { x, y } = clearing
        // We know suit is defined because clearingSuits is set from `map.clearings`
        const suit = clearingSuits[index]!
        return (
          <g key={index}>
            <title>
              <LocaleText i18nKey={`label.clearing.${suit}`} />
            </title>
            <image
              x={x - 4}
              y={y - 12}
              width="8"
              height="8"
              href={iconDict[suit].image}
            />
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
                  width="6"
                  height="6"
                  href={priorityToken}
                />
                <text
                  x={x + 3}
                  y={y + 4}
                  fontSize="3"
                  textAnchor="middle"
                  fill="#fff"
                >
                  {map.botPriorities[index]}
                </text>
              </g>
            ) : null}
            {map.useLandmark && map.landmark?.clearing === index ? (
              <image
                x={map.landmark.x}
                y={map.landmark.y}
                width="10"
                height="10"
                transform={
                  map.landmark.angle != null
                    ? `rotate(${map.landmark.angle} ${map.landmark.x + 5} ${map.landmark.y + 5})`
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
        )
      })}
    </svg>
  )
}

export default MapChart
