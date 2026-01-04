import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'

// Initialize dark mode as default
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark')
}
document.documentElement.classList.add(localStorage.getItem('theme') || 'dark')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
