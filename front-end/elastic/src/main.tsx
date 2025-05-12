import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Header } from './components/Header.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Footer } from './components/Footer.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <App />
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
