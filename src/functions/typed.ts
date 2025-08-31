/**
 * Returns a typed array of key/values of the enumerable properties of an object.
 *
 * @param o Object that contains the properties and methods. This can be an object that you created
 *   or an existing Document Object Model (DOM) object.
 */
export const typedEntries = Object.entries as <T, K = keyof T>(
  o: T,
) => (K extends keyof T ? [K, T[K]] : [K, T[keyof T]])[]
