import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiProvider } from './hooks/ApiContext.jsx'
import { AppProvider } from './hooks/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AppProvider> */}
      <ApiProvider>
        <App />
      </ApiProvider>
    {/* </AppProvider> */}
  </StrictMode>
)