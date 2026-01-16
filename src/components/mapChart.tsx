import { useAppSelector } from '../hooks'
import priorityToken from '../images/charts/markers/priority.svg'
import ruinBuilding from '../images/charts/markers/ruin.png'
import { selectSetupMap } from '../store'
import { iconDict } from './icon'
import LocaleText from './localeText'

const MapChart: React.FC = () => {
  const map = useAppSelector(selectSetupMap)
  const includeBots = useAppSelector(state => state.setup.includeBots)

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

      {map.clearings.map(({ x, y, suit, suitLandmark, ruin, flooded }, index) => (
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

          {ruin ? (
            <image
              className="landmark"
              x={x - 65}
              y={y - 40}
              width="40"
              height="40"
              href={ruinBuilding}
            >
              <title>
                <LocaleText i18nKey="label.ruin" />
              </title>
            </image>
          ) : null}

          {includeBots && map.botPriorities ? (
            <g>
              <title>
                <LocaleText
                  i18nKey="label.priority"
                  count={map.botPriorities[index]}
                />
              </title>
              <image
                x={x - 55}
                y={y + 10}
                width="60"
                height="60"
                href={priorityToken}
              />
              <text
                x={x - 25}
                y={y + 50}
                fontSize="30"
                textAnchor="middle"
                fill="#fff"
              >
                {map.botPriorities[index]}
              </text>
            </g>
          ) : null}

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
