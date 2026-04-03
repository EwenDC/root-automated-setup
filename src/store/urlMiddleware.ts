import type { Middleware } from '@reduxjs/toolkit'

import { serializeStateToUrlParams, type SyncableState } from './utils'

const URL_SYNC_ACTION_PREFIXES = ['components/', 'setup/', 'resetState']

export const urlSyncMiddleware: Middleware<object> = storeAPI => {
  let lastQueryString: string | null = null

  return next => action => {
    const result = next(action)

    if (typeof action !== 'object' || action === null || !('type' in action)) {
      return result
    }

    const type = (action as { type: string }).type
    if (!URL_SYNC_ACTION_PREFIXES.some(prefix => type.startsWith(prefix))) {
      return result
    }

    const state = storeAPI.getState() as unknown as SyncableState
    const queryString = serializeStateToUrlParams(state)
    if (queryString === lastQueryString) {
      return result
    }

    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname

    window.history.replaceState(null, '', newUrl)
    lastQueryString = queryString

    return result
  }
}
