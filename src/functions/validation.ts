import type { Hireling, Landmark, SetupClearing } from '../types'

export const validateHirelingPlacement = (
  clearingIndex: number,
  clearingData: SetupClearing,
  hireling: Hireling,
  currentSelections: number[],
  randomRolledSuit?: string,
): boolean => {
  if (!hireling.allowSameClearing && currentSelections.includes(clearingIndex)) {
    return false
  }

  if (hireling.placementRules && hireling.placementRules.length > 0) {
    for (const rule of hireling.placementRules) {
      switch (rule) {
        case 'openBuildingSlot':
          if ((clearingData.buildingSlots ?? 0) === 0 || clearingData.flooded) return false
          break

        case 'ruin':
          if (!clearingData.ruin) return false
          break

        case 'mapEdge':
          if (!clearingData.mapEdge) return false
          break

        case 'river':
          if (!clearingData.coastal) return false
          break

        case 'matchFirstSuit':
          if (currentSelections.length === 0) {
            if (clearingData.suit === 'none') return false
          }
          break

        case 'randomSuit':
          if (clearingData.suit !== randomRolledSuit) return false
          break
      }
    }
  }

  return true
}

export const validateLandmarkPlacement = (
  clearingIndex: number,
  clearingData: SetupClearing,
  placedLandmarks: Record<string, number>,
  landmark: Landmark,
): boolean => {
  const placedClearings = Object.values(placedLandmarks)

  if (placedClearings.includes(clearingIndex)) {
    return false
  }

  const isAdjacentToLandmark = clearingData.adjacentClearings?.some(adjIndex =>
    placedClearings.includes(adjIndex),
  )
  if (isAdjacentToLandmark) {
    return false
  }

  if (landmark.placementRules && landmark.placementRules.length > 0) {
    for (const rule of landmark.placementRules) {
      switch (rule) {
        case 'ruin':
          if (!clearingData.ruin) return false
          break
        case 'corner':
          if (!clearingData.corner) return false
          break
        case 'singleSlot':
          if (clearingData.buildingSlots !== 1 || clearingData.ruin) return false
          break
        case 'river':
          if (!clearingData.coastal) return false
          break
        case 'fox':
          if (clearingData.suit !== 'fox') return false
          break
        case 'mouse':
          if (clearingData.suit !== 'mouse') return false
          break
        case 'rabbit':
          if (clearingData.suit !== 'rabbit') return false
          break
      }
    }
  }

  return true
}
