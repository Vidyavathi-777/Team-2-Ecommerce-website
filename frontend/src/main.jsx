import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Maincomponent from './homepage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Maincomponent />
  </StrictMode>,
)
