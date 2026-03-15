import { ICON_DICTIONARY } from '../constants'
import { useAppSelector } from '../hooks'
import priorityToken from '../images/charts/markers/priority.svg'
import ruinBuilding from '../images/charts/markers/ruin.png'
import { selectLandmarkArray, selectSetupMap } from '../store'
import LocaleText from './localeText'

interface MapData {
  backImage: string
  floodImage?: string
  useLandmark?: boolean
  botPriorities?: number[]
  suitLandmarks?: Record<string, string>
  landmark?: {
    clearing: number
    x: number
    y: number
    angle?: number
    image: string
    code: string
  }
  clearings: {
    x: number
    y: number
    suit: keyof typeof ICON_DICTIONARY
    flooded?: boolean
    ruin?: boolean
  }[]
}

interface MapChartProps {
  onClearingClick?: (index: number) => void
  activeLandmark?: string
}

const MapChart: React.FC<MapChartProps> = ({ onClearingClick }) => {
  const map = useAppSelector(selectSetupMap) as MapData | null

  const includeBots = useAppSelector(state => state.setup.botCount > 0)
  const placedLandmarks = useAppSelector(state => state.setup.placedLandmarks)
  const landmarks = useAppSelector(selectLandmarkArray)

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
      {floodedClearings.length > 0 && map.floodImage ? (
        <>
          <mask id="flooded-mask">
            {floodedClearings.map((clearing, index) => (
              <circle
                key={`flood-${index}`}
                cx={clearing.x}
                cy={clearing.y}
                r="90"
                fill="white"
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

      {map.clearings.map(({ x, y, suit, flooded, ruin }, index) => {
        const placedLandmarkCode = Object.keys(placedLandmarks).find(
          code => placedLandmarks[code] === index,
        )
        const placedLandmarkData = placedLandmarkCode
          ? landmarks.find(l => l.code === placedLandmarkCode)
          : null

        const suitLandmarkCode = map.suitLandmarks?.[suit]
        const suitLandmark = suitLandmarkCode
          ? landmarks.find(l => l.code === suitLandmarkCode)
          : null

        return (
          <g
            key={index}
            onClick={() => onClearingClick?.(index)}
            style={{ cursor: onClearingClick ? 'pointer' : 'default' }}
          >
            <title>
              <LocaleText i18nKey={flooded ? `label.clearing.flooded` : `label.clearing.${suit}`} />
            </title>

            {/* Bounding circle for the clearing, allowing browser tooltips to display the title more easily */}
            <circle
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
                href={ICON_DICTIONARY[suit].image}
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

            {/* Custom Houserule Placed Landmark */}
            {placedLandmarkData ? (
              <image
                className="landmark"
                x={x - 50}
                y={y - 50}
                width="100"
                height="100"
                href={placedLandmarkData.image}
              >
                <title>
                  <LocaleText i18nKey={`landmark.${placedLandmarkData.code}.name`} />
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
