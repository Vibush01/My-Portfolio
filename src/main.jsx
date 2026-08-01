import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import './styles/index.css'
import App from './App.jsx'

// Initialize light mode as default before React hydration
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'light')
}
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
