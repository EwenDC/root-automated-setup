import React from 'react'

import { ICON_DICTIONARY } from '../constants'
import { useAppSelector } from '../hooks'
import priorityToken from '../images/charts/markers/priority.svg'
import ruinBuilding from '../images/charts/markers/ruin.png'
import { selectHirelingArray, selectLandmarkArray, selectSetupMap } from '../store'
import LocaleText from './localeText'

// Expanded the MapChart function to be able to handle clicks on the clearings for placing hirelings and landmarks, logic to display valid clearings, and adjusted maps to better handle new bot components
interface MapData {
  code: string
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
    suit: keyof typeof ICON_DICTIONARY | null
    flooded?: boolean
    ruin?: boolean
  }[]
}

interface MapChartProps {
  onClearingClick?: (index: number) => void
  activeLandmark?: string
  validClearings?: number[]
  useHouserules?: boolean
}

const MapChart: React.FC<MapChartProps> = ({
  // Expanded to handle the additional data and interfacing with the map by the user
  onClearingClick,
  validClearings = [],
  useHouserules = false,
}) => {
  const map = useAppSelector(selectSetupMap) as MapData | null

  const includeBots = useAppSelector(state => state.setup.botCount > 0) // Changed includeBots to be based around the bot count rather than the bool
  const placedLandmarks = useAppSelector(state => state.flow.placedLandmarks)
  const placedHirelings = useAppSelector(state => state.flow.placedHirelings)
  const landmarks = useAppSelector(selectLandmarkArray)
  const hirelings = useAppSelector(selectHirelingArray)
  const mountainLandmarkCode = useAppSelector(state => state.setup.mountainLandmarkCode)

  const piecesByClearing = React.useMemo(() => {
    const grouping: Record<number, { landmarks: typeof landmarks; hirelings: typeof hirelings }> =
      {}

    Object.entries(placedLandmarks).forEach(([code, clearingIndex]) => {
      grouping[clearingIndex] ??= { landmarks: [], hirelings: [] }
      const def = landmarks.find(l => l.code === code)
      if (def) grouping[clearingIndex].landmarks.push(def)
    })

    Object.entries(placedHirelings).forEach(([code, clearingIndex]) => {
      grouping[clearingIndex] ??= { landmarks: [], hirelings: [] }
      const def = hirelings.find(h => h.code === code)
      if (def) grouping[clearingIndex].hirelings.push(def)
    })

    return grouping
  }, [placedLandmarks, placedHirelings, landmarks, hirelings])

  if (!map) return null

  const floodedClearings = map.clearings.filter(clearing => clearing.flooded)
  if (map.code === 'mountain' && map.landmark) {
    const overrideLandmark = landmarks.find(l => l.code === mountainLandmarkCode)
    if (overrideLandmark) {
      map.landmark = {
        ...map.landmark,
        code: overrideLandmark.code,
        image: overrideLandmark.image,
      }
    }
  }
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
      {/* --- DEV TOOL: 100px GRID OVERLAY --- This is helpful when trying to read the map since the componentDefinitions are not necessarily intuitive
      {Array.from({ length: 11 }).map((_, i) => (
        <g
          key={`grid-${i}`}
          style={{ pointerEvents: 'none' }}
        >
          <line
            x1={0}
            y1={i * 100}
            x2={1000}
            y2={i * 100}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
          />
          <line
            x1={i * 100}
            y1={0}
            x2={i * 100}
            y2={1000}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
          />
          <text
            x={i * 100 + 5}
            y={20}
            fill="yellow"
            fontSize="16"
            fontWeight="bold"
          >
            {i * 100}
          </text>
          <text
            x={5}
            y={i * 100 - 5}
            fill="yellow"
            fontSize="16"
            fontWeight="bold"
          >
            {i * 100}
          </text>
        </g>
      ))}
      {/* ------------------------------------ */}

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
        const clearingPieces = piecesByClearing[index] ?? { landmarks: [], hirelings: [] }
        const suitLandmarkCode = suit ? map.suitLandmarks?.[suit] : null
        const suitLandmark = suitLandmarkCode
          ? landmarks.find(l => l.code === suitLandmarkCode)
          : null

        const isTargetValid = validClearings.includes(index)
        const isClickable = onClearingClick != null && (isTargetValid || useHouserules)

        let cursorStyle = 'default'
        if (onClearingClick != null) {
          cursorStyle = isClickable ? 'pointer' : 'not-allowed'
        }

        return (
          <g
            key={index}
            onClick={() => {
              if (isClickable) {
                onClearingClick(index)
              }
            }}
            className={`clearing-group ${isClickable ? 'cursor-pointer' : ''}`}
            style={{ cursor: cursorStyle }}
          >
            {/* --- DEV TOOL: CLEARING DATA LABELS --- This is helpful when trying to read the map since the componentDefinitions are not necessarily intuitive
            <text
              x={x}
              y={y + 5}
              fontSize="24"
              fontWeight="900"
              fill="cyan"
              stroke="black"
              strokeWidth="1.5"
              textAnchor="middle"
              style={{ pointerEvents: 'none', zIndex: 50 }}
            >
              [{index}] {x},{y}
            </text>
            {/* -------------------------------------- */}

            <title>
              <LocaleText i18nKey={flooded ? `label.clearing.flooded` : `label.clearing.${suit}`} />
            </title>

            {/* Bounding circle for the clearing */}
            <circle
              cx={x}
              cy={y}
              r="90"
              fill="transparent"
            />
            {isTargetValid && (
              <circle
                cx={x}
                cy={y}
                r="95"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="6"
                strokeDasharray="10 5"
              />
            )}

            {ruin ? (
              <image
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
            ) : !flooded && suit && suit !== 'none' ? (
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

            {/* Custom Houserule Placed Landmarks (Bottom-Left Quadrant) */}
            {clearingPieces.landmarks.map((landmark, i) => {
              const size = 75
              const imgX = x - size + 5 - i * 12
              const imgY = y + 5 + i * 12

              return (
                <image
                  key={`landmark-${landmark.code}`}
                  x={imgX}
                  y={imgY}
                  width={size}
                  height={size}
                  href={landmark.image}
                >
                  <title>
                    <LocaleText i18nKey={`landmark.${landmark.code}.name`} />
                  </title>
                </image>
              )
            })}

            {/* Placed Hirelings (Bottom-Right Quadrant) */}
            {clearingPieces.hirelings.map((hireling, i) => {
              const size = 75
              const imgX = x - 5 + i * 22
              const imgY = y + 5 + i * 22

              return (
                <image
                  key={`hireling-${hireling.code}`}
                  x={imgX}
                  y={imgY}
                  width={size}
                  height={size}
                  href={hireling.image}
                >
                  <title>
                    <LocaleText i18nKey={`hireling.${hireling.code}.name`} />
                  </title>
                </image>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

export default MapChart
