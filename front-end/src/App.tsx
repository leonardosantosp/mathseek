import { MathTopics } from './components/MathTopics'
import { PanelCard } from './components/PanelCard'
import { Routes, Route } from 'react-router-dom'
import { ResultPages } from './pages/ResultsPage'
import { WikiViewer } from './pages/WikiViewer'
import { LoginPage } from './pages/SignUpPage'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PanelCard />
              <MathTopics />
            </>
          }
        />

        <Route path="/search" element={<ResultPages />} />
        <Route path="/wiki/:title" element={<WikiViewer />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
