import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Exchange from './components/exchange/exchange.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Exchange />
  </StrictMode>,
)
