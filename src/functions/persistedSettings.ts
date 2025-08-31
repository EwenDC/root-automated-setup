/**
 * Saves the enable/disable state of the specified setting to localStorage.
 *
 * @param settingKey The key of the setting to save, as stored in localStorage.
 * @param value The value to save.
 */
export const savePersistedSetting = (settingKey: string, value: unknown) => {
  try {
    localStorage.setItem(settingKey, JSON.stringify(value))
  } catch (error: unknown) {
    console.warn(
      `Failed to persist state of ${JSON.stringify(value)} for setting ${settingKey}`,
      error,
    )
  }
}

/**
 * Function to return the state of a given setup setting from localStorage, for the purpose of
 * setting up the initial redux state.
 *
 * @param settingKey The key of the setting to check, as stored in localStorage.
 * @param defaultValue The default setting value to use if no setting is in localStorage.
 * @returns The value of the setting, or the default value if no setting is found.
 */
export const loadPersistedSetting = <T>(settingKey: string, defaultValue: T) => {
  // Load the current enable state from localStorage so we remember user settings
  const storedVal = localStorage.getItem(settingKey)

  // Was there a value stored in localStorage?
  if (storedVal != null) {
    try {
      // Parse the string stored in localStorage
      const parsedValue = JSON.parse(storedVal) as unknown

      // Only use it if it matches the expected type
      if (typeof parsedValue === typeof defaultValue) {
        return parsedValue as T
      } else {
        console.warn(
          `Saved state of ${storedVal} for setting ${settingKey} is of incorrect type (expected ${typeof defaultValue} got ${typeof parsedValue})`,
        )
      }
    } catch (error: unknown) {
      console.warn(`Failed to parse saved state of ${storedVal} for setting ${settingKey}`, error)
    }
  }

  // Default value, then save that state to localStorage for future
  savePersistedSetting(settingKey, defaultValue)
  return defaultValue
}
