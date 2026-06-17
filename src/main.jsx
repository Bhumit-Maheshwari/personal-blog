import React from 'react'

import ReactDOM from 'react-dom/client'

import {
  HelmetProvider
} from 'react-helmet-async'

import App from './App'

import './styles/tokens.css'
import './styles/global.css'

import ErrorBoundary
from './components/common/ErrorBoundary'

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <HelmetProvider>

      <ErrorBoundary>

        <App />

      </ErrorBoundary>

    </HelmetProvider>

  </React.StrictMode>

)