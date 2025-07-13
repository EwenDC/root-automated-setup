import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import Header from './components/header'
import StepList from './components/stepList'
import Toast from './components/toast'
import Toolbar from './components/toolbar'
import { store } from './store'
import './i18nSetup'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div className="loading" />}>
      <Provider store={store}>
        <Header />
        <StepList />
        <Toolbar />
        <Toast />
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
)
