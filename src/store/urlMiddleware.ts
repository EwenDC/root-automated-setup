import type { Middleware } from '@reduxjs/toolkit'

import { serializeStateToUrlParams, type SyncableState } from './utils'

export const urlSyncMiddleware: Middleware<object> = storeAPI => next => action => {
  const result = next(action)

  // Prevents the URL from being overwritten before we can hydrate from it
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const type = (action as { type: string }).type
    if (type.startsWith('@@redux/')) {
      return result
    }
  }

  const state = storeAPI.getState() as unknown as SyncableState

  const queryString = serializeStateToUrlParams(state)
  const newUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname

  window.history.replaceState(null, '', newUrl)

  return result
}
