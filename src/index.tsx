import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import Header from './components/header'
import StepList from './components/stepList'
import Toast from './components/toast'
import Toolbar from './components/toolbar'
import { useAppDispatch } from './hooks'
import { store } from './store'
import { hydrateSetupFromUrlParams } from './store/thunks'
import './i18nSetup'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // This runs exactly once on startup to read the shared URL
    dispatch(hydrateSetupFromUrlParams())
  }, [dispatch])

  return (
    <>
      <Header />
      <StepList />
      <Toolbar />
      <Toast />
    </>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div className="loading" />}>
      <Provider store={store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
)

export default App
