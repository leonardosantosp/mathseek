import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Header } from './components/Header.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Footer } from './components/Footer.tsx'
import { BrowserRouter, useLocation } from 'react-router-dom'

function LayoutWrapper() {
  const location = useLocation()
  const hideLayout = location.pathname === '/login'

  return (
    <>
      {!hideLayout && <Header />}
      <App />
      {!hideLayout && <Footer />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LayoutWrapper />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
