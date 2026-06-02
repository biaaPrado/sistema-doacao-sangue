import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DoadorProvider } from './context/DoadorContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DoadorProvider>
      <App />
    </DoadorProvider>
  </StrictMode>,
)