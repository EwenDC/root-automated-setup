import React from 'react'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import Header from './components/header'
import StepList from './components/stepList'
import Toast from './components/toast'
import Toolbar from './components/toolbar'
import { useAppDispatch } from './hooks'
import { store } from './store'
import './i18nSetup'
import { hydrateSetupFromUrlParams } from './store'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
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
export default App

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
